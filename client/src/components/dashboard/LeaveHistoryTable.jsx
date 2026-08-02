import { ArrowRight } from "lucide-react";
import LeaveHistoryRow from "./LeaveHistoryRow";

const demoLeaves = [
    {
        id: 1,
        startDate: "12 May 2024",
        endDate: "15 May 2024",
        days: 4,
        reason: "Family Function",
        status: "PENDING",
        remarks: "",
        appliedOn: "08 May 2024",
    },
    {
        id: 2,
        startDate: "22 Apr 2024",
        endDate: "24 Apr 2024",
        days: 3,
        reason: "Medical Appointment",
        status: "APPROVED",
        remarks: "Take care and get well soon.",
        appliedOn: "18 Apr 2024",
    },
    {
        id: 3,
        startDate: "05 Mar 2024",
        endDate: "07 Mar 2024",
        days: 3,
        reason: "Personal Work",
        status: "REJECTED",
        remarks: "Workload is high during this period.",
        appliedOn: "01 Mar 2024",
    },
];

const LeaveHistoryTable = () => {

    return (

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

                <h2 className="text-2xl font-semibold text-slate-800">
                    Leave History
                </h2>

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-50
                        px-4
                        py-2
                        text-blue-600
                        transition
                        hover:bg-blue-100
                    "
                >
                    View All

                    <ArrowRight size={18}/>
                </button>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr className="text-left text-sm font-semibold text-slate-500">

                            <th className="px-6 py-4">Leave Dates</th>

                            <th className="px-6 py-4">Reason</th>

                            <th className="px-6 py-4">Status</th>

                            <th className="px-6 py-4">Manager's Remarks</th>

                            <th className="px-6 py-4">Applied On</th>

                            <th className="px-6 py-4"></th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {demoLeaves.map((leave) => (

                            <LeaveHistoryRow
                                key={leave.id}
                                leave={leave}
                            />

                        ))}

                    </tbody>

                </table>

            </div>

        </section>

    );
};

export default LeaveHistoryTable;