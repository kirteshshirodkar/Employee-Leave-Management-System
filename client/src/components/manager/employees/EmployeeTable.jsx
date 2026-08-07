import { Users } from "lucide-react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees = [] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            All Employees
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A list of all employees registered in the system.
          </p>
        </div>

        {/* Employee Count */}
        <div className="hidden items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 sm:flex">
          <Users
            size={16}
            className="text-blue-600"
          />

          <span className="text-sm font-semibold text-blue-600">
            {employees.length}{" "}
            {employees.length === 1
              ? "Employee"
              : "Employees"}
          </span>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date Joined
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Leaves Taken
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">

            {employees.length > 0 ? (
              employees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Users
                        size={21}
                        className="text-slate-400"
                      />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      No employees found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      There are currently no registered employees.
                    </p>

                  </div>
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default EmployeeTable;