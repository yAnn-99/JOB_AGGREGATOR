import { Router } from "express";
import {JobsController} from "../controllers/job.controller.ts";
import { rateLimit } from "express-rate-limit";

const router = Router();
var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

router.use(limiter);

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