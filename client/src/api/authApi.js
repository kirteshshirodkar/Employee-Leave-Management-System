import api from "../utils/axios";

export const register = (data) =>
    api.post("/auth/register", data);

export const login = (data) =>
    api.post("/auth/login", data);

export const managerLogin = (data) =>
    api.post("/auth/manager/login", data);



export const getCurrentUser = () =>
    api.get("/auth/me");