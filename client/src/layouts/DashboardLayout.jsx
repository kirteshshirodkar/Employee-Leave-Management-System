import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = ({ children, onApplyLeave }) => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onApplyLeave={onApplyLeave} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
