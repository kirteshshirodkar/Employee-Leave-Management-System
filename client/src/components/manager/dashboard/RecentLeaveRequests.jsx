import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeaveStatusBadge from "../leave-requests/LeaveStatusBadge";

const RecentLeaveRequests = () => {
  const navigate = useNavigate();

  // Temporary data.
  // We will replace this with API data later.
  const requests = [
    {
      id: "1",
      employee: {
        username: "john.doe",
      },
      reason: "Medical appointment",
      startDate: "2026-08-08",
      endDate: "2026-08-09",
      status: "PENDING",
    },
    {
      id: "2",
      employee: {
        username: "priya.sharma",
      },
      reason: "Family function",
      startDate: "2026-08-12",
      endDate: "2026-08-14",
      status: "PENDING",
    },
    {
      id: "3",
      employee: {
        username: "rahul.kumar",
      },
      reason: "Personal work",
      startDate: "2026-08-02",
      endDate: "2026-08-02",
      status: "APPROVED",
    },
    {
      id: "4",
      employee: {
        username: "ananya.patel",
      },
      reason: "Travel",
      startDate: "2026-07-28",
      endDate: "2026-07-30",
      status: "REJECTED",
    },
    {
      id: "5",
      employee: {
        username: "rohan.shah",
      },
      reason: "Doctor appointment",
      startDate: "2026-07-25",
      endDate: "2026-07-25",
      status: "APPROVED",
    },
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
      ) + 1;

    return `${difference} ${
      difference === 1 ? "day" : "days"
    }`;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Leave Requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest requests submitted by employees.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/manager/leave-requests")}
          className="
            hidden
            items-center
            gap-1.5
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:text-blue-700
            sm:flex
          "
        >
          View all
          <ArrowRight size={16} />
        </button>

      </div>

      {/* Requests */}
      <div className="divide-y divide-slate-100">

        {requests.map((request) => (
          <div
            key={request.id}
            className="
              flex
              flex-col
              gap-4
              px-6
              py-4
              transition-colors
              hover:bg-slate-50/60
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* Employee */}
            <div className="flex min-w-0 items-center gap-3">

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
                {request.employee.username
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {request.employee.username}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {request.reason}
                </p>
              </div>

            </div>

            {/* Leave Information */}
            <div className="hidden md:block">
              <p className="text-xs text-slate-400">
                Duration
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {calculateDuration(
                  request.startDate,
                  request.endDate
                )}
              </p>
            </div>

            <div className="hidden lg:block">
              <p className="text-xs text-slate-400">
                Dates
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {formatDate(request.startDate)}
                {" – "}
                {formatDate(request.endDate)}
              </p>
            </div>

            {/* Status */}
            <LeaveStatusBadge
              status={request.status}
            />

            {/* View */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/manager/leave-requests/${request.id}`
                )
              }
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                text-slate-500
                transition-all
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-600
              "
              title="View request"
            >
              <Eye size={17} />
            </button>

          </div>
        ))}

      </div>

      {/* Mobile View All */}
      <div className="border-t border-slate-100 p-4 sm:hidden">
        <button
          type="button"
          onClick={() =>
            navigate("/manager/leave-requests")
          }
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
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-100
          "
        >
          View all requests
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default RecentLeaveRequests;