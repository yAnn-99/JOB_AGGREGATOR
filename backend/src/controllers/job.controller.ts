import type { Request, Response } from 'express';
import { WeLoveDevsService } from "../services/welovedevs.service.ts";

export class JobsController {
  
  /* GET /api/jobs */
  static async getAllJobs(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 0);
      const size = Number(req.query.size || 10);
      const q = String(req.query.q || "");

      const jobs = await WeLoveDevsService.getAllJobs(
        page,
        size,
        q
      );

      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message: "Failed to get jobs",
        error,
      });
    }
  }

  /* GET /api/jobs/:id*/
  static async getJobById(req: Request, res: Response) {
    try {
      const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);

      const job = await WeLoveDevsService.getJobById(id);

      res.json(job);
    } catch (error) {
      res.status(500).json({
        message: "Failed to get job",
        error,
      });
    }
  }

  /* GET /api/jobs/filter/search */
  static async filterJobs(req: Request, res: Response) {
    try {
      const jobs = await WeLoveDevsService.getFilteredJobs({
        q: String(req.query.q || ""),
        page: Number(req.query.page || 0),
        size: Number(req.query.size || 10),
      });

      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message: "Failed to filter jobs",
        error,
      });
    }
  }

  /* GET /api/jobs/cards */
  static async getJobsCards(req: Request, res: Response) {
    try {
      const jobsData = await WeLoveDevsService.getAllJobs();

      const cards = jobsData.values.map((job: any) => ({
        id: job.id,
        title: job.title,

        company: job.smallCompany?.companyName,

        location: job.formattedPlaces,

        remote: job.details?.acceptRemote,

        salary: {
          min: job.details?.salary?.min,
          max: job.details?.salary?.max,
          currency: job.details?.salary?.currency,
        },

        contracts: job.contractTypes,

        skills: job.skillsList?.map((skill: any) => skill.name),

        image: job.smallCompany?.fallbackGalleryUrl,

        preview: job.descriptionPreview,
      }));

      res.json(cards);
    } catch (error) {
      res.status(500).json({
        message: "Failed to build cards",
        error,
      });
    }
  }

  
   /* GET /api/jobs/:id/details*/
  static async getJobDetails(req: Request, res: Response) {
    try {
      const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);

      const job = await WeLoveDevsService.getJobById(id);

      const details = {
        id: job.id,

        title: job.title,

        descriptionPreview: job.descriptionPreview,

        company: job.smallCompany,

        salary: job.details?.salary,

        remotePolicy: job.details?.remotePolicy,

        requiredExperience:
          job.details?.requiredExperience,

        skills: job.skillsList,

        analytics: job.analytics,

        locations: job.formattedPlaces,

        contracts: job.contractTypes,

        image:
          job.smallCompany?.fallbackGalleryUrl,
      };

      res.json(details);
    } catch (error) {
      res.status(500).json({
        message: "Failed to get details",
        error,
      });
    }
  }
}