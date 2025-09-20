import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

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
  const sidebarNavLinks: SidebarLink[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "material-symbols:dashboard-rounded",
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
      name: "Profile",
      path: "/profile",
      icon: "material-symbols:account-circle-outline",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
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
      >
        {/* Header */}
        <div className="flex-shrink-0 pt-4 lg:pt-0">
          <div className="flex items-center justify-between gap-5.5 pl-2.5 h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-brand-primary">FinFlow</h1>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onMobileToggle}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Icon
                width="20"
                height="20"
                icon="material-symbols:close"
                color="var(--color-black)"
              />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-1 mt-1.5 pr-4 overflow-y-auto hide-scrollbar">
          {sidebarNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 h-12.5 w-full px-4 rounded-md transition-colors duration-400  ${
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
                  <>
                    <Icon
                      width="18"
                      height="18"
                      icon={link.icon}
                      color={iconColor}
                    />
                    <span
                      className={`font-semibold text-sm ${
                        isActive ? "text-white" : "text-black"
                      }`}
                    >
                      {link.name}
                    </span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
