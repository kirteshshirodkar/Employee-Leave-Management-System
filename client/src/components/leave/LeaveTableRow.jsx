import { CalendarDays, FileText } from "lucide-react";
import StatusBadge from "./StatusBadge";

const LeaveTableRow = ({ leave, showDocument = false }) => {
  return (
    <tr className="transition-colors duration-200 hover:bg-slate-50">

      {/* Leave Dates */}
      <td className="px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-2">
            <CalendarDays
              size={18}
              className="text-blue-600"
            />
          </div>

          <div>
            <h4 className="font-medium text-slate-800">
              {leave.startDate} - {leave.endDate}
            </h4>

            <p className="text-sm text-slate-500">
              {leave.days} {leave.days > 1 ? "days" : "day"}
            </p>
          </div>
        </div>
      </td>

      {/* Reason */}
      <td className="px-6 py-5 text-slate-700">
        {leave.reason}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={leave.status} />
      </td>

      {/* Manager Remarks */}
      <td className="px-6 py-5">
        {leave.remarks ? (
          <p className="max-w-xs text-sm text-slate-600">
            {leave.remarks}
          </p>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>

      {/* Document */}
      {showDocument && (
        <td className="px-6 py-5">
          {leave.document ? (
            <button
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
            >
              <FileText size={16} />
              View
            </button>
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </td>
      )}

      {/* Applied On */}
      <td className="px-6 py-5 text-sm text-slate-600 whitespace-nowrap">
        {leave.appliedOn}
      </td>
    </tr>
  );
};

export default LeaveTableRow;