import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ManagerStats = ({
  totalEmployees = 0,
  pendingRequests = 0,
  approvedRequests = 0,
  rejectedRequests = 0,
}) => {
  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      description: "Registered employees",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      description: "Awaiting your review",
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Approved Requests",
      value: approvedRequests,
      description: "Leave requests approved",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Rejected Requests",
      value: rejectedRequests,
      description: "Leave requests rejected",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-[0_4px_20px_rgba(15,23,42,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
            "
          >
            {/* Subtle decorative background */}
            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-slate-50
                transition-transform
                duration-500
                group-hover:scale-150
              "
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>

              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${stat.iconBg}
                  ${stat.iconColor}
                `}
              >
                <Icon size={21} strokeWidth={2} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManagerStats;