import { useCallback, useEffect } from "react";

import ManagerLayout from "../../layouts/ManagerLayout";
import ManagerStats from "../../components/manager/dashboard/ManagerStats";
import LeaveRequestTable from "../../components/manager/leave-requests/LeaveRequestTable";
import EmployeePreview from "../../components/manager/dashboard/EmployeePreview";

import useManager from "../../hooks/useManager";

const ManagerDashboard = () => {
  const {
    stats,
    requests,
    employees,

    loading,
    statsLoading,
    employeesLoading,
    error,

    fetchDashboardStats,
    fetchLeaveRequests,
    fetchEmployees,

    approveLeave,
    rejectLeave,
  } = useManager();

  // ==========================================
  // Fetch dashboard data
  // ==========================================

  const fetchDashboardData = useCallback(async () => {
    await Promise.all([
      fetchDashboardStats(),

      fetchLeaveRequests({
        page: 1,
        limit: 5,
      }),

      fetchEmployees(),
    ]);
  }, [
    fetchDashboardStats,
    fetchLeaveRequests,
    fetchEmployees,
  ]);

  // ==========================================
  // Initial loading
  // ==========================================

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ==========================================
  // Approve leave
  // ==========================================

  const handleApprove = async ({ request }) => {
    try {
      await approveLeave(request.id);

      await Promise.all([
        fetchDashboardStats(),

        fetchLeaveRequests({
          page: 1,
          limit: 5,
        }),
      ]);

      // Toast handled by LeaveRequestModal
    } catch (error) {
      console.error(
        "Failed to approve leave:",
        error
      );

      throw error;
    }
  };

  // ==========================================
  // Reject leave
  // ==========================================

  const handleReject = async ({ request }) => {
    try {
      await rejectLeave(request.id);

      await Promise.all([
        fetchDashboardStats(),

        fetchLeaveRequests({
          page: 1,
          limit: 5,
        }),
      ]);

      // Toast handled by LeaveRequestModal
    } catch (error) {
      console.error(
        "Failed to reject leave:",
        error
      );

      throw error;
    }
  };

  return (
    <ManagerLayout>
      <div className="space-y-8">

        {/* ==========================================
            Page Header
        ========================================== */}

        <div>
          <p className="text-sm font-medium text-blue-600">
            Manager Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Manage employees and review leave requests
            from one place.
          </p>
        </div>

        {/* ==========================================
            Global Error
        ========================================== */}

        {error && (
          <div className="-mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ==========================================
            Statistics
        ========================================== */}

        <section>
          <ManagerStats
            totalEmployees={stats.totalEmployees}
            pendingRequests={stats.pendingLeaves}
            approvedRequests={stats.approvedLeaves}
            rejectedRequests={stats.rejectedLeaves}
            loading={statsLoading}
          />
        </section>

        {/* ==========================================
            Main Dashboard Content
        ========================================== */}

        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">

          {/* ========================================
              Leave Requests
          ======================================== */}

          <div className="min-w-0">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <div className="text-center">
                  <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                  <p className="mt-3 text-sm text-slate-500">
                    Loading leave requests...
                  </p>
                </div>
              </div>
            ) : (
              <LeaveRequestTable
                requests={requests}
                showViewAll
                onApprove={handleApprove}
                onReject={handleReject}
              />
            )}
          </div>

          {/* ========================================
              Employees
          ======================================== */}

          <div className="min-w-0">
            {employeesLoading ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <div className="text-center">
                  <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                  <p className="mt-3 text-sm text-slate-500">
                    Loading employees...
                  </p>
                </div>
              </div>
            ) : (
              <EmployeePreview
                employees={employees.slice(0, 5)}
              />
            )}
          </div>

        </section>

      </div>
    </ManagerLayout>
  );
};

export default ManagerDashboard;