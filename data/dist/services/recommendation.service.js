import { cosineSimilarity } from "../algorithms/similarity.algorithm.ts";
export class RecommendationService {
    static recommend(user, jobs) {
        return jobs
            .map((job) => {
            let similarity = cosineSimilarity(user.vector, job.vector);
            // SKILLS BONUS
            const matchedSkills = job.skills.filter((skill) => user.skills.includes(skill)).length;
            similarity +=
                matchedSkills * 0.1;
            // LOCATION BONUS
            if (job.locations?.some((location) => location
                .toLowerCase()
                .includes(user.localization
                .toLowerCase()))) {
                similarity += 0.1;
            }
            return {
                ...job,
                similarity,
            };
        })
            .sort((a, b) => b.similarity -
            a.similarity);
    }
}
