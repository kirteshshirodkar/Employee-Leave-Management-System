import {
    CalendarDays,
    MoreVertical,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

const LeaveHistoryRow = ({ leave }) => {
    return (
        <tr className="transition hover:bg-slate-50">

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
                            ({leave.days} days)
                        </p>

                    </div>

                </div>

            </td>

            <td className="px-6 py-5 text-slate-700">
                {leave.reason}
            </td>

            <td className="px-6 py-5">
                <StatusBadge status={leave.status} />
            </td>

            <td className="px-6 py-5 text-slate-600">
                {leave.remarks || "-"}
            </td>

            <td className="px-6 py-5 text-slate-600">
                {leave.appliedOn}
            </td>

            <td className="px-6 py-5">

                <button className="rounded-lg p-2 hover:bg-slate-100">

                    <MoreVertical
                        size={18}
                        className="text-slate-500"
                    />

                </button>

            </td>

        </tr>
    );
};

export default LeaveHistoryRow;