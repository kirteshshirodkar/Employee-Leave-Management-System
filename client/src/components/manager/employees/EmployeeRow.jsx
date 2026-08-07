const EmployeeRow = ({ employee }) => {
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (username) => {
    if (!username) return "E";

    const parts = username.split(/[._\s-]+/);

    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`
        .toUpperCase();
    }

    return username.charAt(0).toUpperCase();
  };

  return (
    <tr className="transition-colors hover:bg-slate-50/60">

      {/* Employee */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          {/* Avatar */}
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
            {getInitials(employee.username)}
          </div>

          {/* Username */}
          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-slate-900">
              {employee.username || "Unknown Employee"}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Employee
            </p>

          </div>

        </div>

      </td>

      {/* Date Joined */}
      <td className="px-6 py-4">

        <p className="text-sm text-slate-600">
          {formatDate(employee.createdAt)}
        </p>

      </td>

      {/* Leaves Taken */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-2">

          <span
            className="
              inline-flex
              min-w-[36px]
              items-center
              justify-center
              rounded-lg
              bg-blue-50
              px-2.5
              py-1.5
              text-sm
              font-semibold
              text-blue-600
            "
          >
            {employee.leavesTaken ?? 0}
          </span>

          <span className="text-sm text-slate-500">
            {employee.leavesTaken === 1
              ? "day"
              : "days"}
          </span>

        </div>

      </td>

    </tr>
  );
};

export default EmployeeRow;