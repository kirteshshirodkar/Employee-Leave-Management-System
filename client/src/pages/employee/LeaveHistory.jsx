import { useState } from "react";

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
    loading,
    submitting,
    error,
    applyLeave,
  } = useLeave();

  const handleOpenLeaveModal = () => {
    setOpenModal(true);
  };

  const handleCloseLeaveModal = () => {
    setOpenModal(false);
  };

  const handleSubmitLeave = async (leaveData) => {
    await applyLeave(leaveData);

    // Close modal after successful submission
    setOpenModal(false);
  };

  return (
    <DashboardLayout
      onApplyLeave={handleOpenLeaveModal}
    >
      <div className="space-y-8">

        <LeaveHistoryHeader />

        <LeaveStats
          leaves={leaves}
        />

        <LeaveTable
          leaves={leaves}
          loading={loading}
          error={error}
          showHeader={false}
          showViewAll={false}
          showDocument={true}
          emptyTitle="No Leave History"
          emptyDescription="Looks like you haven't submitted any leave requests yet."
          onApplyLeave={handleOpenLeaveModal}
        />

      </div>

      <ApplyLeaveModal
        open={openModal}
        onClose={handleCloseLeaveModal}
        onSubmitLeave={handleSubmitLeave}
        submitting={submitting}
      />

    </DashboardLayout>
  );
};

export default LeaveHistory;