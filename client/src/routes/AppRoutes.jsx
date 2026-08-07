import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ManagerLogin from "../pages/auth/ManagerLogin";

import Dashboard from "../pages/employee/Dashboard";
import LeaveHistory from "../pages/employee/LeaveHistory";

import ManagerDashboard from "../pages/manager/ManagerDashboard";

import EmployeeRoute from "./EmployeeRoute";
import ManagerRoute from "./ManagerRoute";
import GuestRoute from "./GuestRoute";
import LeaveRequests from "../pages/manager/LeaveRequests";
import Employees from "../pages/manager/Employees";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================= */}
      {/* Guest Routes */}
      {/* ========================= */}

      <Route element={<GuestRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ========================= */}
      {/* Manager Login */}
      {/* ========================= */}

      <Route path="/manager-login" element={<ManagerLogin />} />

      {/* ========================= */}
      {/* Employee Routes */}
      {/* ========================= */}

      <Route element={<EmployeeRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/leave-history" element={<LeaveHistory />} />
      </Route>

      {/* ========================= */}
      {/* Manager Routes */}
      {/* ========================= */}

      <Route element={<ManagerRoute />}>
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/leave-requests" element={<LeaveRequests/>} />
        <Route path="/manager/employees" element={<Employees/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
