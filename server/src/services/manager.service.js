import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
export const getDashboardStats = async () => {
  const totalEmployees = await prisma.employee.count({
    where: {
      role: "EMPLOYEE",
    },
  });

  const pendingLeaves = await prisma.leave.count({
    where: {
      status: "PENDING",
    },
  });

  const approvedLeaves = await prisma.leave.count({
    where: {
      status: "APPROVED",
    },
  });

  const rejectedLeaves = await prisma.leave.count({
    where: {
      status: "REJECTED",
    },
  });

  return {
    totalEmployees,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
  };
};

// ======================================================
// GET ALL LEAVE REQUESTS
// ======================================================

export const getAllLeaveRequests = async ({ page = 1, limit = 10, status }) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const where = {};

  if (status) {
    where.status = status;
  }

  const [requests, total] = await Promise.all([
    prisma.leave.findMany({
      where,
      include: {
        employee: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.leave.count({
      where,
    }),
  ]);

  return {
    requests,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// ======================================================
// GET LEAVE REQUEST BY ID
// ======================================================

export const getLeaveRequestById = async (leaveId) => {
  const leave = await prisma.leave.findUnique({
    where: {
      id: leaveId,
    },
    include: {
      employee: {
        select: {
          id: true,
          username: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      },
    },
  });

  if (!leave) {
    throw new AppError("Leave request not found.", 404);
  }

  return leave;
};

// ======================================================
// UPDATE LEAVE STATUS
// ======================================================

const VALID_STATUSES = ["APPROVED", "REJECTED"];

export const updateLeaveStatus = async (leaveId, status) => {
  // Validate requested status
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError("Invalid leave status.", 400);
  }

  // Find leave
  const leave = await prisma.leave.findUnique({
    where: {
      id: leaveId,
    },
  });

  if (!leave) {
    throw new AppError("Leave request not found.", 404);
  }

  // Only pending leaves can be processed
  if (leave.status !== "PENDING") {
    throw new AppError(
      `Leave has already been ${leave.status.toLowerCase()}.`,
      400,
    );
  }

  // Update status only
  const updatedLeave = await prisma.leave.update({
    where: {
      id: leaveId,
    },
    data: {
      status,
    },
    include: {
      employee: {
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
    },
  });

  return updatedLeave;
};

// ======================================================
// GET ALL EMPLOYEES
// ======================================================

export const getAllEmployees = async () => {
  const employees = await prisma.employee.findMany({
    where: {
      role: "EMPLOYEE",
      isActive: true,
    },

    select: {
      id: true,
      username: true,
      createdAt: true,

      _count: {
        select: {
          leaves: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return employees.map((employee) => ({
    id: employee.id,
    username: employee.username,
    dateOfJoining: employee.createdAt,
    totalLeaves: employee._count.leaves,
  }));
};

// ======================================================
// UPDATE LEAVE REMARKS
// ======================================================

export const updateLeaveRemarks = async (leaveId, remarks) => {
  const leave = await prisma.leave.findUnique({
    where: {
      id: leaveId,
    },
  });

  if (!leave) {
    throw new AppError("Leave request not found.", 404);
  }

  const updatedLeave = await prisma.leave.update({
    where: {
      id: leaveId,
    },
    data: {
      remarks: remarks?.trim() || null,
    },
    include: {
      employee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return updatedLeave;
};
