-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text.
-- This is very bad from security point of view. We will have a task to encrypt the passwords
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('moderator', 'admin@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'youssef@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'meriem@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'ali@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'havvarslan@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('applicant', 'philezemonya@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'company@cyf.org', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'morelloLimited@org.com', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'jackandCo@org.com', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'samonLimited@org.com', 'password');
INSERT INTO
  users
    (ROLE, email, PASSWORD)
VALUES
    ('company', 'btc@org.com', 'password');
INSERT INTO
  applicant_profile
    (
    name,
    city,
    application_status,
    about,
    cvLink,
    right_to_work,
    profile_picture,
    user_id
    )
VALUES
    (
        'Youssef',
        4,
        'approved',
        'cyf mentor',
        'www.googledoc.com',
        'no',
        'https://react.semantic-ui.com/images/avatar/large/matthew.png',
        1
  );
INSERT INTO
  applicant_profile
    (
    name,
    city,
    application_status,
    about,
    cvLink,
    right_to_work,
    profile_picture,
    user_id
    )
VALUES
    (
        'Meriem',
        1,
        'approved',
        'Nurse',
        'www.googledoc.com',
        'no',
        'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
        2
  );
INSERT INTO
  applicant_profile
    (
    name,
    city,
    application_status,
    about,
    cvLink,
    right_to_work,
    profile_picture,
    user_id
    )
VALUES
    (
        'Ali',
        4,
        'approved',
        'cyf mentor',
        'www.googledoc.com',
        'no',
        NULL,
        3
  );
INSERT INTO
  applicant_profile
    (
    name,
    city,
    application_status,
    about,
    cvLink,
    right_to_work,
    profile_picture,
    user_id
    )
VALUES
    (
        'Havva',
        4,
        'pending',
        'Full-stack developper',
        'www.googledoc.com',
        'no',
        'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
        4
  );
INSERT INTO
  applicant_profile
    (
    name,
    city,
    application_status,
    about,
    cvLink,
    right_to_work,
    profile_picture,
    user_id
    )
VALUES
    (
        'Philizemonya',
        1,
        'pending',
        'Full-stack developper',
        'www.googledoc.com',
        'no',
        'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
        4
  );
INSERT INTO
  company_profile
    (
    name,
    description,
    logo_url,
    LOCATION,
    industry,
    user_id
    )
VALUES
    (
        'CYF',
        'Tech company',
        'http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png',
        4,
        'Technology',
        6
  );
INSERT INTO
  company_profile
    (
    name,
    description,
    logo_url,
    LOCATION,
    industry,
    user_id
    )
VALUES
    (
        'Morello Limited',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        4,
        'Wholesale and Retail',
        7
  );
INSERT INTO
  company_profile
    (
    name,
    description,
    logo_url,
    LOCATION,
    industry,
    user_id
    )
VALUES
    (
        'Jack and Co',
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80',
        3,
        'Manufacturing',
        2
  );
INSERT INTO
  company_profile
    (
    name,
    description,
    logo_url,
    LOCATION,
    industry,
    user_id
    )
VALUES
    (
        'Samon Limited',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        4,
        'Finance',
        6
  );
INSERT INTO
  company_profile
    (
    name,
    description,
    logo_url,
    LOCATION,
    industry,
    user_id
    )
VALUES
    (
        'BTC Limited',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80',
        2,
        'Healthcare',
        4
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Work with cyf',
        'Full time full-stack developer opportunity for new graduates ',
        'youssef',
        '0444445555',
        'yan@cyf.com',
        4,
        '2021-03-15',
        'Volunteer',
        1
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Volunteer with cyf today',
        'mentors are needed to volunteer for the next yer class',
        'Mohammed',
        '074545555',
        'yan@cyf.com',
        4,
        '2023-02-14',
        'Full time',
        1
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Internship with cyf',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        'Ali',
        '0444445555',
        'yan@cyf.com',
        1,
        '2022-11-24',
        'Internship',
        1
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Volunteer with cyf',
        'Four months in voluntary work',
        'Havva',
        '0444445555',
        'yan@cyf.com',
        1,
        '2022-01-19',
        'Volunteer',
        1
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Volunteer with us',
        'Five months in voluntary work',
        'Phil',
        '0444445555',
        'yan@cyf.com',
        5,
        '2020-01-15',
        'Volunteer',
        2
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Part time Job',
        'Lorem ipsum dolor sit amet, consectetur adipiscing  magna aliqua.',
        'Emma Bell',
        '01413345555',
        'emma@morello.com',
        3,
        '2020-01-02',
        'Part time',
        2
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Work experience',
        'Six months of work experience',
        'Jessica Machintosh',
        '0141445555',
        'jess-JackandCo@org.com',
        4,
        '2020-02-12',
        'Work experience',
        3
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Internship opportunity',
        '6 months internship',
        'Jessica Machintosh',
        '0141445555',
        'jess-JackandCo@org.com',
        5,
        '2020-01-11',
        'Internship',
        3
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Full time job',
        'Lorem ipsum dolor sit amet, consectetur adipiscing  magna aliqua.',
        'Sana Kadir',
        '024145555',
        'sana-samonLim@org.com',
        5,
        '2019-12-15',
        'Full time',
        4
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Apprenticeship',
        'Lorem ipsum dolor sit amet, consectetur adipiscing  magna aliqua.',
        'Sana Kadir',
        '024145555',
        'sana-samonLim@org.com',
        1,
        '2020-01-15',
        'Apprenticeship',
        4
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Mentor with CYF',
        'Nine months in voluntary work',
        'Luke',
        '0444445555',
        'luke@cyf.com',
        1,
        '2020-03-15',
        'Volunteer',
        1
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Work with BTC',
        'Three months in voluntary work',
        'Mimi',
        '0144445555',
        'mimi-bct@org.com',
        1,
        '2020-03-15',
        'Volunteer',
        5
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Work with BTC',
        'Lorem ipsum dolor sit amet, consectetur adipiscing  magna aliqua.',
        'Irina',
        '0344445555',
        'irina-bct@org.com',
        6,
        '2020-06-15',
        'Part time',
        5
  );
INSERT INTO
  opportunities
    (
    name,
    description,
    contact_Person,
    telephone,
    email,
    city,
    date,
    TYPE,
    company_id
    )
VALUES
    (
        'Work with BTC',
        'Lorem ipsum dolor sit amet, consectetur adipiscing  magna aliqua.',
        'Vicky',
        '0244445555',
        'vicky-bct@org.com',
        7,
        '2020-02-15',
        'Internship',
        5
  );

-- 1
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 1);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 1);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 1);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 1);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (9, 1);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (10, 1);

--2
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 2);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 2);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 2);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (8, 2);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (10, 2);

--3
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 3);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 3);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 3);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 3);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 3);

--4
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 4);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 4);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (8, 4);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (9, 4);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (10, 4);

--5
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 5);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 5);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 5);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 5);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (9, 5);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (11, 5);

--6
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 6);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 6);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 6);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 6);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 6);

--7
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 7);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 7);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 7);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 7);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 7);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 7);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 7);

--8
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 8);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 8);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 8);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 8);

--9
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 9);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 9);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 9);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (10, 9);

--10
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 10);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 10);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 10);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (8, 10);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (9, 10);

--11
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 11);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 11);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 11);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 11);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 11);

--12
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 12);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 12);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 12);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 12);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 12);

--13
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (4, 13);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 13);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (6, 13);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (7, 13);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (8, 13);

--14
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (1, 14);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (2, 14);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (3, 14);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (5, 14);
INSERT INTO
  opportunity_skills
    (skill_id, opportunity_id)
VALUES
    (9, 14);
--Applicant skills
--1
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 1);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 2);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 3);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 4);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 5);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 6);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (1, 7);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    --2
    (2, 2);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 3);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 4);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 5);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 9);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 11);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (2, 15);

--3
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 2);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 4);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 5);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 6);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 7);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (3, 8);

--4
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 1);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 2);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 3);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 4);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 10);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (4, 9);

--5
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (5, 3);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (5, 4);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (5, 6);
INSERT INTO
  applicant_skills
    (applicant_id, skill_id)
VALUES
    (5, 8);