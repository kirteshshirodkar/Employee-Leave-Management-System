const AuthCard = ({
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl p-10">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          {subtitle}
        </p>

      </div>

      {children}

      {footer && (
        <div className="mt-8 border-t pt-6">
          {footer}
        </div>
      )}

    </div>
  );
};

export default AuthCard;