import { useCallback, useEffect, useState } from "react";
import {
    applyLeave as applyLeaveApi,
    getMyLeaves,
} from "../api/leaveApi";

const useLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const fetchLeaves = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMyLeaves();

            setLeaves(response.data || []);
        } catch (error) {
            console.error("Failed to fetch leaves:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch leave history."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const applyLeave = async (leaveData) => {
        try {
            setSubmitting(true);
            setError("");

            const response = await applyLeaveApi(leaveData);

            // Refresh the leave list after successful submission
            await fetchLeaves();

            return response;
        } catch (error) {
            console.error("Failed to apply leave:", error);

            const message =
                error.response?.data?.message ||
                "Failed to apply for leave.";

            setError(message);

            throw error;
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [fetchLeaves]);

    return {
        leaves,
        loading,
        submitting,
        error,
        fetchLeaves,
        applyLeave,
    };
};

export default useLeave;