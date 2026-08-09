import {
  LayoutDashboard,
  CalendarPlus,
  History,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Apply Leave",
    icon: CalendarPlus,
    action: "applyLeave",
  },
  {
    name: "Leave History",
    icon: History,
    path: "/leave-history",
  },
];

const Sidebar = ({ onApplyLeave }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    notifySuccess("Logged out successfully.");

    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-6 sm:px-8">
        <div>
          <h1 className="text-xl font-bold text-blue-600 sm:text-2xl">
            LeaveTrack
          </h1>

          <p className="text-xs text-slate-500 sm:text-sm">
            Employee Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          {/* Apply Leave */}
          if (item.action === "applyLeave") {
            return (
              <button
                key={item.name}
                onClick={onApplyLeave}
                className="
                  flex w-full items-center gap-4
                  rounded-xl px-4 py-3
                  text-slate-600
                  transition-all duration-200
                  hover:bg-slate-100
                  sm:px-5
                "
              >
                <Icon size={20} className="shrink-0" />

                <span className="font-medium">
                  {item.name}
                </span>
              </button>
            );
          }

          {/* Navigation */}
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                rounded-xl px-4 py-3
                transition-all duration-200
                sm:px-5

                ${
                  isActive
                    ? "bg-slate-200 text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }
                `
              }
            >
              <Icon size={20} className="shrink-0" />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-slate-200 px-4 py-4 sm:px-5">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl px-4 py-3
            text-red-500
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <LogOut size={20} className="shrink-0" />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;