-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('moderator', 'admin@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('applicant', 'adn@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'nhgj@cyf.org', 'password');

INSERT INTO applicant_profile (name, city, application_status, right_to_work, user_id)
    VALUES ('Irina', 'Edinburgh', 'approved', FALSE, 2);

INSERT INTO company_profile (name, description, industry, user_id)
    VALUES ('CYF', 'Tech company', 'Technology', 3);

INSERT INTO opportunities (TYPE, description, city, status_opp, date, company_id)
    VALUES ('voluntary work', 'Two months in voluntary work', 'Glasgow', TRUE, '20/01/2020', 1);

INSERT INTO skills (name)
    VALUES ('JavaScript');

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 1);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (1, 1);

