import express from "express";
import { client } from "../middleware/InsertDB.ts";
import { rateLimit } from "express-rate-limit";

const router = express.Router();
var limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 40, // max >= 40 requests per windowMs
})

router.use(limiter);
/* CREATE SKILL */

router.post("/", async (req, res) => {

  try {

    const { name } = req.body;

    const result = await client.query(
      `
      INSERT INTO skill (name)
      VALUES ($1)
      RETURNING *
      `,
      [name]
    );

    return res.status(201).json(
      result.rows[0]
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error creating skill"
    });

  }

});

/* ADD SKILL TO USER */
router.post("/assign", async (req, res) => {

  try {

    const {
      user_id,
      skill_id,
      level
    } = req.body;

    const result = await client.query(
      `
      INSERT INTO user_skill
      (
        user_id,
        skill_id,
        level
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        user_id,
        skill_id,
        level || 1
      ]
    );

    return res.status(201).json(
      result.rows[0]
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error assigning skill"
    });

  }

});

/* GET USER SKILLS */
router.get("/:userId", async (req, res) => {

  try {

    const result = await client.query(
      `
      SELECT
        skill.id,
        skill.name,
        user_skill.level

      FROM user_skill

      JOIN skill
      ON user_skill.skill_id = skill.id

      WHERE user_skill.user_id = $1
      `,
      [req.params.userId]
    );

    return res.json(result.rows);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error fetching skills"
    });

  }

});

export default router;