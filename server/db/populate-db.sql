-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords

INSERT INTO cities
    (city)
VALUES
    ('Aberdeen');

INSERT INTO cities
    (city)
VALUES
    ('Dundee');

INSERT INTO cities
    (city)
VALUES
    ('Glasgow');

INSERT INTO cities
    (city)
VALUES
    ('Hamilton');

INSERT INTO cities
    (city)
VALUES
    ('East Kilbride');

INSERT INTO cities
    (city)
VALUES
    ('Ayr');

INSERT INTO cities
    (city)
VALUES
    ('Dumbarton');

INSERT INTO cities
    (city)
VALUES
    ('Bellshill');

INSERT INTO cities
    (city)
VALUES
    ('Barrhead');

INSERT INTO cities
    (city)
VALUES
    ('Motherwell');

INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('moderator', 'admin@cyf.org', 'password');

INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'applicant1@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'applicant2@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'applicant3@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'applicant4@cyf.org', 'password');

INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'company@cyf.org', 'password');

INSERT INTO cities
    (city)
VALUES
    ('Edinburgh');

INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, user_id)
VALUES
    ('Irina', 1, 'approved', 'cyf mentor', 'wwwfb', 'no', 1);
    INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, user_id)
VALUES
    ('Sana', 2, 'approved', 'Nurse', 'wwwfb', 'no', 2);
    INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, user_id)
VALUES
    ('Med', 2, 'approved', 'cyf mentor', 'wwwfb', 'no', 3);
    INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, user_id)
VALUES
    ('Jack', 2, 'approved', 'Full-stack developper', 'wwwfb', 'no', 4);

INSERT INTO company_profile
    (name, description, logo_url, location, industry, user_id
    )
VALUES
    ('CYF', 'Tech company','http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png', 1, 'Technology', 3);

INSERT INTO opportunities
    (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
VALUES
    ('Work with cyf', 'One months in voluntary work', 'youssef', '0444445555', 'yan@cyf.com', 1, '2020-01-15', 'Volunteer', 1);

INSERT INTO opportunities
    (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
VALUES
    ('Volunteer with cyf today', 'Two months in voluntary work', 'Mohammed', '0444445555', 'yan@cyf.com', 2, '2020-01-15', 'Full time', 1);

INSERT INTO opportunities
    (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
VALUES
    ('Internship with cyf', 'Three months in voluntary work', 'Ali', '0444445555', 'yan@cyf.com', 1, '2020-01-15', 'Part time', 1);

INSERT INTO opportunities
    (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
VALUES
    ('Volunteer with cyf', 'Four months in voluntary work', 'Havva', '0444445555', 'yan@cyf.com', 1, '2020-01-15', 'Volunteer', 1);

INSERT INTO opportunities
    (name, description, contact_Person, telephone, email, city, date, TYPE, company_id)
VALUES
    ('Volunteer with cyf', 'Five months in voluntary work', 'Phil', '0444445555', 'yan@cyf.com', 5, '2020-01-15', 'Volunteer', 1);

INSERT INTO skills
    (name)
VALUES
    ('JavaScript');

INSERT INTO skills
    (name)
VALUES
    ('Graphic Design');

INSERT INTO skills
    (name)
VALUES
    ('Information Architectur');

INSERT INTO skills
    (name)
VALUES
    ('Mechanical Engineering');

INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 1);

INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 2);

INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 3);

INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 1);

INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 1);
    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 2);
    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 1);
    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 3);

