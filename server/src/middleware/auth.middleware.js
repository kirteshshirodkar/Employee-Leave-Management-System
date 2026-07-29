import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Access denied. No token provided.", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const employee = await prisma.employee.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (!employee) {
      throw new AppError("User not found.", 401);
    }

    req.user = employee;

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;