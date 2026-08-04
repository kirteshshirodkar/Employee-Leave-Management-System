import api from "../utils/axios";

// Apply for leave
export const applyLeave = async (leaveData) => {
    const response = await api.post("/leaves", leaveData);

    return response.data;
};

// Get logged-in employee's leaves
export const getMyLeaves = async () => {
    const response = await api.get("/leaves");

    return response.data;
};