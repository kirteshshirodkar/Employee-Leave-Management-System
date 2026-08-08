import {
  useCallback,
  useState,
} from "react";

import {
  getManagerDashboardStats,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRemarks as updateLeaveRemarksApi,
  approveLeave as approveLeaveApi,
  rejectLeave as rejectLeaveApi,
  getAllEmployees,
} from "../api/managerApi";

const useManager = () => {
  // ==========================================
  // Dashboard statistics
  // ==========================================

  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  // ==========================================
  // Leave requests
  // ==========================================

  const [requests, setRequests] = useState([]);

  // ==========================================
  // Employees
  // ==========================================

  const [employees, setEmployees] = useState([]);

  // ==========================================
  // Selected leave request
  // ==========================================

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  // ==========================================
  // Pagination
  // ==========================================

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // ==========================================
  // Loading states
  // ==========================================

  const [loading, setLoading] = useState(true);

  const [statsLoading, setStatsLoading] =
    useState(true);

  const [employeesLoading, setEmployeesLoading] =
    useState(true);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // Error
  // ==========================================

  const [error, setError] = useState("");

  // ==========================================
  // Fetch dashboard statistics
  // ==========================================

  const fetchDashboardStats = useCallback(
    async () => {
      try {
        setStatsLoading(true);

        const response =
          await getManagerDashboardStats();

        setStats(
          response.data || {
            totalEmployees: 0,
            pendingLeaves: 0,
            approvedLeaves: 0,
            rejectedLeaves: 0,
          }
        );
      } catch (error) {
        console.error(
          "Failed to fetch dashboard statistics:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to fetch dashboard statistics."
        );
      } finally {
        setStatsLoading(false);
      }
    },
    []
  );

  // ==========================================
  // Fetch all leave requests
  // ==========================================

  const fetchLeaveRequests = useCallback(
    async ({
      page = 1,
      limit = 10,
      status,
    } = {}) => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAllLeaveRequests({
            page,
            limit,
            status,
          });

        setRequests(response.requests || []);

        setPagination(
          response.pagination || {
            total: 0,
            page,
            limit,
            totalPages: 0,
          }
        );
      } catch (error) {
        console.error(
          "Failed to fetch leave requests:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to fetch leave requests."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ==========================================
  // Fetch leave request by ID
  // ==========================================

  const fetchLeaveRequestById = useCallback(
    async (leaveId) => {
      try {
        setDetailsLoading(true);
        setError("");

        const response =
          await getLeaveRequestById(leaveId);

        setSelectedRequest(
          response.data || null
        );

        return response.data;
      } catch (error) {
        console.error(
          "Failed to fetch leave request:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to fetch leave request."
        );

        throw error;
      } finally {
        setDetailsLoading(false);
      }
    },
    []
  );

  // ==========================================
  // Fetch all employees
  // ==========================================

  const fetchEmployees = useCallback(async () => {
    try {
      setEmployeesLoading(true);

      const response =
        await getAllEmployees();

      setEmployees(response.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch employees:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch employees."
      );
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  // ==========================================
  // Update remarks
  // ==========================================

  // ==========================================
// Update manager remarks
// ==========================================

const updateLeaveRemarks = useCallback(
  async (leaveId, remarks) => {
    try {
      setActionLoading(true);
      setError("");

      const response =
        await updateLeaveRemarksApi(
          leaveId,
          remarks
        );

      // Update selected request
      setSelectedRequest((previous) =>
        previous
          ? {
              ...previous,
              remarks,
            }
          : previous
      );

      // Update request in table
      setRequests((previous) =>
        previous.map((request) =>
          request.id === leaveId
            ? {
                ...request,
                remarks,
              }
            : request
        )
      );

      return response;

    } catch (error) {
      console.error(
        "Failed to update remarks:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Failed to update manager remarks.";

      setError(message);

      throw error;

    } finally {
      setActionLoading(false);
    }
  },
  []
);
  // ==========================================
  // Approve leave
  // ==========================================

  const approveLeave = async (leaveId) => {
    try {
      setActionLoading(true);
      setError("");

      const response =
        await approveLeaveApi(leaveId);

      if (selectedRequest?.id === leaveId) {
        setSelectedRequest(
          response.data
        );
      }

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request.id === leaveId
            ? {
                ...request,
                status:
                  response.data?.status ||
                  "APPROVED",
              }
            : request
        )
      );

      // Refresh dashboard counts
      await fetchDashboardStats();

      return response;
    } catch (error) {
      console.error(
        "Failed to approve leave:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to approve leave."
      );

      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // Reject leave
  // ==========================================

  const rejectLeave = async (leaveId) => {
    try {
      setActionLoading(true);
      setError("");

      const response =
        await rejectLeaveApi(leaveId);

      if (selectedRequest?.id === leaveId) {
        setSelectedRequest(
          response.data
        );
      }

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request.id === leaveId
            ? {
                ...request,
                status:
                  response.data?.status ||
                  "REJECTED",
              }
            : request
        )
      );

      // Refresh dashboard counts
      await fetchDashboardStats();

      return response;
    } catch (error) {
      console.error(
        "Failed to reject leave:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to reject leave."
      );

      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // Return
  // ==========================================

  return {
    // Dashboard
    stats,

    // Leaves
    requests,
    selectedRequest,
    pagination,

    // Employees
    employees,

    // Loading
    loading,
    statsLoading,
    employeesLoading,
    detailsLoading,
    actionLoading,

    // Error
    error,

    // Functions
    fetchDashboardStats,
    fetchLeaveRequests,
    fetchLeaveRequestById,
    fetchEmployees,
    updateLeaveRemarks,
    approveLeave,
    rejectLeave,

    // State
    setSelectedRequest,
  };
};

export default useManager;