import {
    Clock3,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const styles = {
    PENDING: {
        icon: Clock3,
        className:
            "bg-amber-50 text-amber-600 border border-amber-200",
    },

    APPROVED: {
        icon: CheckCircle2,
        className:
            "bg-emerald-50 text-emerald-600 border border-emerald-200",
    },

    REJECTED: {
        icon: XCircle,
        className:
            "bg-red-50 text-red-600 border border-red-200",
    },
};

const StatusBadge = ({ status }) => {

    const current =
        styles[status] || styles.PENDING;

    const Icon = current.icon;

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${current.className}`}
        >
            <Icon size={15} />

            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
};

export default StatusBadge;