import {
  CalendarDays,
  FileText,
  MessageSquareText,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const LeaveTableRow = ({
  leave,
  showDocument = false,
  onViewDocument,
  mobile = false,
}) => {
  // =====================================
  // MOBILE CARD
  // =====================================

  if (mobile) {
    return (
      <div className="p-4 sm:p-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
          {/* Top Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              {/* Calendar Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <CalendarDays
                  size={19}
                  className="text-blue-600"
                />
              </div>

              {/* Dates */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {formatDate(leave.startDate)}
                </p>

                <p className="text-sm text-slate-500">
                  to {formatDate(leave.endDate)}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {leave.totalDays}{" "}
                  {leave.totalDays === 1 ? "day" : "days"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="shrink-0">
              <StatusBadge status={leave.status} />
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-slate-200" />

          {/* Reason */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Reason
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-700">
              {leave.reason || "—"}
            </p>
          </div>

          {/* Manager Remarks */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <MessageSquareText
                size={15}
                className="text-slate-400"
              />

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Manager's Remarks
              </p>
            </div>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {leave.remarks || "No remarks yet"}
            </p>
          </div>

          {/* Document */}
          {showDocument && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Supporting Document
              </p>

              {leave.documentUrl ? (
                <button
                  type="button"
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    shadow-sm
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                  onClick={() =>
                    onViewDocument({
                      url: leave.documentUrl,
                      name:
                        leave.documentName ||
                        "Supporting Document",
                    })
                  }
                >
                  <FileText size={16} />
                  View Document
                </button>
              ) : (
                <p className="mt-1 text-sm text-slate-400">
                  No document
                </p>
              )}
            </div>
          )}

          {/* Applied On */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-xs text-slate-400">
              Applied On
            </span>

            <span className="text-xs font-medium text-slate-600">
              {formatDate(leave.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // DESKTOP TABLE ROW
  // =====================================

  return (
    <tr className="transition-colors duration-150 hover:bg-slate-50/70">
      {/* Leave Dates */}
      <td className="px-5 py-5 lg:px-6">
        <div className="flex items-start gap-3 lg:gap-4">
          <div className="rounded-xl bg-blue-50 p-2">
            <CalendarDays
              size={18}
              className="text-blue-600"
            />
          </div>

          <div>
            <h4 className="whitespace-nowrap font-medium text-slate-800">
              {formatDate(leave.startDate)}
              {" - "}
              {formatDate(leave.endDate)}
            </h4>

            <p className="text-sm text-slate-500">
              {leave.totalDays}{" "}
              {leave.totalDays === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
      </td>

      {/* Reason */}
      <td className="max-w-xs px-5 py-5 text-slate-700 lg:px-6">
        <p className="line-clamp-2">
          {leave.reason || "—"}
        </p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 lg:px-6">
        <StatusBadge status={leave.status} />
      </td>

      {/* Manager Remarks */}
      <td className="px-5 py-5 lg:px-6">
        {leave.remarks ? (
          <p className="max-w-xs text-sm leading-6 text-slate-600">
            {leave.remarks}
          </p>
        ) : (
          <span className="text-slate-400">
            —
          </span>
        )}
      </td>

      {/* Document */}
      {showDocument && (
        <td className="px-5 py-5 lg:px-6">
          {leave.documentUrl ? (
            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-slate-50
                px-3
                py-2
                text-sm
                font-medium
                text-slate-700
                transition-all
                duration-200
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-600
              "
              onClick={() =>
                onViewDocument({
                  url: leave.documentUrl,
                  name:
                    leave.documentName ||
                    "Supporting Document",
                })
              }
            >
              <FileText size={16} />
              View
            </button>
          ) : (
            <span className="text-slate-400">
              —
            </span>
          )}
        </td>
      )}

      {/* Applied On */}
      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-600 lg:px-6">
        {formatDate(leave.createdAt)}
      </td>
    </tr>
  );
};

export default LeaveTableRow;