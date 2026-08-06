import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../services/tokenService";

const EmployeeRoute = () => {
  const { user } = useAuth();
  const token = getToken();

  // Not authenticated
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Manager trying to access employee portal
  if (user.role === "MANAGER") {
    return <Navigate to="/manager/dashboard" replace />;
  }

  return <Outlet />;
};

export default EmployeeRoute;