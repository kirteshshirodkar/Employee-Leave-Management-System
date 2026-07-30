import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../api/authApi";

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

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      notifyError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notifyError("Passwords do not match.");
      return;
    }

    const toastId = notifyLoading("Creating account...");

    try {
      const response = await register(formData);

      dismissToast(toastId);

      notifySuccess(response.data.message || "Registration successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      dismissToast(toastId);

      const data = error.response?.data;

      if (data?.errors) {
        data.errors.forEach((err) => notifyError(err.msg));
      } else {
        notifyError(data?.message || "Registration failed.");
      }
    }
  };
  return (
    <AuthCard
      title="Employee Registration"
      subtitle="Create your Employee Leave Portal account"
      footer={
        <div className="space-y-3 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to="/"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="text-gray-600">
            Are you a Manager?
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
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
        />

        <Button type="submit">Create Account</Button>
      </form>
    </AuthCard>
  );
};

export default RegisterForm;
