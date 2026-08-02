import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActionCard = ({
    title,
    description,
    icon: Icon,
    to,
    iconBg,
    iconColor,
    arrowBg,
}) => {
    return (
        <Link
            to={to}
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-7
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-blue-200
            "
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center justify-between">

                {/* Left */}

                <div className="flex items-center gap-5">

                    <div
                        className={`
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-2xl
                            ${iconBg}
                            shadow-md
                        `}
                    >
                        <Icon
                            size={38}
                            className={iconColor}
                            strokeWidth={2}
                        />
                    </div>

                    <div>

                        <h3 className="text-2xl font-semibold text-slate-900">
                            {title}
                        </h3>

                        <p className="mt-2 max-w-xs leading-7 text-slate-500">
                            {description}
                        </p>

                    </div>

                </div>

                {/* Arrow */}

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        ${arrowBg}
                        text-white
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    `}
                >
                    <ArrowRight size={22} />
                </div>

            </div>
        </Link>
    );
};

export default QuickActionCard;