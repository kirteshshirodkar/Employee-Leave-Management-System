import { useEffect, useState } from "react";

import LeaveRequestDetails from "./LeaveRequestDetails";

import useManager from "../../../hooks/useManager";

import {
  notifySuccess,
  notifyError,
} from "../../../utils/toast";

const LeaveRequestModal = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
  loading = false,
}) => {
  const [remarks, setRemarks] = useState("");

  const [requestDetails, setRequestDetails] =
    useState(request);

  const {
    fetchLeaveRequestById,
    updateLeaveRemarks,
    detailsLoading,
  } = useManager();

  // ==========================================
  // Fetch complete request details
  // ==========================================

  useEffect(() => {
    if (!isOpen || !request?.id) {
      return;
    }

    const loadRequest = async () => {
      try {
        const leave =
          await fetchLeaveRequestById(
            request.id
          );

        setRequestDetails(leave);

        // Load existing manager remarks
        setRemarks(leave?.remarks || "");
      } catch (error) {
        console.error(
          "Failed to load leave request:",
          error
        );

        notifyError(
          error.response?.data?.message ||
            "Failed to load leave request."
        );
      }
    };

    loadRequest();
  }, [
    isOpen,
    request?.id,
    fetchLeaveRequestById,
  ]);

  // ==========================================
  // Reset request when a different request opens
  // ==========================================

  useEffect(() => {
    if (isOpen && request) {
      setRequestDetails(request);
      setRemarks(request.remarks || "");
    }
  }, [isOpen, request]);

  // ==========================================
  // Prevent background scrolling
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ==========================================
  // Escape key
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (
        event.key === "Escape" &&
        !loading &&
        !detailsLoading
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    isOpen,
    loading,
    detailsLoading,
    onClose,
  ]);

  // ==========================================
  // Save remarks
  // ==========================================

  const saveRemarks = async () => {
    const trimmedRemarks =
      remarks.trim();

    // Don't call API if nothing changed
    if (
      trimmedRemarks ===
      (requestDetails?.remarks || "").trim()
    ) {
      return true;
    }

    if (!requestDetails?.id) {
      notifyError(
        "Leave request ID is missing."
      );

      return false;
    }

    try {
      await updateLeaveRemarks(
        requestDetails.id,
        trimmedRemarks
      );

      setRequestDetails((previous) => ({
        ...previous,
        remarks: trimmedRemarks,
      }));

      return true;
    } catch (error) {
      console.error(
        "Failed to save remarks:",
        error
      );

      notifyError(
        error.response?.data?.message ||
          "Failed to save manager remarks."
      );

      return false;
    }
  };

  // ==========================================
  // Approve
  // ==========================================

  const handleApprove = async () => {
    // Save remarks first
    const remarksSaved =
      await saveRemarks();

    if (!remarksSaved) {
      return;
    }

    try {
      await onApprove({
        request: requestDetails,
      });

      notifySuccess(
        "Leave request approved successfully."
      );

      onClose();
    } catch (error) {
      console.error(
        "Failed to approve leave:",
        error
      );

      notifyError(
        error.response?.data?.message ||
          "Failed to approve leave."
      );
    }
  };

  // ==========================================
  // Reject
  // ==========================================

  const handleReject = async () => {
    // Save remarks first
    const remarksSaved =
      await saveRemarks();

    if (!remarksSaved) {
      return;
    }

    try {
      await onReject({
        request: requestDetails,
      });

      notifySuccess(
        "Leave request rejected successfully."
      );

      onClose();
    } catch (error) {
      console.error(
        "Failed to reject leave:",
        error
      );

      notifyError(
        error.response?.data?.message ||
          "Failed to reject leave."
      );
    }
  };

  // ==========================================
  // Nothing to render
  // ==========================================

  if (!isOpen || !requestDetails) {
    return null;
  }

  const isLoading =
    loading || detailsLoading;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !isLoading
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {detailsLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div
                className="
                  mx-auto
                  h-8
                  w-8
                  animate-spin
                  rounded-full
                  border-2
                  border-slate-200
                  border-t-blue-600
                "
              />

              <p className="mt-3 text-sm text-slate-500">
                Loading request details...
              </p>
            </div>
          </div>
        ) : (
          <LeaveRequestDetails
            request={requestDetails}
            remarks={remarks}
            setRemarks={setRemarks}
            onApprove={handleApprove}
            onReject={handleReject}
            onClose={onClose}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveRequestModal;