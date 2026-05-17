import { cosineSimilarity } from "../algorithms/similarity.algorithm.js";

export class RecommendationService {
  static recommend(user: any, jobs: any[]) {
    const userVector = user.vector;

    return jobs
      .map((job) => {
        const similarity = cosineSimilarity(
          userVector,
          job.vector
        );

        return {
          ...job,
          similarity,
        };
      })
      .sort(
        (a, b) =>
          b.similarity - a.similarity
      );
  }
}