import { useEffect } from "react";

import ManagerLayout from "../../layouts/ManagerLayout";
import EmployeeTable from "../../components/manager/employees/EmployeeTable";

import useManager from "../../hooks/useManager";

const Employees = () => {
  const {
    employees,
    employeesLoading,
    error,
    fetchEmployees,
  } = useManager();

  // ==========================================
  // Fetch employees
  // ==========================================

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <ManagerLayout>
      {/* ========================= */}
      {/* Page Header */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* Error */}
      {/* ========================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* ========================= */}
      {/* Employee Table */}
      {/* ========================= */}

      {employeesLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <div
            className="
              mx-auto
              h-7
              w-7
              animate-spin
              rounded-full
              border-2
              border-slate-200
              border-t-blue-600
            "
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading employees...
          </p>
        </div>
      ) : (
        <EmployeeTable
          employees={employees}
        />
      )}
    </ManagerLayout>
  );
};

export default Employees;