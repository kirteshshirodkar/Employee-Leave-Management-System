import { CalendarDays } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const WelcomeBanner = () => {
    const { user } = useAuth();

    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200/70
                bg-gradient-to-r
                from-blue-50
                via-indigo-50
                to-slate-100
                px-10
                py-10
                shadow-sm
            "
        >
            {/* Decorative Blur */}
            <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-indigo-200/40 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between">
                {/* Left */}

                <div className="max-w-xl">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Employee Dashboard
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-slate-900">
                        Welcome back,
                        <span className="text-blue-600">
                            {" "}
                            {user?.username || "Employee"}
                        </span>
                        👋
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        Manage your leave requests effortlessly.
                        Apply for new leave, upload supporting documents,
                        and stay updated on every approval—all from one place.
                    </p>

                </div>

                {/* Right Illustration */}

                <div className="hidden lg:flex items-center justify-center">

                    <div
                        className="
                            flex
                            h-44
                            w-44
                            items-center
                            justify-center
                            rounded-full
                            bg-white/60
                            backdrop-blur-md
                            shadow-lg
                        "
                    >
                        <CalendarDays
                            size={90}
                            className="text-blue-600"
                            strokeWidth={1.6}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WelcomeBanner;