import api from "../utils/axios";

// GET MANAGER DASHBOARD STATS

export const getManagerDashboardStats = async () => {
  const response = await api.get("/manager/dashboard");

  return response.data;
};

// GET ALL LEAVE REQUESTS

export const getAllLeaveRequests = async ({
  page = 1,
  limit = 10,
  status,
} = {}) => {
  const params = {
    page,
    limit,
  };

  if (status) {
    params.status = status;
  }

  const response = await api.get("/manager/leaves", {
    params,
  });

  return response.data;
};

// GET LEAVE REQUEST BY ID

export const getLeaveRequestById = async (leaveId) => {
  const response = await api.get(`/manager/leaves/${leaveId}`);

  return response.data;
};

// UPDATE LEAVE REMARKS

export const updateLeaveRemarks = async (leaveId, remarks) => {
  const response = await api.patch(`/manager/leaves/${leaveId}/remarks`, {
    remarks,
  });

  return response.data;
};

// APPROVE LEAVE

export const approveLeave = async (leaveId) => {
  const response = await api.patch(`/manager/leaves/${leaveId}/approve`);

  return response.data;
};

// REJECT LEAVE

export const rejectLeave = async (leaveId) => {
  const response = await api.patch(`/manager/leaves/${leaveId}/reject`);

  return response.data;
};

// GET ALL EMPLOYEES

export const getAllEmployees = async () => {
  const response = await api.get("/manager/employees");

  return response.data;
};
