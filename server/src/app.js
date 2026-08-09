import "dotenv/config";

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import leaveRoutes from "./routes/leave.routes.js";
import managerRoutes from "./routes/manager.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/manager", managerRoutes);

app.use(errorHandler);

export default app;