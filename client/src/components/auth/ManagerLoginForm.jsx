import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "./AuthCard";

import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";

import { managerLogin } from "../../api/authApi";
import { saveToken } from "../../services/tokenService";
import { useAuth } from "../../hooks/useAuth";

import {
  notifySuccess,
  notifyError,
  notifyLoading,
  dismissToast,
} from "../../utils/toast";

const ManagerLoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      notifyError("Please fill all fields.");
      return;
    }

    const toastId = notifyLoading("Signing in...");

    try {
      const response = await managerLogin(formData);

      const { token, manager, message } = response.data;

      // Save JWT token
      saveToken(token);

      // Store manager in AuthContext + localStorage
      setUser(manager);

      dismissToast(toastId);

      notifySuccess(
        message || "Manager login successful."
      );

      navigate("/manager/dashboard");

    } catch (error) {
      dismissToast(toastId);

      const data = error.response?.data;

      if (data?.errors) {
        data.errors.forEach((err) =>
          notifyError(err.msg)
        );
      } else {
        notifyError(
          data?.message || "Manager login failed."
        );
      }
    }
  };

  return (
    <AuthCard
      title="Manager Login"
      subtitle="Sign in to manage employee leave requests"
      footer={
        <div className="space-y-3 text-center">
          <p className="text-gray-600">
            Employee?

            <Link
              to="/"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Employee Login
            </Link>
          </p>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Manager Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="manager@gcu.in"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <Button type="submit">
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
};

export default ManagerLoginForm;