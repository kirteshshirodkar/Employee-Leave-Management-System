import { useEffect, useState } from "react";
import LeaveRequestDetails from "./LeaveRequestDetails";

const LeaveRequestModal = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
  loading = false,
}) => {
  const [remarks, setRemarks] = useState("");

  // Reset remarks whenever a new request is opened
  useEffect(() => {
    if (isOpen) {
      setRemarks("");
    }
  }, [isOpen, request?.id]);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close modal with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen || !request) {
    return null;
  }

  const handleApprove = () => {
    onApprove({
      request,
      remarks,
    });
  };

  const handleReject = () => {
    onReject({
      request,
      remarks,
    });
  };

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
          event.target === event.currentTarget &&
          !loading
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
        <LeaveRequestDetails
          request={request}
          remarks={remarks}
          setRemarks={setRemarks}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={onClose}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LeaveRequestModal;