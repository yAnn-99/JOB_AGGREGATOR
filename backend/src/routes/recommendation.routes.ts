import express from "express";
import { client } from "../middleware/InsertDB.ts";
import { rateLimit } from "express-rate-limit";

const router = express.Router();

var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

router.use(limiter);

router.get("/:userId", async (req, res) => {

  try {

    const userId =
      Number(req.params.userId);

    // GET USER EXPERIENCE

    const result = await client.query(
      `
      SELECT *
      FROM experience
      WHERE user_id = $1
      `,
      [userId]
    );

    const experiences = result.rows;

    if (!experiences.length) {

      return res.status(404).json({
        message: "No experience found"
      });

    }

    // BUILD USER PROFILE

    const skills: string[] =
      experiences.flatMap(
        (exp) => exp.skills || []
      );

    const userProfile = {

      id: userId,

      skills,

      localization:
        experiences[0].localization,

      permanent_contract:
        experiences[0]
          .permanent_contract,

      experience:
        experiences[0].experience,
    };

    // SEND TO DATA SERVICE
    const response = await fetch(
      "http://localhost:4000/recommendations",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          userProfile
        ),
      }
    );

    const recommendations =
      await response.json();

    return res.json(
      recommendations
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Recommendation failed"
    });

  }

});

export default router;