import { CalendarDays } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/70
        bg-gradient-to-r
        from-blue-50
        via-indigo-50
        to-slate-100
        px-5
        py-7
        shadow-sm

        sm:rounded-3xl
        sm:px-7
        sm:py-8

        lg:px-10
        lg:py-10
      "
    >
      {/* Decorative Blur */}
      <div className="absolute -left-16 -top-24 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl sm:h-56 sm:w-56" />

      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-indigo-200/40 blur-3xl sm:h-60 sm:w-60" />

      <div
        className="
          relative z-10
          flex flex-col
          gap-8
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
            Employee Dashboard
          </p>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Welcome,
            <span className="text-blue-600">
              {" "}
              {user?.username || "Employee"}
            </span>
            👋
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:mt-5 lg:text-lg lg:leading-8">
            Manage your leave requests effortlessly. Apply for new leave,
            upload supporting documents, and stay updated on every
            approval—all from one place.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center lg:shrink-0">
          <div
            className="
              flex
              h-28 w-28
              items-center justify-center
              rounded-full
              bg-white/60
              backdrop-blur-md
              shadow-lg

              sm:h-36 sm:w-36
              lg:h-44 lg:w-44
            "
          >
            <CalendarDays
              size={60}
              className="text-blue-600 sm:size-[72px] lg:size-[90px]"
              strokeWidth={1.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;