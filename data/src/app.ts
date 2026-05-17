import express from "express";
import cors from "cors";
import recommendationRoutes from "./routes/recommendation.routes.js";
import jobsRoutes from "./routes/jobs.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRoutes);
app.use("/recommendations",recommendationRoutes);

export default app;