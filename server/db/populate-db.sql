-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords

INSERT INTO cities (city)
    VALUES ('Aberdeen');

INSERT INTO cities (city)
    VALUES ('Dundee');

INSERT INTO cities (city)
    VALUES ('Glasgow');

INSERT INTO cities (city)
    VALUES ('Hamilton');

INSERT INTO cities (city)
    VALUES ('East Kilbride');

INSERT INTO cities (city)
    VALUES ('Ayr');

INSERT INTO cities (city)
    VALUES ('Dumbarton');

INSERT INTO cities (city)
    VALUES ('Bellshill');

INSERT INTO cities (city)
    VALUES ('Barrhead');

INSERT INTO cities (city)
    VALUES ('Motherwell');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('moderator', 'admin@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('applicant', 'adn@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'nhgj@cyf.org', 'password');

INSERT INTO cities (city)
    VALUES ('Edinburgh');

INSERT INTO applicant_profile (name, city, application_status, about, cvLink, right_to_work, user_id)
    VALUES ('Irina', 2, 'approved', 'cyf mentor', 'wwwfb', 'no', 2);

INSERT INTO company_profile (name, description, industry, user_id)
    VALUES ('CYF', 'Tech company', 'Technology', 3);

INSERT INTO opportunities (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
    VALUES ('Work with cyf', 'One months in voluntary work', 'youssef', '0444445555', 'yan@cyf.com', 1, '2020-01-15', 'Volunteer', 1);

INSERT INTO opportunities (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
    VALUES ('Volunteer with cyf today', 'Two months in voluntary work', 'Mohammed', '0444445555', 'yan@cyf.com', 2, '2020-01-15', 'Full time', 1);

INSERT INTO opportunities (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
    VALUES ('Internship with cyf', 'Three months in voluntary work', 'Ali', '0444445555', 'yan@cyf.com', 1, '2020-01-15', 'Part time', 1);

INSERT INTO opportunities (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
    VALUES ('Volunteer with cyf', 'Four months in voluntary work', 'Havva', '0444445555', 'yan@cyf.com', 1, '2020-01-15', 'Volunteer', 1);

INSERT INTO opportunities (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
    VALUES ('Volunteer with cyf', 'Five months in voluntary work', 'Phil', '0444445555', 'yan@cyf.com', 5, '2020-01-15', 'Volunteer', 1);

INSERT INTO skills (name)
    VALUES ('JavaScript');

INSERT INTO skills (name)
    VALUES ('Graphic Design');

INSERT INTO skills (name)
    VALUES ('Information Architectur');

INSERT INTO skills (name)
    VALUES ('Mechanical Engineering');

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 1);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (2, 2);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 3);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (4, 1);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (1, 1);

