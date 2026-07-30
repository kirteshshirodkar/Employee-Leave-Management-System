
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/authApi";
import { saveToken } from "../../services/tokenService";

import {
  notifySuccess,
  notifyError,
  notifyLoading,
  dismissToast,
} from "../../utils/toast";

import AuthCard from "./AuthCard";

import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      notifyError("Please fill all fields.");
      return;
    }

    const toastId = notifyLoading("Signing in...");

    try {
      const response = await login(formData);

      dismissToast(toastId);

      saveToken(response.data.token);

      notifySuccess(response.data.message || "Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      dismissToast(toastId);

      const data = error.response?.data;

      if (data?.errors) {
        data.errors.forEach((err) => notifyError(err.msg));
      } else {
        notifyError(data?.message || "Login failed.");
      }
    }
  };
  return (
    <AuthCard
      title="Employee Login"
      subtitle="Sign in to access your leave dashboard"
      footer={
        <div className="space-y-3 text-center">
          <p className="text-gray-600">
            New Employee?
            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>

          <p className="text-gray-600">
            Manager?
            <Link
              to="/manager-login"
              className="ml-2 font-semibold text-indigo-600 hover:underline"
            >
              Manager Login
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Employee Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit">Sign In</Button>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
