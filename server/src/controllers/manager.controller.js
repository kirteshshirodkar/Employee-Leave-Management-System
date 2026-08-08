import * as managerService from "../services/manager.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await managerService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET ALL LEAVE REQUESTS
// ======================================================

export const getAllLeaveRequests = async (req, res, next) => {
  try {
    const data = await managerService.getAllLeaveRequests(req.query);

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET LEAVE REQUEST BY ID
// ======================================================

export const getLeaveRequestById = async (req, res, next) => {
  try {
    const leave = await managerService.getLeaveRequestById(req.params.id);

    res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// APPROVE LEAVE
// ======================================================

export const approveLeave = async (req, res, next) => {
  try {
    const leave = await managerService.updateLeaveStatus(
      req.params.id,
      "APPROVED",
    );

    res.status(200).json({
      success: true,
      message: "Leave approved successfully.",
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};
// ======================================================
// REJECT LEAVE
// ======================================================

export const rejectLeave = async (
  req,
  res,
  next
) => {
  try {
    const leave =
      await managerService.updateLeaveStatus(
        req.params.id,
        "REJECTED"
      );

    res.status(200).json({
      success: true,
      message: "Leave rejected successfully.",
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};
// ======================================================
// GET ALL EMPLOYEES
// ======================================================

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await managerService.getAllEmployees();

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// UPDATE LEAVE REMARKS
// ======================================================

export const updateLeaveRemarks = async (
  req,
  res,
  next
) => {
  try {
    const leave =
      await managerService.updateLeaveRemarks(
        req.params.id,
        req.body.remarks
      );

    res.status(200).json({
      success: true,
      message: "Remarks updated successfully.",
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};