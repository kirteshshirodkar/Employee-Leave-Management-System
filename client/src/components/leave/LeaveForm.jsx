import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FileUpload from "./FileUpload";

const LeaveForm = ({ onClose }) => {

    const [file, setFile] = useState(null);

    return (

        <form className="space-y-6">

            <Input
                label="Leave Reason"
                placeholder="Enter the reason for leave"
            />

            <div className="grid grid-cols-2 gap-5">

                <Input
                    type="date"
                    label="Start Date"
                />

                <Input
                    type="date"
                    label="End Date"
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
                    className="
                        rounded-xl
                        border
                        border-slate-300
                        px-6
                        py-3
                        font-medium
                        hover:bg-slate-100
                    "
                >

                    Cancel

                </button>

                <Button
                    type="submit"
                    className="w-auto px-8"
                >

                    Submit Request

                </Button>

            </div>

        </form>

    );
};

export default LeaveForm;