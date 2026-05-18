import { WeLoveDevsService } from "./welovedevs.service.ts";
import { CacheService } from "./cache.service.ts";
import { normalizeSkills } from "../utils/normalizeSkills.ts";
export class JobsService {
    static async getJobs() {
        if (!CacheService.isExpired() &&
            CacheService.getCache().length > 0) {
            return CacheService.getCache();
        }
        const data = await WeLoveDevsService.fetchJobs();
        const jobs = data.values.map((job) => ({
            vector: [
                job.details?.requiredExperience || 0,
                job.skillsList?.length || 0,
                job.details?.salary?.max || 0,
            ],
            id: job.id,
            title: job.title,
            description: job.description,
            company: job.smallCompany?.companyName,
            image: job.smallCompany
                ?.fallbackGalleryUrl,
            remote: job.details?.acceptRemote,
            salary: job.details?.salary,
            skills: normalizeSkills(job.skillsList || []),
            experience: job.details?.requiredExperience,
            locations: job.formattedPlaces,
        }));
        CacheService.setCache(jobs);
        return jobs;
    }
    static async getJobById(id) {
        const jobs = await this.getJobs();
        return jobs.find((job) => job.id === id);
    }
}
