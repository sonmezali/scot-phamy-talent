-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. 
-- This is very bad from security point of view. We will have a task to encrypt the passwords
INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('moderator', 'admin@cyf.org', 'password');

INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'youssef@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'alisonmez@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'meriem3@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'havvarslan@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'philezemonya@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'luciana@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'jermain@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'franklampard@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'stevengerrand@cyf.org', 'password');
    INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'harrykane@cyf.org', 'password');


INSERT INTO users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'company@cyf.org', 'password');

INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
VALUES
    ('Irina', 1, 'pending', 'cyf mentor', 'wwwfb', 'no','https://react.semantic-ui.com/images/avatar/large/matthew.png', 1);
    INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
VALUES
    ('Sana', 2, 'pending', 'Nurse', 'wwwfb', 'no','https://react.semantic-ui.com/images/avatar/large/elliot.jpg', 2);
    INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
VALUES
    ('Med', 2, 'approved', 'cyf mentor', 'wwwfb', 'no',null ,3);
    INSERT INTO applicant_profile
    (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
VALUES
    ('Jack', 2, 'pending', 'Full-stack developper', 'wwwfb', 'no','https://react.semantic-ui.com/images/avatar/large/jenny.jpg', 4);

INSERT INTO company_profile
    (name, description, logo_url, location, industry, user_id
    )
VALUES
    ('CYF', 'Tech company','http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png', 1, 'Technology', 6);

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

INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 1);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 1);
INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 1);
INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 2);
INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 2);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 2);
INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 3);

INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 3);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 4);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 4);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 4);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 5);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 5);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 5);
    INSERT INTO opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 5);

INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 1);
    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 2);
    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 3);
    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 4);
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
        INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 2);    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 1);    INSERT INTO applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 2);
