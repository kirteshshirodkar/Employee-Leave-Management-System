import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register";
import ManagerLogin from "../pages/auth/ManagerLogin";
import Dashboard from "../pages/employee/Dashboard";
import ManagerDashboard from "../pages/ManagerDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manager-login" element={<ManagerLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/manager/dashboard"
        element={<ManagerDashboard />}
      />
    </Routes>
  );
};

export default AppRoutes;
