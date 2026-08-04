import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FileUpload from "./FileUpload";

import {
  notifySuccess,
  notifyError,
} from "../../utils/toast";

const LeaveForm = ({
  onClose,
  onSubmitLeave,
  submitting,
}) => {
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  try {
    const data = new FormData();

    data.append("reason", formData.reason);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);

    if (file) {
      data.append("document", file);
    }

    await onSubmitLeave(data);

    notifySuccess(
      "Leave request submitted successfully!"
    );

    setFormData({
      reason: "",
      startDate: "",
      endDate: "",
    });

    setFile(null);

  } catch (error) {
    console.error("Apply leave error:", error);

    const message =
      error.response?.data?.message ||
      "Failed to apply for leave.";

    notifyError(message);

    setError(message);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Inline Error */}
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        label="Leave Reason"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        placeholder="Enter the reason for leave"
      />

      <div className="grid grid-cols-2 gap-5">

        <Input
          type="date"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <Input
          type="date"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

      </div>

      <FileUpload
        file={file}
        onChange={setFile}
      />

      <div className="flex justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-medium
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <Button
          type="submit"
          disabled={submitting}
          className="w-auto px-8"
        >
          {submitting
            ? "Submitting..."
            : "Submit Request"}
        </Button>

      </div>

    </form>
  );
};

export default LeaveForm;