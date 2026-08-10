import { CalendarX } from "lucide-react";
import ApplyLeaveModal from "./ApplyLeaveModal";
import { useState } from "react";
import useLeave from "../../hooks/useLeave";
const EmptyState = ({
  title = "No Leave Requests",
  description = "You haven't submitted any leave requests yet. Once you apply for leave, your requests will appear here.",
  buttonText = "Apply Leave",
  onApplyLeave,
}) => {
  const {
    submitting,

    applyLeave,
  } = useLeave();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenLeaveModal = () => {
    setOpenModal(true);
  };

  const handleCloseLeaveModal = () => {
    setOpenModal(false);
  };
  const handleSubmitLeave = async (leaveData) => {
    await applyLeave(leaveData);
    setOpenModal(false);
  };
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <CalendarX size={40} className="text-blue-600" />
      </div>

      <h2 className="mt-8 text-2xl font-bold text-slate-800">{title}</h2>

      <p className="mt-3 max-w-md text-slate-500 leading-7">{description}</p>

      <button
        onClick={onApplyLeave}
        className="
          mt-8
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          shadow-md
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-blue-700
          hover:shadow-lg
        "
      >
        {buttonText}
      </button>

      <ApplyLeaveModal
        open={openModal}
        onClose={handleCloseLeaveModal}
        onSubmitLeave={handleSubmitLeave}
        submitting={submitting}
      />
    </div>
  );
};

export default EmptyState;
