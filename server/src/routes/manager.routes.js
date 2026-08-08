import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import * as managerController from "../controllers/manager.controller.js";

const router = express.Router();

router.use(protect);

router.use(authorize("MANAGER"));

router.get("/dashboard", managerController.getDashboardStats);

router.get("/leaves", managerController.getAllLeaveRequests);

router.get("/leaves/:id", managerController.getLeaveRequestById);

router.patch("/leaves/:id/approve", managerController.approveLeave);

router.patch("/leaves/:id/reject", managerController.rejectLeave);

router.get("/employees", managerController.getAllEmployees);

router.patch("/leaves/:id/remarks", managerController.updateLeaveRemarks);

export default router;
