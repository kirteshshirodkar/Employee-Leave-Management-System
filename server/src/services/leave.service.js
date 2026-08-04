import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import AppError from "../utils/AppError.js";

/*
 * Calculate total leave days.
 *
 * Example:
 *
 * 10 Aug → 10 Aug = 1 day
 * 10 Aug → 12 Aug = 3 days
 */
const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = Math.ceil(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  return difference + 1;
};

/*
 * Upload file to Cloudinary
 *
 * Multer stores the uploaded file in memory.
 * We send that buffer to Cloudinary using upload_stream().
 */
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "employee-leaves",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// ======================================================
// APPLY LEAVE
// ======================================================

export const applyLeave = async (
  employeeId,
  leaveData,
  file
) => {
  const {
    reason,
    startDate,
    endDate,
  } = leaveData;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Extra safety validation
  if (end < start) {
    throw new AppError(
      "End date cannot be before start date.",
      400
    );
  }

  const totalDays = calculateTotalDays(
    startDate,
    endDate
  );

  let documentUrl = null;
  let documentName = null;

  // Upload document only if employee selected one
  if (file) {
    try {
      const uploadResult =
        await uploadToCloudinary(file);

      documentUrl = uploadResult.secure_url;
      documentName = file.originalname;
    } catch (error) {
      console.error(
        "Cloudinary upload error:",
        error
      );

      throw new AppError(
        "Failed to upload supporting document.",
        500
      );
    }
  }

  // Create leave in PostgreSQL
  const leave = await prisma.leave.create({
    data: {
      employeeId,

      reason,

      startDate: start,

      endDate: end,

      totalDays,

      // Prisma defaults this to PENDING
      status: "PENDING",

      documentUrl,

      documentName,
    },
  });

  return leave;
};

// ======================================================
// GET MY LEAVES
// ======================================================

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

// ======================================================
// GET LEAVE BY ID
// ======================================================

export const getLeaveById = async (
  employeeId,
  leaveId
) => {
  const leave = await prisma.leave.findFirst({
    where: {
      id: leaveId,
      employeeId,
    },
  });

  if (!leave) {
    throw new AppError(
      "Leave not found.",
      404
    );
  }

  return leave;
};

// ======================================================
// CANCEL LEAVE
// ======================================================

export const cancelLeave = async (
  employeeId,
  leaveId
) => {
  const leave = await prisma.leave.findFirst({
    where: {
      id: leaveId,
      employeeId,
    },
  });

  if (!leave) {
    throw new AppError(
      "Leave not found.",
      404
    );
  }

  if (leave.status !== "PENDING") {
    throw new AppError(
      "Only pending leaves can be cancelled.",
      400
    );
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

// ======================================================
// LEAVE STATS
// ======================================================

export const getLeaveStats = async (employeeId) => {
  const total = await prisma.leave.count({
    where: {
      employeeId,
    },
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