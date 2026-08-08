import {
  CalendarDays,
  Clock3,
  FileText,
  UserRound,
  X,
  ExternalLink,
  Check,
  XCircle,
} from "lucide-react";

const LeaveRequestDetails = ({
  request,
  remarks,
  setRemarks,
  onApprove,
  onReject,
  onClose,
  loading = false,
}) => {
  if (!request) return null;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = () => {
    if (!request.startDate || !request.endDate) {
      return "-";
    }

    const start = new Date(request.startDate);
    const end = new Date(request.endDate);

    const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    return `${difference} ${difference === 1 ? "day" : "days"}`;
  };

  const isPending = request.status === "PENDING";

  return (
    <div className="flex max-h-[90vh] flex-col">
      {/* ========================= */}
      {/* Modal Header */}
      {/* ========================= */}

      <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Leave Request
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Request Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review the employee's leave request before taking action.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-600
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* ========================= */}
      {/* Content */}
      {/* ========================= */}

      <div className="overflow-y-auto px-6 py-6">
        <div className="space-y-6">
          {/* ========================= */}
          {/* Employee */}
          {/* ========================= */}

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-100
                  text-blue-600
                "
              >
                <UserRound size={21} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Employee</p>

                <p className="mt-1 text-base font-semibold text-slate-900">
                  {request.employee?.username ||
                    request.username ||
                    "Unknown employee"}
                </p>
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* Leave Reason */}
          {/* ========================= */}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />

              <p className="text-sm font-semibold text-slate-700">
                Leave Reason
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm leading-6 text-slate-700">
                {request.reason || "No reason provided."}
              </p>
            </div>
          </div>

          {/* ========================= */}
          {/* Dates + Duration */}
          {/* ========================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Leave From */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-blue-500" />

                <p className="text-xs font-medium text-slate-500">Leave From</p>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDate(request.startDate)}
              </p>
            </div>

            {/* Leave To */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-blue-500" />

                <p className="text-xs font-medium text-slate-500">Leave To</p>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {formatDate(request.endDate)}
              </p>
            </div>

            {/* Duration */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-blue-500" />

                <p className="text-xs font-medium text-slate-500">Duration</p>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {calculateDuration()}
              </p>
            </div>
          </div>

          {/* ========================= */}
          {/* Supporting Document */}
          {/* ========================= */}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />

              <p className="text-sm font-semibold text-slate-700">
                Supporting Document
              </p>
            </div>

            {request.documentUrl ? (
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FileText size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      Supporting document
                    </p>

                    <p className="text-xs text-slate-500">Uploaded document</p>
                  </div>
                </div>

                <a
                  href={request.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    ml-4
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-blue-200
                    bg-white
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-blue-600
                    transition
                    hover:bg-blue-50
                  "
                >
                  View
                  <ExternalLink size={14} />
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-4">
                <p className="text-sm text-slate-500">
                  No supporting document was uploaded.
                </p>
              </div>
            )}
          </div>

          {/* ========================= */}
          {/* Existing Manager Remarks */}
          {/* ========================= */}

          {!isPending && request.remarks && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FileText size={16} className="text-slate-400" />

                <p className="text-sm font-semibold text-slate-700">
                  Manager Remarks
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                <p className="text-sm leading-6 text-slate-700">
                  {request.remarks}
                </p>
              </div>
            </div>
          )}

          {/* ========================= */}
          {/* Manager Remarks */}
          {/* ========================= */}

          {isPending && (
            <div>
              <label
                htmlFor="managerRemarks"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Manager Remarks
                <span className="ml-1 font-normal text-slate-400">
                  (optional)
                </span>
              </label>

              <textarea
                id="managerRemarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter a reason or remarks for your decision..."
                rows={4}
                disabled={loading}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-blue-400
                  focus:ring-4
                  focus:ring-blue-50
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                "
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Add remarks to explain your approval or rejection.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* Actions */}
      {/* ========================= */}

      {isPending ? (
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onReject}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-red-600
              transition
              hover:bg-red-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <XCircle size={17} />
            Reject Leave
          </button>

          <button
            type="button"
            onClick={onApprove}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-green-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-green-600
              shadow-sm
              transition
              hover:bg-green-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Check size={17} />
            Approve Leave
          </button>
        </div>
      ) : (
        <div className="flex justify-end border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestDetails;
