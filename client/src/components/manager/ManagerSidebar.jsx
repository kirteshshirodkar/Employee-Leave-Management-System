import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  X,
  UserCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const ManagerSidebar = ({
  isOpen,
  onClose,
  onLogout,
  manager,
}) => {
  const navigation = [
    {
      name: "Dashboard",
      path: "/manager/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/manager/employees",
      icon: Users,
    },
    {
      name: "Leave Requests",
      path: "/manager/leave-requests",
      icon: ClipboardList,
    },
  ];

  const secondaryNavigation = [
    {
      name: "Reports",
      path: "/manager/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/manager/settings",
      icon: Settings,
    },
  ];

  // Get username safely
  const username =
    manager?.username ||
    manager?.name ||
    "Manager";

  // Generate initials from username
  const initials = username
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[260px]
          flex-col
          bg-[#061A3A]
          text-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Brand */}
        <div className="flex h-[84px] items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
              <Users
                size={24}
                strokeWidth={2}
                className="text-blue-400"
              />
            </div>

            <div>
              <h1 className="text-[17px] font-semibold tracking-tight">
                Manager Portal
              </h1>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Leave Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={
                          isActive ? 2.2 : 1.8
                        }
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Secondary Navigation */}
          <div className="mt-9">
            <p className="mb-3 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Other
            </p>

            <nav className="space-y-2">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }
                      `
                    }
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                    />

                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Manager Profile */}
        <div className="border-t border-white/10 p-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04]">

            {/* Profile */}
            <div className="flex items-center gap-3 px-3 py-4">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold">
                  {initials}
                </div>

                {/* Online Indicator */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#061A3A] bg-emerald-400" />
              </div>

              {/* Manager Information */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {username}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Manager
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <span className="text-[10px] text-slate-400">
                    Online
                  </span>
                </div>
              </div>

              <UserCircle
                size={18}
                className="text-slate-500"
              />
            </div>

            {/* Logout */}
            <div className="border-t border-white/10">
              <button
                onClick={onLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <LogOut
                  size={18}
                  strokeWidth={1.8}
                />

                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      </aside>
    </>
  );
};

export default ManagerSidebar;