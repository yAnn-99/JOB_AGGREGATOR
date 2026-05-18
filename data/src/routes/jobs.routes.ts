import express from "express";
import { JobsService } from "../services/jobs.service.ts";
import { RecommendationService } from "../services/recommendation.service.ts";
import type { UserProfile } from "../types/recommendation.types.ts";

const router = express.Router();

router.post("/", async (req, res) => {

  try {
    const user : UserProfile = {
      id: req.body.id,
      localization: req.body.localization,
      permanent_contract: req.body.permanent_contract,
      experience: req.body.experience,
      skills: req.body.skills ?? [],
      remote: req.body.remote ?? false,
      vector : []
    }

    // BUILD VECTOR

    user.vector = [

      user.experience,
      user.skills.length,
      user.permanent_contract ? 1 : 0,
    ];

    // GET JOBS

    const jobs = await JobsService.getJobs();

    // RECOMMEND

    const recommendations = RecommendationService.recommend(user, jobs);

    return res.json(
      recommendations.slice(0, 20)
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Recommendation error"
    });

  }

});

export default router;