import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import leaveRoutes from "./routes/leave.routes.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/leaves", leaveRoutes);

/*
  Error middleware MUST be last
*/
app.use(errorHandler);

export default app;