import { Router } from "express";
import {JobsController} from "../controllers/job.controller.ts";

const router = Router();

router.get("/", JobsController.getAllJobs);

router.get(
  "/filter/search",
  JobsController.filterJobs
);

router.get(
  "/cards/all",
  JobsController.getJobsCards
);

router.get(
  "/:id/details",
  JobsController.getJobDetails
);

router.get("/:id", JobsController.getJobById);

export default router;