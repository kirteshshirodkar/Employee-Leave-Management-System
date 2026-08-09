import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = ({ children, onApplyLeave }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleApplyLeave = () => {
    onApplyLeave();
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================= */}

      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-40
          hidden
          w-64
          border-r
          border-slate-200
          bg-white
          lg:block
        "
      >
        <Sidebar onApplyLeave={onApplyLeave} />
      </aside>

      {/* ================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================= */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================================= */}
      {/* MOBILE SIDEBAR */}
      {/* ================================= */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-72
          bg-white
          shadow-xl
          transition-transform
          duration-300
          lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Close Button */}
        <div className="absolute right-3 top-3 z-10">
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        <Sidebar onApplyLeave={handleApplyLeave} />
      </aside>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main
        className="
          min-w-0
          lg:ml-64
        "
      >
        {/* Navbar */}
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <div
          className="
            min-h-[calc(100vh-4rem)]
            p-4
            sm:p-6
            lg:p-8
          "
        >
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;