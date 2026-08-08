import * as leaveService from "../services/leave.service.js";

// Apply Leave
export const applyLeave = async (req, res, next) => {
  try {
    const leave = await leaveService.applyLeave(
      req.user.id,
      req.body,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};

// Get My Leaves
export const getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await leaveService.getMyLeaves(req.user.id);

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    next(error);
  }
};

// Get Leave By ID
export const getLeaveById = async (req, res, next) => {
  try {
    const leave = await leaveService.getLeaveById(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel Leave
export const cancelLeave = async (req, res, next) => {
  try {
    const result = await leaveService.cancelLeave(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

// Leave Stats
export const getLeaveStats = async (req, res, next) => {
  try {
    const stats = await leaveService.getLeaveStats(req.user.id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

