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

DROP TABLE IF EXISTS cities;

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

CREATE TABLE skills (
  skill_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  city VARCHAR(50) NOT NULL
);

CREATE TABLE applicant_profile (
  applicant_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  about TEXT NOT NULL,
  application_status status_type DEFAULT 'pending',
  city INTEGER REFERENCES cities (id),
  cvLink VARCHAR(30),
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
  description TEXT NOT NULL,
  industry industry_type,
  logo_url TEXT DEFAULT NULL,
  user_id INTEGER REFERENCES users (user_id)
);

CREATE TYPE opportunity_type AS ENUM (
  'Volunteer',
  'Apprenticeship',
  'Internship',
  'Work experience',
  'Part time',
  'Full time'
);

CREATE TABLE opportunities (
  opportunity_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  contact_person VARCHAR(50) NOT NULL,
  telephone INTEGER,
  email VARCHAR(40) NOT NULL,
  city INTEGER REFERENCES cities (id),
  date DATE,
  TYPE opportunity_type,
  opp_status status_type DEFAULT 'pending',
  company_id INTEGER REFERENCES company_profile (company_id)
);

CREATE TABLE opportunity_skills (
  skill_id INTEGER REFERENCES skills (skill_id),
  opportunity_id INTEGER REFERENCES opportunities (opportunity_id)
);

CREATE TABLE applicant_skills (
  applicant_id INTEGER REFERENCES applicant_profile (applicant_id),
  skill_id INTEGER REFERENCES skills (skill_id)
);

