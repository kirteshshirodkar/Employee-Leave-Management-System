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
      <div className="mx-auto w-full max-w-7xl">
        {/* ========================= */}
        {/* Page Header */}
        {/* ========================= */}

        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
            Manager Portal
          </p>

          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Employees
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            View all registered employees and their leave usage.
          </p>
        </div>

        {/* ========================= */}
        {/* Error */}
        {/* ========================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:mb-8">
            <p className="text-sm leading-5 text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ========================= */}
        {/* Employee Table */}
        {/* ========================= */}

        <section className="w-full">
          {employeesLoading ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:min-h-[280px] sm:rounded-3xl">
              <div
                className="
                  h-8
                  w-8
                  animate-spin
                  rounded-full
                  border-2
                  border-slate-200
                  border-t-blue-600
                "
              />

              <p className="mt-4 text-sm text-slate-500">
                Loading employees...
              </p>
            </div>
          ) : (
            <EmployeeTable employees={employees} />
          )}
        </section>
      </div>
    </ManagerLayout>
  );
};

export default Employees;