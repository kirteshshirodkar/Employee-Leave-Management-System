import { LayoutDashboard, CalendarPlus, History, LogOut } from "lucide-react";

import { NavLink } from "react-router-dom";
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
  const handleLogout = () => {
    logout();

    notifySuccess("Logged out successfully.");

    navigate("/", { replace: true });
  };
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}

      <div className="h-20 flex items-center px-8 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">LeaveTrack</h1>

          <p className="text-sm text-slate-500">Employee Portal</p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          // Apply Leave opens modal
          if (item.action === "applyLeave") {
            return (
              <button
                key={item.name}
                onClick={onApplyLeave}
                className="
            flex
            w-full
            items-center
            gap-4
            rounded-xl
            px-5
            py-3
            text-slate-600
            transition-all
            duration-200
            hover:bg-slate-100
          "
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          }

          // Normal navigation
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-5 py-3 transition-all duration-200
          ${
            isActive
              ? "bg-slate-200 text-blue-600 shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="p-5 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-red-500
        transition
        hover:bg-red-50
        hover:text-red-600
    "
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
