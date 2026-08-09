import { Bell, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:h-20 sm:px-6 lg:px-8">
      {/* Mobile Menu */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={24} />
      </button>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Right Section */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        {/* User */}
        <button className="flex items-center gap-2 sm:gap-3">
          <div className="text-right">
            <h3 className="max-w-[120px] truncate text-sm font-semibold text-slate-800 sm:max-w-none sm:text-base">
              {user?.username || "Employee"}
            </h3>

            <p className="hidden text-sm text-slate-500 sm:block">
              {user?.role || "Employee"}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
