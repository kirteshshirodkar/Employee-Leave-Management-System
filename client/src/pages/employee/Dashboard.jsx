import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import QuickActions from "../../components/dashboard/QuickActions";
import LeaveHistoryTable from "../../components/dashboard/LeaveHistoryTable";
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

        <LeaveHistoryTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
