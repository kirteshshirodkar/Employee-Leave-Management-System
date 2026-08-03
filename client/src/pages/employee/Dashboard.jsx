import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import QuickActions from "../../components/dashboard/QuickActions";
import LeaveTable from "../../components/leave/LeaveTable";
import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";
import { useState } from "react";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <DashboardLayout onApplyLeave={() => setOpenModal(true)}>
      <div className="space-y-8">
        <WelcomeBanner />

        <QuickActions onApplyLeave={() => setOpenModal(true)} />
        <ApplyLeaveModal open={openModal} onClose={() => setOpenModal(false)} />

        <LeaveTable
          
          maxRows={3}
          showHeader
          showViewAll
          emptyTitle="No Recent Leave Requests"
          emptyDescription="Your recent leave requests will appear here once you submit one."
          onApplyLeave={() => setOpenModal(true)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
