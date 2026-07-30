import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ManagerLogin from "../pages/ManagerLogin";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manager-login" element={<ManagerLogin />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
};

export default AppRoutes;