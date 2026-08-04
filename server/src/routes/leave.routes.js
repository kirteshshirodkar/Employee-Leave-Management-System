import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getLeaveById,
  cancelLeave,
  getLeaveStats,
} from "../controllers/leave.controller.js";

import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { applyLeaveValidator } from "../validators/leave.validator.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();

// Apply for leave
router.post(
  "/",
  protect,
  upload.single("document"),
  applyLeaveValidator,
  validate,
  applyLeave,
);

// Get logged-in employee leaves
router.get("/", protect, getMyLeaves);

// Get single leave
router.get("/:id", protect, getLeaveById);

// Cancel leave
router.delete("/:id", protect, cancelLeave);

// leaves stats
router.get("/stats", protect, getLeaveStats);

export default router;
