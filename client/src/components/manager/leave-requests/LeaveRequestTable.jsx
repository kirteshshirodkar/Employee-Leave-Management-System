import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LeaveRequestRow from "./LeaveRequestRow";
import LeaveRequestModal from "./LeaveRequestModal";

const LeaveRequestTable = ({
  requests = [],
  showViewAll = false,
  onApprove,
  onReject,
}) => {
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  // =========================
  // Open Modal
  // =========================

  const handleView = (request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  // =========================
  // Close Modal
  // =========================

  const handleCloseModal = () => {
    if (actionLoading) return;

    setModalOpen(false);
    setSelectedRequest(null);
  };

  // =========================
  // Approve
  // =========================

  const handleApprove = async ({
    request,
    remarks,
  }) => {
    try {
      setActionLoading(true);

      console.log("APPROVING REQUEST:", request);
      console.log("MANAGER REMARKS:", remarks);

      // API will be connected here later

      onApprove?.({
        request,
        remarks,
      });

    } catch (error) {
      console.error(
        "Failed to approve request:",
        error
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // Reject
  // =========================

  const handleReject = async ({
    request,
    remarks,
  }) => {
    try {
      setActionLoading(true);

      console.log("REJECTING REQUEST:", request);
      console.log("MANAGER REMARKS:", remarks);

      // API will be connected here later

      onReject?.({
        request,
        remarks,
      });

    } catch (error) {
      console.error(
        "Failed to reject request:",
        error
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        "
      >

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Leave Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage employee leave requests.
            </p>
          </div>

          {showViewAll && (
            <button
              type="button"
              onClick={() =>
                navigate("/manager/leave-requests")
              }
              className="
                hidden
                items-center
                gap-1.5
                rounded-lg
                bg-blue-50
                px-3
                py-2
                text-sm
                font-medium
                text-blue-600
                transition-colors
                hover:bg-blue-100
                sm:flex
              "
            >
              View all
              <ArrowRight size={16} />
            </button>
          )}

        </div>

        {/* ========================= */}
        {/* Table */}
        {/* ========================= */}

        <div className="overflow-x-auto overflow-auto no-scrollbar">

          <table className="w-full min-w-[1050px]">

            {/* Table Head */}

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Leave Reason
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Duration
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applied On
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Document
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            {/* ========================= */}
            {/* Table Body */}
            {/* ========================= */}

            <tbody className="divide-y divide-slate-100">

              {requests.length > 0 ? (
                requests.map((request) => (
                  <LeaveRequestRow
                    key={request.id}
                    request={request}
                    onView={handleView}
                  />
                ))
              ) : (
                <tr>

                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >

                    <div className="mx-auto flex max-w-sm flex-col items-center">

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-slate-100
                        "
                      >
                        <FileText
                          size={21}
                          className="text-slate-400"
                        />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-slate-900">
                        No leave requests
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        There are currently no leave requests
                        to display.
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ========================= */}
        {/* Mobile View All */}
        {/* ========================= */}

        {showViewAll && (
          <div className="border-t border-slate-100 p-4 sm:hidden">

            <button
              type="button"
              onClick={() =>
                navigate("/manager/leave-requests")
              }
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-50
                px-4
                py-3
                text-sm
                font-medium
                text-blue-600
                transition-colors
                hover:bg-blue-100
              "
            >
              View all requests
              <ArrowRight size={16} />
            </button>

          </div>
        )}

      </div>

      {/* ========================= */}
      {/* Leave Request Modal */}
      {/* ========================= */}

      <LeaveRequestModal
        request={selectedRequest}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onApprove={handleApprove}
        onReject={handleReject}
        loading={actionLoading}
      />
    </>
  );
};

export default LeaveRequestTable;