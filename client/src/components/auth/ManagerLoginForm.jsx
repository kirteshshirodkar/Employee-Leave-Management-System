import { Link } from "react-router-dom";
import { login } from "../../api/authApi";
import { saveToken } from "../../services/tokenService";
import AuthCard from "./AuthCard";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";

const ManagerLoginForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await managerLogin(formData);

      saveToken(response.data.token);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthCard
      title="Manager Portal"
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
      <form className="space-y-5">
        <Input
          label="Manager Email"
          type="email"
          name="email"
          placeholder="manager@company.com"
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter password"
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button>Login as Manager</Button>
      </form>
    </AuthCard>
  );
};

export default ManagerLoginForm;
