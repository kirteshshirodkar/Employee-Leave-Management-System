import DashboardLayout from "../../layouts/DashboardLayout";
import LeaveHistoryHeader from "../../components/leave-history/LeaveHistoryHeader.jsx";
import LeaveStats from "../../components/leave-history/LeaveStats";
import LeaveTable from "../../components/leave/LeaveTable.jsx";
import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";
import { useState } from "react";

const LeaveHistory = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <DashboardLayout onApplyLeave={() => setOpenModal(true)}>
      <ApplyLeaveModal open={openModal} onClose={() => setOpenModal(false)} />
      <div className="space-y-8">
        <LeaveHistoryHeader />

        <LeaveStats />

        <LeaveTable
          showHeader={false}
          showViewAll={false}
          showDocument
          emptyTitle="No Leave History"
          emptyDescription="Looks like you haven't submitted any leave requests yet."
          onApplyLeave={() => setOpenModal(true)}
        />
      </div>
    </DashboardLayout>
  );
};

export default LeaveHistory;
