import Modal from "../ui/Modal";
import LeaveForm from "./LeaveForm";

const ApplyLeaveModal = ({
  open,
  onClose,
  onSubmitLeave,
  submitting = false,
}) => {
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Apply for Leave"
    >

      <LeaveForm
        onClose={onClose}
        onSubmitLeave={onSubmitLeave}
        submitting={submitting}
      />
    </Modal>
  );
};

export default ApplyLeaveModal;