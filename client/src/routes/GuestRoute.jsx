import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../services/tokenService";

const GuestRoute = () => {
    const { user } = useAuth();
    const token = getToken();

    if (token && user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;