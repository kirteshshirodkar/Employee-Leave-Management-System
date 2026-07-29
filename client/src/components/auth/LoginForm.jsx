import { Link } from "react-router-dom";

import AuthCard from "./AuthCard";

import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";

const LoginForm = () => {
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

      <form className="space-y-5">

        <Input
          label="Employee Username"
          placeholder="Enter username"
        />

        <PasswordInput
          label="Password"
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

        <Button>
          Sign In
        </Button>

      </form>

    </AuthCard>
  );
};

export default LoginForm;