import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { removeToken } from "@/lib/token";
import ConfirmationModal from "@/components/common/Modal";

type SidebarLink = {
  name: string;
  path: string;
  icon: string;
};

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onMobileToggle,
}) => {
  const { clearUser } = useUserStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const sidebarNavLinks: SidebarLink[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "material-symbols:dashboard-rounded",
    },
    {
      name: "Wallet",
      path: "/wallet",
      icon: "material-symbols:account-balance-wallet",
    },
    {
      name: "Loan Listings",
      path: "/loan-listings",
      icon: "material-symbols:list-alt-outline",
    },
    {
      name: "Create Loan",
      path: "/create-loan",
      icon: "material-symbols:add-circle-outline",
    },
    {
      name: "My Loans",
      path: "/user-loans",
      icon: "material-symbols:account-balance-outline",
    },
    {
      name: "Funded Loans",
      path: "/funded-loans",
      icon: "material-symbols:handshake-outline",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "material-symbols:account-circle-outline",
    },
  ];

  // Handle logout
  const handleLogout = () => {
    try {
      removeToken();
      clearUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still navigate to login even if there's an error
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
              onMobileToggle?.();
            }
          }}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        bg-white w-full font-poppins flex flex-col h-screen border border-brand-primary/20 shadow-sm
        fixed top-0 left-0 z-50 pl-5 max-w-71.5
        lg:pt-5 lg:fixed lg:z-auto
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex-shrink-0 pt-4 lg:pt-0">
          <div className="flex items-center justify-between gap-5.5 pl-2.5 h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <h1
                className="text-xl font-bold text-brand-primary"
                role="banner"
              >
                FinFlow
              </h1>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onMobileToggle}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
              aria-label="Close navigation menu"
              type="button"
            >
              <Icon
                width="20"
                height="20"
                icon="material-symbols:close"
                color="var(--color-black)"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          className="flex-grow space-y-1 mt-1.5 pr-4 overflow-y-auto hide-scrollbar"
          role="navigation"
          aria-label="Primary navigation"
        >
          <ul role="list" className="space-y-1">
            {sidebarNavLinks.map((link) => (
              <li key={link.name} role="none">
                <NavLink
                  to={link.path}
                  onClick={onMobileToggle}
                  className={({ isActive }) =>
                    `flex items-center gap-4 h-12.5 w-full px-4 rounded-md transition-colors duration-400 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 ${
                      isActive
                        ? "bg-brand-primary border-2 border-brand-primary"
                        : "border-l-2 border-transparent hover:bg-brand-primary/90"
                    }`
                  }
                >
                  {({ isActive }) => {
                    const activeColor = "var(--color-white)";
                    const defaultColor = "var(--color-black)";
                    const iconColor = isActive ? activeColor : defaultColor;

                    return (
                      <div
                        className="flex items-center gap-4 w-full"
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon
                          width="18"
                          height="18"
                          icon={link.icon}
                          color={iconColor}
                          aria-hidden="true"
                        />
                        <span
                          className={`font-semibold text-sm ${
                            isActive ? "text-white" : "text-black"
                          }`}
                        >
                          {link.name}
                        </span>
                      </div>
                    );
                  }}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-4 h-12.5 w-full px-4 rounded-md transition-colors duration-400 border-l-2 border-transparent hover:bg-red-50 hover:border-red-200 mt-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Sign out of your account"
            type="button"
          >
            <Icon
              width="18"
              height="18"
              icon="material-symbols:logout"
              color="var(--color-error)"
              aria-hidden="true"
            />
            <span className="font-semibold text-sm text-[--color-error]">
              Logout
            </span>
          </button>
        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        confirmVariant="destructive"
        icon="material-symbols:logout"
        iconColor="var(--color-error)"
      />
    </>
  );
};

export default Sidebar;
