const Button = ({
    children,
    type = "submit",
    className = "",
}) => {
    return (
        <button
            type={type}
            className={`
            w-full
            rounded-xl
            bg-slate-800
            py-3
            font-semibold
            text-white
            transition-all
            hover:bg-slate-900
            active:scale-[0.98]
            ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;