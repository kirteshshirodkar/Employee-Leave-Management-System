import { ArrowUpRight } from "lucide-react";

const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconBg,
    iconColor,
    gradient,
}) => {
    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                ${gradient}
            `}
        >
            {/* Decorative Glow */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-3xl" />

            <div className="relative flex items-start justify-between">

                <div>

                    <div
                        className={`
                            mb-5
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            ${iconBg}
                        `}
                    >
                        <Icon
                            size={26}
                            className={iconColor}
                        />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-slate-900">
                        {value}
                    </h2>

                    <p className="mt-3 text-sm text-slate-500">
                        {subtitle}
                    </p>

                </div>

                <ArrowUpRight
                    size={20}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />

            </div>

        </div>
    );
};

export default StatCard;