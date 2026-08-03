import { X, Download, FileText } from "lucide-react";

const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

const DocumentPreviewModal = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
}) => {
  if (!isOpen) return null;

  const extension = fileName?.split(".").pop()?.toLowerCase();

  const isImage = imageExtensions.includes(extension);
  const isPdf = extension === "pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="relative flex h-[85vh] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-50 p-3">
              <FileText
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-800">
                Supporting Document
              </h2>

              <p className="text-sm text-slate-500">
                {fileName}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <a
              href={fileUrl}
              download
              className="rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200"
            >
              <Download size={18} />
            </a>

            <button
              onClick={onClose}
              className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
            >
              <X size={18} />
            </button>

          </div>

        </div>

        {/* Preview */}

        <div className="flex-1 bg-slate-100">

          {isPdf && (

            <iframe
              src={fileUrl}
              title="Document Preview"
              className="h-full w-full"
            />

          )}

          {isImage && (

            <div className="flex h-full items-center justify-center p-8">

              <img
                src={fileUrl}
                alt={fileName}
                className="max-h-full rounded-2xl shadow-lg"
              />

            </div>

          )}

          {!isPdf && !isImage && (

            <div className="flex h-full flex-col items-center justify-center">

              <FileText
                size={60}
                className="text-slate-400"
              />

              <p className="mt-6 text-slate-600">
                Preview isn't available for this file type.
              </p>

              <a
                href={fileUrl}
                download
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white"
              >
                Download File
              </a>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default DocumentPreviewModal;