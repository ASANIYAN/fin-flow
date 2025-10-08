import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

// import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Skip Navigation Links */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-primary text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <a
        href="#sidebar-navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-brand-primary text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        Skip to navigation
      </a>

      {/* Mobile Header with Hamburger */}
      <header className="lg:hidden bg-white border-b border-brand-primary/20 p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-brand-primary">FinFlow</h1>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="sidebar-navigation"
        >
          <Icon
            width="24"
            height="24"
            icon="material-symbols:menu"
            color="var(--color-black)"
            aria-hidden="true"
          />
        </button>
      </header>

      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />

      <section className="flex-1 lg:ml-79">
        {/* <TopBar /> */}
        <main
          id="main-content"
          className="overflow-y-scroll bg-gray-50 rounded-2xl mt-7.5 pb-12.5 px-3 sm:px-5 xl:px-9 mr-0 md:mr-10 min-[1440px]:mr-20 font-poppins"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AdminLayout;
