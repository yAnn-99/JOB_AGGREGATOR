
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "experience";

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" varchar(100) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "lastname" varchar(100) NOT NULL,
  "firstname" varchar(100) NOT NULL,
  "preference" varchar(100) NOT NULL
);


CREATE TABLE "experience" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "job_name" varchar(100) NOT NULL,
    "description" varchar(500) NOT NULL,
    "user_id" INT NOT NULL , 
    CONSTRAINT "fk_experience_user"
        FOREIGN KEY ("user_id")
        REFERENCES "user" ("id")

);
