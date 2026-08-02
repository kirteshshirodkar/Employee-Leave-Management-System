import Modal from "../ui/Modal";
import LeaveForm from "./LeaveForm";

const ApplyLeaveModal = ({
    open,
    onClose,
}) => {

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Apply for Leave"
        >

            <LeaveForm
                onClose={onClose}
            />

        </Modal>

    );
};

export default ApplyLeaveModal;