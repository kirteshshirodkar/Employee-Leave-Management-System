import bgImage from "../assets/images/auth-bg.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;