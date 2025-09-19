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
    <section className="relative">
      {/* Mobile Header with Hamburger */}
      <header className="md:hidden bg-white border-b border-brand-primary/20 p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-brand-primary">FinFlow</h1>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Icon
            width="24"
            height="24"
            icon="material-symbols:menu"
            color="var(--color-black)"
          />
        </button>
      </header>

      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />

      <section className="flex-1 md:ml-79">
        {/* <TopBar /> */}
        <section className="overflow-y-scroll pt-7.5 pb-12.5 px-3 sm:px-5 xl:px-9 mr-0 md:mr-10 min-[1440px]:mr-20 font-poppins">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default AdminLayout;
