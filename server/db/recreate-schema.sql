-- Drop tables in case they already exist
DROP TABLE IF EXISTS opportunity_skills;

DROP TABLE IF EXISTS opportunities;

DROP TABLE IF EXISTS company_profile;

DROP TABLE IF EXISTS applicant_skills;

DROP TABLE IF EXISTS applicant_profile;

DROP TABLE IF EXISTS skills;

DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS role_type;

DROP TYPE IF EXISTS industry_type;

DROP TYPE IF EXISTS opportunity_type;

DROP TYPE IF EXISTS status_type;

-- Create tables
CREATE TYPE role_type AS ENUM (
  'applicant',
  'company',
  'moderator'
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  ROLE role_type,
  email VARCHAR(40) NOT NULL,
  PASSWORD VARCHAR(20) NOT NULL
);

CREATE TYPE status_type AS ENUM (
  'pending',
  'approved'
);

CREATE TABLE applicant_profile (
  applicant_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  application_status status_type DEFAULT 'pending',
  right_to_work BOOLEAN,
  user_id INTEGER REFERENCES users (user_id)
);

CREATE TYPE industry_type AS ENUM (
  'Construction',
  'Finance',
  'Government',
  'Healthcare',
  'Manufacturing',
  'Wholesale and Retail',
  'Transportation and logistics',
  'Education',
  'Technology'
);

CREATE TABLE company_profile (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(400) NOT NULL,
  industry industry_type,
  user_id INTEGER REFERENCES users (user_id)
);

CREATE TYPE opportunity_type AS ENUM (
  'voluntary work',
  'training',
  'internship',
  'work experience',
  'part time job',
  'full time job'
);

CREATE TABLE opportunities (
  opportunity_id SERIAL PRIMARY KEY,
  TYPE opportuniy_type,
  description VARCHAR(200) NOT NULL,
  city VARCHAR(200) NOT NULL,
  status_opp BOOLEAN,
  date DATE,
  company_id INTEGER REFERENCES company_profile (company_id)
);

CREATE TABLE skills (
  skill_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE opportunity_skills (
  skill_id INTEGER REFERENCES skills (skill_id),
  opportunity_id INTEGER REFERENCES opportunities (opportunity_id)
);

CREATE TABLE applicant_skills (
  applicant_id INTEGER REFERENCES applicant_profile (applicant_id),
  skill_id INTEGER REFERENCES skills (skill_id)
);

