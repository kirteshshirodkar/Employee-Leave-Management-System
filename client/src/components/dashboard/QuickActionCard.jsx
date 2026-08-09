import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  to,
  onClick,
  iconBg,
  iconColor,
  arrowBg,
}) => {
  const className = `
    group
    relative
    overflow-hidden
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-4
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-blue-200
    hover:shadow-xl

    sm:rounded-3xl
    sm:p-6
    lg:p-7
  `;

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          {/* Icon */}
          <div
            className={`
              flex shrink-0
              h-14 w-14
              items-center justify-center
              rounded-xl
              shadow-md

              sm:h-16 sm:w-16
              lg:h-20 lg:w-20
              lg:rounded-2xl

              ${iconBg}
            `}
          >
            <Icon
              size={28}
              className={`${iconColor} sm:size-8 lg:size-[38px]`}
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl lg:text-2xl">
              {title}
            </h3>

            <p className="mt-1 text-sm leading-5 text-slate-500 sm:mt-2 sm:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div
          className={`
            flex shrink-0
            h-10 w-10
            items-center justify-center
            rounded-full
            text-white
            transition-transform duration-300
            group-hover:translate-x-1

            sm:h-12 sm:w-12
            lg:h-14 lg:w-14

            ${arrowBg}
          `}
        >
          <ArrowRight size={18} className="sm:size-5 lg:size-[22px]" />
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} w-full text-left`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={className}
    >
      {content}
    </Link>
  );
};

export default QuickActionCard;