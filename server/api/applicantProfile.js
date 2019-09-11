const express = require("express");
const router = express.Router();
const applicantProfileDb = require("../services/database/applicantProfile");
const db = require("../services/database/users");
const {
  createApplicantProfile
} = require("../services/database/applicantProfile");
const { newApplicantSkills } = require("../services/database/applicantSkills");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  applicantProfileDb
    .getApplicantProfile(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

router.post("/", (req, res) => {
  const {
    name,
    role,
    email,
    password,
    about,
    city,
    skills,
    cvLink,
    rightToWork
  } = req.body;

  const applicant = {
    role,
    name,
    email,
    password,
    about,
    city,
    skills,
    cvLink,
    rightToWork
  };
  db.createUser(applicant)
    .then(data => {
      const userId = data[0].user_id;
      return {
        name,
        about,
        city,
        cvLink,
        skills,
        rightToWork,
        userId
      };
    })
    .then(userData => {
      return createApplicantProfile(userData).then(data => {
        const profileId = data[0].applicant_id;
        return { profileId };
      });
    })
    .then(profileId => {
      const profileID = profileId.profileId;
      newApplicantSkills({ profileID, skills });
    })
    .then(data => res.send({ success: true }))
    .catch(err => {});
});

module.exports = router;
