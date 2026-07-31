import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ManagerLogin from "../pages/ManagerLogin";
import Dashboard from "../pages/Dashboard";
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
