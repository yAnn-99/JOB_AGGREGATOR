import { Router } from "express";
import { JobsController } from "../controllers/jobs.controller.js";

const router = Router();

router.get("/", JobsController.getJobs);

router.get("/recommendations", JobsController.getRecommendations);

router.get("/:id", JobsController.getJobById);

export default router;