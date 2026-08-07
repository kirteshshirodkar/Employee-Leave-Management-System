const LeaveStatusBadge = ({ status }) => {
  const styles = {
    PENDING: {
      wrapper: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      label: "Pending",
    },

    APPROVED: {
      wrapper: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Approved",
    },

    REJECTED: {
      wrapper: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
      label: "Rejected",
    },
  };

  const current = styles[status] || {
    wrapper: "bg-slate-50 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
    label: status || "Unknown",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-medium
        ${current.wrapper}
      `}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${current.dot}`}
      />

      {current.label}
    </span>
  );
};

export default LeaveStatusBadge;