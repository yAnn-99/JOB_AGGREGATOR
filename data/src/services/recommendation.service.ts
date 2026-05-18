import { cosineSimilarity }
from "../algorithms/similarity.algorithm.ts";

import type {
  JobVector
} from "../types/jobs.types.ts";

import type {
  UserProfile
} from "../types/recommendation.types.ts";

export class RecommendationService {

  static recommend(
    user: UserProfile,
    jobs: JobVector[]
  ) {

    return jobs

      .map((job) => {

        let similarity =
          cosineSimilarity(
            user.vector!,
            job.vector
          );

        // SKILLS BONUS

        const matchedSkills =
          job.skills.filter(
            (skill) =>
              user.skills.includes(skill)
          ).length;

        similarity +=
          matchedSkills * 0.1;

        // LOCATION BONUS

        if (
          job.locations?.some(
            (location) =>
              location
                .toLowerCase()
                .includes(
                  user.localization
                    .toLowerCase()
                )
          )
        ) {
          similarity += 0.1;
        }

        return {
          ...job,
          similarity,
        };
      })

      .sort(
        (a, b) =>
          b.similarity -
          a.similarity
      );
  }
}