import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeePreview = ({ employees = [] }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Employees
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently registered employees.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
          <Users
            size={17}
            className="text-blue-600"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* Employees */}
      {/* ========================= */}

      <div className="divide-y divide-slate-100">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee.id}
              className="
                flex
                items-center
                gap-3
                px-5
                py-4
                transition-colors
                hover:bg-slate-50/70
              "
            >
              {/* Avatar */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                  text-sm
                  font-semibold
                  text-blue-600
                "
              >
                {employee.username
                  ?.charAt(0)
                  ?.toUpperCase() || "E"}
              </div>

              {/* Employee Information */}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {employee.username || "Unknown Employee"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Joined {formatDate(employee.createdAt)}
                </p>
              </div>

              {/* Leaves Taken */}

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700">
                  {employee.leavesTaken ?? 0}
                </p>

                <p className="text-xs text-slate-400">
                  leaves
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Users
                size={18}
                className="text-slate-400"
              />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-900">
              No employees found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              No registered employees are available.
            </p>
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* View All */}
      {/* ========================= */}

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={() => navigate("/manager/employees")}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-50
            px-4
            py-3
            text-sm
            font-semibold
            text-blue-600
            transition-colors
            hover:bg-blue-100
          "
        >
          View all employees

          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EmployeePreview;