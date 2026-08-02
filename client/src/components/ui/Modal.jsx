import { X } from "lucide-react";

const Modal = ({ open, onClose, title, children }) => {

    if (!open) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-slate-900/40
                backdrop-blur-sm
                p-4
            "
        >
            <div
                className="
                    relative
                    w-full
                    max-w-2xl
                    rounded-3xl
                    bg-white
                    shadow-2xl
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

                    <div>

                        <h2 className="text-2xl font-semibold text-slate-900">
                            {title}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Complete the details below.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            rounded-xl
                            p-2
                            transition
                            hover:bg-slate-100
                        "
                    >
                        <X size={22}/>
                    </button>

                </div>

                <div className="p-8">

                    {children}

                </div>

            </div>
        </div>
    );
};

export default Modal;