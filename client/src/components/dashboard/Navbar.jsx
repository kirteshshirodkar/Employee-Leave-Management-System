import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-end px-8">
      
      <div className="flex items-center gap-8">
        {/* Notification */}

        <button className="relative">
          <Bell className="text-slate-600" />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}

        <button className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="font-semibold text-slate-800">{user?.username}</h3>

            <p className="text-sm text-slate-500">{user?.role}</p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
