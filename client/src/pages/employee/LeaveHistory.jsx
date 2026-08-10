import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import LeaveHistoryHeader from "../../components/leave-history/LeaveHistoryHeader";
import LeaveStats from "../../components/leave-history/LeaveStats";

import LeaveTable from "../../components/leave/LeaveTable";
import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";

import useLeave from "../../hooks/useLeave";

const LeaveHistory = () => {
  const [openModal, setOpenModal] = useState(false);

  const {
    leaves,
    stats,
    loading,
    statsLoading,
    error,
    fetchLeaves,
    fetchLeaveStats,
    submitLeave,
  } = useLeave();

  useEffect(() => {
    fetchLeaves();
    fetchLeaveStats();
  }, []);

  return (
    <DashboardLayout
      onApplyLeave={() => setOpenModal(true)}
    >

      <ApplyLeaveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmitLeave={submitLeave}
      />

      <div className="space-y-8">

        <LeaveHistoryHeader />

        {/* Leave Statistics */}
        <LeaveStats
          stats={stats}
          loading={statsLoading}
        />

        {/* Leave History */}
        <LeaveTable
          leaves={leaves}
          loading={loading}
          error={error}
          showHeader={false}
          showViewAll={false}
          showDocument={true}
          emptyTitle="No Leave History"
          emptyDescription="Looks like you haven't submitted any leave requests yet."
          onApplyLeave={() => setOpenModal(true)}
        />

      </div>

    </DashboardLayout>
  );
};

export default LeaveHistory;