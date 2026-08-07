import ManagerLayout from "../../layouts/ManagerLayout";
import ManagerStats from "../../components/manager/dashboard/ManagerStats";
import LeaveRequestTable from "../../components/manager/leave-requests/LeaveRequestTable";
import EmployeePreview from "../../components/manager/dashboard/EmployeePreview";

const ManagerDashboard = () => {
  const requests = [
    {
      id: "1",
      employee: {
        username: "john.doe",
        email: "john@example.com",
      },
      reason: "Medical appointment",
      startDate: "2026-08-08",
      endDate: "2026-08-09",
      status: "PENDING",
      documentUrl: null,
      createdAt: "2026-08-05",
    },
    {
      id: "2",
      employee: {
        username: "priya.sharma",
        email: "priya@example.com",
      },
      reason: "Family function",
      startDate: "2026-08-12",
      endDate: "2026-08-14",
      status: "PENDING",
      documentUrl: "#",
      createdAt: "2026-08-04",
    },
    {
      id: "3",
      employee: {
        username: "rahul.kumar",
        email: "rahul@example.com",
      },
      reason: "Personal work",
      startDate: "2026-08-02",
      endDate: "2026-08-02",
      status: "APPROVED",
      documentUrl: null,
      createdAt: "2026-08-01",
    },
    {
      id: "4",
      employee: {
        username: "ananya.patel",
        email: "ananya@example.com",
      },
      reason: "Travel",
      startDate: "2026-07-28",
      endDate: "2026-07-30",
      status: "REJECTED",
      documentUrl: null,
      createdAt: "2026-07-27",
    },
    {
      id: "5",
      employee: {
        username: "rohan.shah",
        email: "rohan@example.com",
      },
      reason: "Doctor appointment",
      startDate: "2026-07-25",
      endDate: "2026-07-25",
      status: "APPROVED",
      documentUrl: null,
      createdAt: "2026-07-24",
    },
    {
      id: "6",
      employee: {
        username: "neha.patel",
        email: "neha@example.com",
      },
      reason: "Personal work",
      startDate: "2026-07-20",
      endDate: "2026-07-21",
      status: "PENDING",
      documentUrl: null,
      createdAt: "2026-07-19",
    },
  ];

  const employees = [
    {
      id: "1",
      username: "john.doe",
      joined: "12 Jan 2026",
      leavesTaken: 4,
    },
    {
      id: "2",
      username: "priya.sharma",
      joined: "18 Jan 2026",
      leavesTaken: 7,
    },
    {
      id: "3",
      username: "rahul.kumar",
      joined: "25 Jan 2026",
      leavesTaken: 2,
    },
    {
      id: "4",
      username: "ananya.patel",
      joined: "03 Feb 2026",
      leavesTaken: 5,
    },
    {
      id: "5",
      username: "rohan.shah",
      joined: "10 Feb 2026",
      leavesTaken: 3,
    },
  ];

  // Show only the latest 5 requests
  const recentRequests = requests.slice(0, 5);

  return (
    <ManagerLayout>
      <div className="space-y-7">

        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-blue-600">
            Manager Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage employees and review leave requests from one place.
          </p>
        </div>

        {/* Stats */}
        <ManagerStats
          totalEmployees={42}
          pendingRequests={8}
          approvedRequests={21}
          rejectedRequests={5}
        />

        {/* Dashboard Content */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]
          "
        >

          {/* Leave Requests */}
          <LeaveRequestTable
            requests={recentRequests}
            showViewAll
          />

          {/* Employees */}
          <EmployeePreview
            employees={employees}
          />

        </div>

      </div>
    </ManagerLayout>
  );
};

export default ManagerDashboard;