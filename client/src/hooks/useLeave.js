import { useCallback, useEffect, useState } from "react";

import {
    applyLeave as applyLeaveApi,
    getMyLeaves,
    getLeaveStats,
} from "../api/leaveApi";

const useLeave = () => {

    // ==========================================
    // Leave data
    // ==========================================

    const [leaves, setLeaves] = useState([]);

    // ==========================================
    // Leave statistics
    // ==========================================

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    // ==========================================
    // Loading states
    // ==========================================

    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // ==========================================
    // Error
    // ==========================================

    const [error, setError] = useState("");

    // ==========================================
    // Fetch employee leaves
    // ==========================================

    const fetchLeaves = useCallback(async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getMyLeaves();

            setLeaves(response.data || []);

        } catch (error) {

            console.error(
                "Failed to fetch leaves:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to fetch leave history."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    // ==========================================
    // Fetch leave statistics
    // ==========================================

    const fetchLeaveStats = useCallback(async () => {

        try {

            setStatsLoading(true);

            const response = await getLeaveStats();

            setStats(
                response.data || {
                    total: 0,
                    pending: 0,
                    approved: 0,
                    rejected: 0,
                }
            );

        } catch (error) {

            console.error(
                "Failed to fetch leave statistics:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to fetch leave statistics."
            );

        } finally {

            setStatsLoading(false);

        }

    }, []);

    // ==========================================
    // Apply for leave
    // ==========================================

    const applyLeave = async (leaveData) => {

        try {

            setSubmitting(true);
            setError("");

            const response =
                await applyLeaveApi(leaveData);

            /*
             * Refresh both:
             *
             * 1. Leave history
             * 2. Leave statistics
             *
             * after a new leave is submitted.
             */

            await Promise.all([
                fetchLeaves(),
                fetchLeaveStats(),
            ]);

            return response;

        } catch (error) {

            console.error(
                "Failed to apply leave:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Failed to apply for leave.";

            setError(message);

            throw error;

        } finally {

            setSubmitting(false);

        }

    };

    // ==========================================
    // Initial data loading
    // ==========================================

    useEffect(() => {

        fetchLeaves();
        fetchLeaveStats();

    }, [
        fetchLeaves,
        fetchLeaveStats,
    ]);

    // ==========================================
    // Return
    // ==========================================

    return {

        // Leave data
        leaves,

        // Statistics
        stats,

        // Loading states
        loading,
        statsLoading,
        submitting,

        // Error
        error,

        // Functions
        fetchLeaves,
        fetchLeaveStats,
        applyLeave,
    };
};

export default useLeave;