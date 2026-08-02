import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import QuickActions from "../../components/dashboard/QuickActions";
import LeaveHistoryTable from "../../components/dashboard/LeaveHistoryTable";
const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeBanner />

        <QuickActions />

        <LeaveHistoryTable/>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
