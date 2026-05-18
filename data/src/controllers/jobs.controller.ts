import type { Request, Response } from "express";
import { JobsService } from "../services/jobs.service.js";
import { RecommendationService } from "../services/recommendation.service.js";

export class JobsController {
  static async getJobs(
    req: Request,
    res: Response
  ) {
    try {
      const jobs = await JobsService.getJobs();

      res.json(jobs);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch jobs",
      });
    }
  }

  static async getJobById(
    req: Request,
    res: Response
  ) {
    try {
      const idParam = req.params.id;
      const id: string = Array.isArray(idParam) ? idParam[0] : idParam;

      const job = await JobsService.getJobById(id);

      res.json(job);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch job",
      });
    }
  }

  static async getRecommendations(
    req: Request,
    res: Response
  ) {
    try {
      const jobs = await JobsService.getJobs();

      const user = {
        skills: ["React", "TypeScript", "Node.js"],
        remote: true,
      };

      const recommendations =
        RecommendationService.recommend(
          user,
          jobs
        );

      res.json(recommendations);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to generate recommendations",
      });
    }
  }
}