import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ManagerLogin from "../pages/auth/ManagerLogin";
import Dashboard from "../pages/employee/Dashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import LeaveHistory from "../pages/employee/LeaveHistory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/manager-login" element={<ManagerLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leave-history" element={<LeaveHistory />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Route>
      
    </Routes>
  );
};

export default AppRoutes;
