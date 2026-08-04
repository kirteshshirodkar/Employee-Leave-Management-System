import {
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";

import StatCard from "./StatCard";

const LeaveStats = ({
  stats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  },
  loading = false,
}) => {

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Pending Requests"
        value={loading ? "..." : stats.pending}
        subtitle="Awaiting manager approval"
        icon={Clock3}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        gradient="hover:bg-gradient-to-br hover:from-amber-50 hover:to-white"
      />

      <StatCard
        title="Approved"
        value={loading ? "..." : stats.approved}
        subtitle="Successfully approved"
        icon={CheckCircle2}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        gradient="hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white"
      />

      <StatCard
        title="Rejected"
        value={loading ? "..." : stats.rejected}
        subtitle="Requests declined"
        icon={XCircle}
        iconBg="bg-red-100"
        iconColor="text-red-600"
        gradient="hover:bg-gradient-to-br hover:from-red-50 hover:to-white"
      />

      <StatCard
        title="Total Requests"
        value={loading ? "..." : stats.total}
        subtitle="Leave requests submitted"
        icon={FileText}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        gradient="hover:bg-gradient-to-br hover:from-blue-50 hover:to-white"
      />

    </section>
  );
};

export default LeaveStats;