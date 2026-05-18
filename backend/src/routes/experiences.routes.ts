import express from "express";
import { client }
from "../middleware/InsertDB.ts";

const router = express.Router();

/* CREATE EXPERIENCE */

router.post("/", async (req, res) => {

  try {

    const {
      title,
      localization,
      remote,
      permanent_contract,
      years_experience,
      salary_expectation,
      start,
      user_id
    } = req.body;

    const result = await client.query(
      `
      INSERT INTO experience
      (
        title,
        localization,
        remote,
        permanent_contract,
        years_experience,
        salary_expectation,
        start,
        user_id
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        title,
        localization,
        remote,
        permanent_contract,
        years_experience,
        salary_expectation,
        start,
        user_id
      ]
    );

    return res.status(201).json(
      result.rows[0]
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error creating experience"
    });

  }

});

/* GET USER EXPERIENCES */

router.get("/:userId", async (req, res) => {

  try {

    const result = await client.query(
      `
      SELECT *
      FROM experience
      WHERE user_id = $1
      `,
      [req.params.userId]
    );

    return res.json(result.rows);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Error fetching experiences"
    });

  }

});

export default router;