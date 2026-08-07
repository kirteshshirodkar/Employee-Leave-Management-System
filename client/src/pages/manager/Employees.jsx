import ManagerLayout from "../../layouts/ManagerLayout";
import EmployeeTable from "../../components/manager/employees/EmployeeTable";

const Employees = () => {
  const employees = [
    {
      id: "1",
      username: "john.doe",
      createdAt: "2026-01-12",
      leavesTaken: 4,
    },
    {
      id: "2",
      username: "priya.sharma",
      createdAt: "2026-01-18",
      leavesTaken: 7,
    },
    {
      id: "3",
      username: "rahul.kumar",
      createdAt: "2026-01-25",
      leavesTaken: 2,
    },
    {
      id: "4",
      username: "ananya.patel",
      createdAt: "2026-02-03",
      leavesTaken: 5,
    },
    {
      id: "5",
      username: "rohan.shah",
      createdAt: "2026-02-10",
      leavesTaken: 3,
    },
    {
      id: "6",
      username: "neha.patel",
      createdAt: "2026-02-17",
      leavesTaken: 6,
    },
  ];

  return (
    <ManagerLayout>
      <div className="space-y-7">

        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-blue-600">
            Manager Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Employees
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View all registered employees and their leave usage.
          </p>
        </div>

        {/* Employee Table */}
        <EmployeeTable employees={employees} />

      </div>
    </ManagerLayout>
  );
};

export default Employees;