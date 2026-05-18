import { JobsService } from "../services/jobs.service.ts";
import { RecommendationService } from "../services/recommendation.service.ts";
export class JobsController {
    static async getJobs(req, res) {
        try {
            const jobs = await JobsService.getJobs();
            res.json(jobs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch jobs",
            });
        }
    }
    static async getJobById(req, res) {
        try {
            const idParam = req.params.id;
            const id = Array.isArray(idParam) ? idParam[0] : idParam;
            const job = await JobsService.getJobById(id);
            res.json(job);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch job",
            });
        }
    }
    static async getRecommendations(req, res) {
        try {
            const jobs = await JobsService.getJobs();
            const user = {
                id: req.body.id,
                localization: req.body.localization,
                permanent_contract: req.body.permanent_contract,
                experience: req.body.experience,
                skills: req.body.skills ?? [],
                remote: req.body.remote ?? false,
                vector: []
            };
            // BUILD VECTOR
            user.vector = [
                user.experience,
                user.skills.length,
                user.permanent_contract ? 1 : 0,
            ];
            const recommendations = RecommendationService.recommend(user, jobs);
            res.json(recommendations);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to generate recommendations",
            });
        }
    }
}
