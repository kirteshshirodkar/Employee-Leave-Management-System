import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getLeaveById,
  cancelLeave,
  getLeaveStats,
} from "../controllers/leave.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { applyLeaveSchema } from "../validators/leave.validator.js";
const router = express.Router();

// Apply for leave
router.post("/", protect, validate(applyLeaveSchema), applyLeave);

// Get logged-in employee leaves
router.get("/", protect, getMyLeaves);

// Get single leave
router.get("/:id", protect, getLeaveById);

// Cancel leave
router.delete("/:id", protect, cancelLeave);

// leaves stats
router.get("/stats", protect, getLeaveStats);

export default router;
