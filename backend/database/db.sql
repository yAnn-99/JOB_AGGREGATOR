DROP TABLE IF EXISTS "user_skill";
DROP TABLE IF EXISTS "skill";
DROP TABLE IF EXISTS "experience";
DROP TABLE IF EXISTS "user";

/* USER */

CREATE TABLE "user" (
 "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY 
 "email" VARCHAR(100) NOT NULL UNIQUE 
 "password" VARCHAR(255) NOT NULL 
 "lastname" VARCHAR(100) NOT NULL 
 "firstname" VARCHAR(100) NOT NULL 
 "created_at" TIMESTAMP DEFAULT NOW()
);

/* EXPERIENCE */

CREATE TABLE "experience" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" VARCHAR(100) NOT NULL,
  "localization" VARCHAR(100) NOT NULL,
  "remote" BOOLEAN DEFAULT false,
  "permanent_contract" BOOLEAN NOT NULL,
  "years_experience" INT NOT NULL,
  "salary_expectation" INT,
  "start" VARCHAR(100) NOT NULL,

  CONSTRAINT chk_start CHECK (
    "start" = 'asap' OR "start" ~ '^[0-9]{2}/[0-9]{2}/[0-9]{2}$'
  ),
   "user_id" INT NOT NULL,
  CONSTRAINT "fk_experience_user"
  FOREIGN KEY ("user_id")
  REFERENCES "user" ("id")
);

/* SKILLS */

CREATE TABLE "skill" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL
);

/* USER SKILLS */

CREATE TABLE "user_skill" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL,
  "skill_id" INT NOT NULL,
  "level" INT DEFAULT 1,
  CONSTRAINT "fk_user_skill_user"
  FOREIGN KEY ("user_id")
  REFERENCES "user" ("id"),

  CONSTRAINT "fk_user_skill_skill"
  FOREIGN KEY ("skill_id")
  REFERENCES "skill" ("id")
);

/* FAVORITE JOBS */

CREATE TABLE favorite_job (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  job_id VARCHAR(100) NOT NULL
);

/* APPLICATIONS (ML)*/

CREATE TABLE application (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  job_id VARCHAR(100) NOT NULL,
  applied_at TIMESTAMP DEFAULT NOW()
);