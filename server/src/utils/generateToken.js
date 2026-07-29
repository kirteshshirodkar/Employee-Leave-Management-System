import jwt from "jsonwebtoken";

export const generateToken = (employee) => {
  return jwt.sign(
    {
      id: employee.id,
      username: employee.username,
      role: employee.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};