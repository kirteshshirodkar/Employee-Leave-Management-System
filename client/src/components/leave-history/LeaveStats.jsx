import {
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";

import StatCard from "./StatCard";

const LeaveStats = ({ leaves = [] }) => {

  const stats = {
    pending: leaves.filter(
      (leave) => leave.status === "PENDING"
    ).length,

    approved: leaves.filter(
      (leave) => leave.status === "APPROVED"
    ).length,

    rejected: leaves.filter(
      (leave) => leave.status === "REJECTED"
    ).length,

    total: leaves.length,
  };

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Pending Requests"
        value={stats.pending}
        subtitle="Awaiting manager approval"
        icon={Clock3}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        gradient="hover:bg-gradient-to-br hover:from-amber-50 hover:to-white"
      />

      <StatCard
        title="Approved"
        value={stats.approved}
        subtitle="Successfully approved"
        icon={CheckCircle2}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        gradient="hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white"
      />

      <StatCard
        title="Rejected"
        value={stats.rejected}
        subtitle="Requests declined"
        icon={XCircle}
        iconBg="bg-red-100"
        iconColor="text-red-600"
        gradient="hover:bg-gradient-to-br hover:from-red-50 hover:to-white"
      />

      <StatCard
        title="Total Requests"
        value={stats.total}
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