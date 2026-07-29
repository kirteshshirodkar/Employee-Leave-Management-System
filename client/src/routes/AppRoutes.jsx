import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ManagerLogin from "../pages/ManagerLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manager-login" element={<ManagerLogin />} />
    </Routes>
  );
};

export default AppRoutes;