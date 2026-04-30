
DROP TABLE IF EXISTS "experience";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" varchar(100) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "lastname" varchar(100) NOT NULL,
  "firstname" varchar(100) NOT NULL
);


CREATE TABLE "experience" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "localization" varchar(100) NOT NULL,
    "permanent_contract" BOOLEAN NOT NULL, 
    "experience" INT NOT NULL,
    "start" varchar(100) NOT NULL,
    CONSTRAINT chk_start CHECK (
        "start" = 'asap' OR 
        "start" ~ '^[0-9]{2}/[0-9]{2}/[0-9]{2}$'
    ),
    "user_id" INT NOT NULL , 
    CONSTRAINT "fk_experience_user"
        FOREIGN KEY ("user_id")
        REFERENCES "user" ("id")
);
