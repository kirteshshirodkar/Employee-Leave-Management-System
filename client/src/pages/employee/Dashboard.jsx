import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import QuickActions from "../../components/dashboard/QuickActions";
import LeaveTable from "../../components/leave/LeaveTable";
import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";

import useLeave from "../../hooks/useLeave";

const Dashboard = () => {
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
    setOpenModal(false);
  };

  return (
    <DashboardLayout onApplyLeave={handleOpenLeaveModal}>
      <div className="space-y-6 sm:space-y-8">
        {/* Welcome */}
        <WelcomeBanner />

        {/* Quick Actions */}
        <QuickActions
          onApplyLeave={handleOpenLeaveModal}
        />

        {/* Leave Requests */}
        <section className="min-w-0">
          <LeaveTable
            leaves={leaves}
            loading={loading}
            error={error}
            maxRows={3}
            showHeader
            showViewAll
            emptyTitle="No Recent Leave Requests"
            emptyDescription="Your recent leave requests will appear here once you submit one."
            onApplyLeave={handleOpenLeaveModal}
          />
        </section>
      </div>

      {/* Modal */}
      <ApplyLeaveModal
        open={openModal}
        onClose={handleCloseLeaveModal}
        onSubmitLeave={handleSubmitLeave}
        submitting={submitting}
      />
    </DashboardLayout>
  );
};

export default Dashboard;