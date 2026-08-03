import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LeaveHistoryHeader = () => {
    return (
        <section
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
            "
        >
            <Link
                to="/dashboard"
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    px-3
                    py-2
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-blue-600
                "
            >
                <ArrowLeft size={18} />

                Back to Dashboard
            </Link>

            <div className="mt-6">

                <h1 className="text-4xl font-bold text-slate-900">
                    Leave History
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
                    Review every leave request you've submitted, monitor its
                    approval status, and access manager remarks and supporting
                    documents—all from one place.
                </p>

            </div>
        </section>
    );
};

export default LeaveHistoryHeader;