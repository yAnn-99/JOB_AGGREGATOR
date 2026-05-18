import express from "express";
import { client } from "../middleware/InsertDB.ts";
import { rateLimit } from "express-rate-limit";

const router = express.Router();
var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

router.use(limiter);
/* ADD FAVORITE */

router.post("/", async (req, res) => {

  try {

    const {
      user_id,
      job_id
    } = req.body;

    const result = await client.query(
      `
      INSERT INTO favorite_job
      (
        user_id,
        job_id
      )
      VALUES ($1,$2)
      RETURNING *
      `,
      [
        user_id,
        job_id
      ]
    );

    return res.status(201).json(
      result.rows[0]
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error adding favorite"
    });

  }

});

/* GET FAVORITES */

router.get("/:userId", async (req, res) => {

  try {

    const result = await client.query(
      `
      SELECT *
      FROM favorite_job
      WHERE user_id = $1
      `,
      [req.params.userId]
    );

    return res.json(result.rows);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error fetching favorites"
    });

  }

});

export default router;