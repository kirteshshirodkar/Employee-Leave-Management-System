import { UploadCloud } from "lucide-react";

const FileUpload = ({ file, onChange }) => {

    return (

        <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

                Supporting Document

            </label>

            <label
                className="
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-2xl
                    border-2
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    px-5
                    py-5
                    transition
                    hover:border-blue-500
                    hover:bg-blue-50
                "
            >

                <div className="flex items-center gap-4">

                    <UploadCloud
                        className="text-blue-600"
                    />

                    <div>

                        <p className="font-medium text-slate-700">

                            Choose File

                        </p>

                        <p className="text-sm text-slate-500">

                            PDF, JPG or PNG

                        </p>

                    </div>

                </div>

                <span className="text-sm text-slate-500">

                    {file
                        ? file.name
                        : "No file selected"}

                </span>

                <input
                    hidden
                    type="file"
                    onChange={(e)=>onChange(e.target.files[0])}
                />

            </label>

        </div>

    );
};

export default FileUpload;