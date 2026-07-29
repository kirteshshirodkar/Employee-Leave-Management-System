import prisma from "../config/prisma.js";

import { hashPassword, comparePassword } from "../utils/hashPassword.js";

import { generateToken } from "../utils/generateToken.js";
import AppError from "../utils/AppError.js"

/*
    REGISTER
*/

export const register = async ({ username, password }) => {
  const existingUser = await prisma.employee.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw new AppError("Username already exists", 409);
  }

  const hashedPassword = await hashPassword(password);

  const employee = await prisma.employee.create({
    data: {
      username,

      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Registration successful",
    employee: {
      id: employee.id,
      username: employee.username,
      role: employee.role,
    },
  };
};

/*
    LOGIN
*/

export const login = async ({ username, password }) => {
  const employee = await prisma.employee.findUnique({
    where: {
      username,
    },
  });

  if (!employee) {
    throw new AppError("Invalid username or password", 401);
  }

  const passwordMatched = await comparePassword(password, employee.password);

  if (!passwordMatched) {
  throw new AppError("Invalid username or password", 401);
}

  const token = generateToken(employee);

  return {
    success: true,

    message: "Login successful",

    token,

    employee: {
      id: employee.id,

      username: employee.username,

      role: employee.role,
    },
  };
};
