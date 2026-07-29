import { Link } from "react-router-dom";

import AuthCard from "./AuthCard";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";

const RegisterForm = () => {
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
      <form className="space-y-5">
        <Input label="Employee ID" name="employeeId" placeholder="EMP001" />

        <Input label="Full Name" name="fullName" placeholder="John Doe" />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Create a password"
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        <Button>Create Account</Button>
      </form>
    </AuthCard>
  );
};

export default RegisterForm;
