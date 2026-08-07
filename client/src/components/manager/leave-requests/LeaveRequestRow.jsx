import {
  Eye,
  FileText,
  Check,
  X,
} from "lucide-react";

import LeaveStatusBadge from "./LeaveStatusBadge";

const LeaveRequestRow = ({
  request,
  onView,
  onApprove,
  onReject,
}) => {
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = () => {
    if (!request.startDate || !request.endDate) {
      return "—";
    }

    const start = new Date(request.startDate);
    const end = new Date(request.endDate);

    const difference =
      Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
      ) + 1;

    return `${difference} ${
      difference === 1 ? "day" : "days"
    }`;
  };

  return (
    <tr className="group border-b border-slate-100 transition-colors hover:bg-slate-50/60">

      {/* Employee */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">

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
            {request.employee?.username
              ?.charAt(0)
              ?.toUpperCase() || "E"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {request.employee?.username ||
                "Unknown Employee"}
            </p>

            {request.employee?.email && (
              <p className="mt-0.5 truncate text-xs text-slate-400">
                {request.employee.email}
              </p>
            )}
          </div>

        </div>
      </td>

      {/* Leave Reason */}
      <td className="px-5 py-4">
        <p
          className="max-w-[220px] truncate text-sm text-slate-700"
          title={request.reason}
        >
          {request.reason || "—"}
        </p>
      </td>

      {/* Duration */}
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-slate-700">
          {calculateDuration()}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          {formatDate(request.startDate)}
          {" → "}
          {formatDate(request.endDate)}
        </p>
      </td>

      {/* Applied On */}
      <td className="px-5 py-4">
        <p className="text-sm text-slate-600">
          {formatDate(request.createdAt)}
        </p>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <LeaveStatusBadge status={request.status} />
      </td>

      {/* Document */}
      <td className="px-5 py-4">
        {request.documentUrl ? (
          <button
            type="button"
            onClick={() =>
              window.open(
                request.documentUrl,
                "_blank"
              )
            }
            className="
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-blue-600
              transition-colors
              hover:text-blue-700
            "
          >
            <FileText size={16} />
            View
          </button>
        ) : (
          <span className="text-sm text-slate-400">
            —
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">

          {/* View */}
          <button
            type="button"
            onClick={() => onView?.(request)}
            title="View request"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition-all
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            <Eye size={17} />
          </button>

          {/* Pending actions */}
          {request.status === "PENDING" && (
            <>
              <button
                type="button"
                onClick={() =>
                  onApprove?.(request)
                }
                title="Approve request"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-50
                  text-emerald-600
                  transition-all
                  hover:bg-emerald-100
                "
              >
                <Check size={17} />
              </button>

              <button
                type="button"
                onClick={() =>
                  onReject?.(request)
                }
                title="Reject request"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  text-red-600
                  transition-all
                  hover:bg-red-100
                "
              >
                <X size={17} />
              </button>
            </>
          )}

        </div>
      </td>

    </tr>
  );
};

export default LeaveRequestRow;