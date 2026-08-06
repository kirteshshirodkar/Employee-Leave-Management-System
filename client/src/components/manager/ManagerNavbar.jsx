import {
  Menu,
  Bell,
  CalendarDays,
} from "lucide-react";

const ManagerNavbar = ({ onMenuClick }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between px-5 sm:px-7 lg:px-8">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-600
              transition
              hover:bg-slate-50
              lg:hidden
            "
          >
            <Menu size={21} />
          </button>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Manager Portal
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Dashboard
            </h2>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          
          {/* Date */}
          <div
            className="
              hidden
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-slate-600
              shadow-sm
              sm:flex
            "
          >
            <CalendarDays
              size={17}
              className="text-slate-500"
            />

            <span>{formattedDate}</span>
          </div>

          {/* Notification */}
          <button
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition
              hover:bg-slate-50
              hover:text-slate-900
            "
          >
            <Bell size={19} strokeWidth={1.8} />

            {/* Notification Count */}
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-blue-600
                px-1
                text-[10px]
                font-semibold
                text-white
              "
            >
              4
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ManagerNavbar;