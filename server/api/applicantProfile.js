const express = require("express");
const router = express.Router();
const {
  getAllApplicantsProfile,
  getApplicantProfile
} = require("../services/database/applicantProfile");
const { createUser } = require("../services/database/users");
const {
  createApplicantProfile
} = require("../services/database/applicantProfile");
const { newApplicantSkills } = require("../services/database/applicantSkills");

router.get("/", (req, res) => {
  getAllApplicantsProfile()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  getApplicantProfile(id)
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
    profilePicLink,
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
    profilePicLink,
    rightToWork
  };
  createUser(applicant)
    .then(data => {
      const userId = data[0].user_id;
      return {
        name,
        about,
        city,
        cvLink,
        skills,
        rightToWork,
        profilePicLink,
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
