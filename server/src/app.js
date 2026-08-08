import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import leaveRoutes from "./routes/leave.routes.js";
import managerRoutes from "./routes/manager.routes.js";
const CLIENT_URL = import.meta.env.CLIENT_URL;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/leaves", leaveRoutes);

app.use("/api/manager", managerRoutes);

/*
  Error middleware MUST be last
*/
app.use(errorHandler);

export default app;