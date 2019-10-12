-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text.
-- This is very bad from security point of view. We will have a task to encrypt the passwords

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('moderator', 'admin@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('applicant', 'applicant1@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('applicant', 'applicant2@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('applicant', 'applicant3@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('applicant', 'applicant4@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'company@cyf.org', 'password');

INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'morelloLimited@org.com', 'password');
INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'jackandCo@org.com', 'password');
INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'samonLimited@org.com', 'password');
INSERT INTO users (ROLE, email, PASSWORD)
    VALUES ('company', 'btc@org.com', 'password');

INSERT INTO applicant_profile (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
    VALUES ('Irina', 1, 'pending', 'cyf mentor', 'wwwfb', 'no', 'https://react.semantic-ui.com/images/avatar/large/matthew.png', 1);

INSERT INTO applicant_profile (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
    VALUES ('Sana', 2, 'pending', 'Nurse', 'wwwfb', 'no', 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg', 2);

INSERT INTO applicant_profile (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
    VALUES ('Med', 2, 'approved', 'cyf mentor', 'wwwfb', 'no', NULL, 3);

INSERT INTO applicant_profile (name, city, application_status, about, cvLink, right_to_work, profile_picture, user_id)
    VALUES ('Jack', 2, 'pending', 'Full-stack developper', 'wwwfb', 'no', 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg', 4);

INSERT INTO company_profile (name, description, logo_url, LOCATION, industry, user_id)
    VALUES ('CYF', 'Tech company', 'http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png', 1, 'Technology', 6);

INSERT INTO company_profile (name, description, logo_url, LOCATION, industry, user_id)
    VALUES ('Morello Limited', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 2, 'Wholesale and Retail', 7);
INSERT INTO company_profile (name, description, logo_url, LOCATION, industry, user_id)
    VALUES ('Jack and Co',' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80', 3, 'Manufacturing', 2);
INSERT INTO company_profile (name, description, logo_url, LOCATION, industry, user_id)
    VALUES ('Samon Limited', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 4, 'Finance', 6);
INSERT INTO company_profile (name, description, logo_url, LOCATION, industry, user_id)
    VALUES ('BTC Limited', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80', 5, 'Healthcare', 4); 
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

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 1);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (2, 1);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (3, 1);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (2, 2);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (3, 2);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 2);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 3);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (4, 3);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 4);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (2, 4);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (3, 4);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (1, 5);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (2, 5);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (3, 5);

INSERT INTO opportunity_skills (skill_id, opportunity_id)
    VALUES (4, 5);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (1, 1);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (1, 2);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (1, 3);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (2, 4);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (2, 2);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (2, 1);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (3, 3);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (3, 2);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (4, 1);

INSERT INTO applicant_skills (applicant_id, skill_id)
    VALUES (4, 2);

