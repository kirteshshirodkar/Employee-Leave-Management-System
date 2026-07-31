import express from "express";

import {
  register,
  login,
  managerLogin,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
  managerLoginValidator,
} from "../validators/auth.validator.js";

import validate from "../middleware/validate.middleware.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    employee: req.user,
  });
});

router.post(
  "/manager/login",
  managerLoginValidator,
  validate,
  managerLogin
);

export default router;