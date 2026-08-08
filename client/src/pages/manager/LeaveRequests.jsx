import { useEffect } from "react";

import ManagerLayout from "../../layouts/ManagerLayout";
import LeaveRequestTable from "../../components/manager/leave-requests/LeaveRequestTable";

import useManager from "../../hooks/useManager";

const LeaveRequests = () => {
  const {
    requests,
    loading,
    error,
    fetchLeaveRequests,
    approveLeave,
    rejectLeave,
    actionLoading,
  } = useManager();

  // ==========================================
  // Fetch all leave requests
  // ==========================================

  useEffect(() => {
    fetchLeaveRequests({
      page: 1,
      limit: 100,
    });
  }, [fetchLeaveRequests]);

  // ==========================================
  // View request
  // ==========================================

  const handleView = (request) => {
    console.log("View:", request);
  };

  // ==========================================
  // Approve request
  // ==========================================

  const handleApprove = async ({ request }) => {
    try {
      await approveLeave(request.id);
    } catch (error) {
      console.error(
        "Failed to approve leave:",
        error
      );
    }
  };

  // ==========================================
  // Reject request
  // ==========================================

  const handleReject = async ({ request }) => {
    try {
      await rejectLeave(request.id);
    } catch (error) {
      console.error(
        "Failed to reject leave:",
        error
      );
    }
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">

        {/* ========================= */}
        {/* Page Header */}
        {/* ========================= */}

        <div>
          <p className="text-sm font-medium text-blue-600">
            Manager Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Leave Requests
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review, approve, and manage employee leave
            requests.
          </p>
        </div>

        {/* ========================= */}
        {/* Error */}
        {/* ========================= */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ========================= */}
        {/* Leave Requests */}
        {/* ========================= */}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-sm text-slate-500">
              Loading leave requests...
            </p>
          </div>
        ) : (
          <LeaveRequestTable
            requests={requests}
            onView={handleView}
            onApprove={handleApprove}
            onReject={handleReject}
            actionLoading={actionLoading}
          />
        )}

      </div>
    </ManagerLayout>
  );
};

export default LeaveRequests;