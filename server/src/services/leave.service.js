import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  return difference;
};

// Apply Leave
export const applyLeave = async (employeeId, leaveData) => {
  const { reason, startDate, endDate } = leaveData;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    throw new AppError("End date cannot be before start date.", 400);
  }

  const totalDays = calculateTotalDays(startDate, endDate);

  const leave = await prisma.leave.create({
    data: {
      employeeId,

      reason,

      startDate: start,

      endDate: end,

      totalDays,

      // status defaults to PENDING
    },
  });

  return leave;
};

// Get Logged-in Employee Leaves
export const getMyLeaves = async (employeeId) => {
  const leaves = await prisma.leave.findMany({
    where: {
      employeeId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return leaves;
};

// Get Leave By ID
export const getLeaveById = async (employeeId, leaveId) => {
  const leave = await prisma.leave.findFirst({
    where: {
      id: leaveId,

      employeeId,
    },
  });

  if (!leave) {
    throw new AppError("Leave not found.", 404);
  }

  return leave;
};

// Cancel Leave
export const cancelLeave = async (employeeId, leaveId) => {
  const leave = await prisma.leave.findFirst({
    where: {
      id: leaveId,

      employeeId,
    },
  });

  if (!leave) {
    throw new AppError("Leave not found.", 404);
  }

  if (leave.status !== "PENDING") {
    throw new AppError("Only pending leaves can be cancelled.", 400);
  }

  await prisma.leave.delete({
    where: {
      id: leaveId,
    },
  });

  return {
    message: "Leave cancelled successfully.",
  };
};

// Leave stat
export const getLeaveStats = async (employeeId) => {
  const total = await prisma.leave.count({
    where: { employeeId },
  });

  const pending = await prisma.leave.count({
    where: {
      employeeId,
      status: "PENDING",
    },
  });

  const approved = await prisma.leave.count({
    where: {
      employeeId,
      status: "APPROVED",
    },
  });

  const rejected = await prisma.leave.count({
    where: {
      employeeId,
      status: "REJECTED",
    },
  });

  return {
    total,
    pending,
    approved,
    rejected,
  };
};
