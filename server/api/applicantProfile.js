const express = require("express");
const router = express.Router();
const { createUser, deleteUser } = require("../services/database/users");
const {
  getAllApplicantsProfile,
  getApplicantProfile
} = require("../services/database/applicantProfile");

const {
  createApplicantProfile,
  deleteApplicantProfile
} = require("../services/database/applicantProfile");
const {
  newApplicantSkills,
  deleteSkillsForApplicantProfile
} = require("../services/database/applicantSkills");

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
router.delete("/", (req, res) => {
  const { applicantId, userId } = req.query;
  deleteSkillsForApplicantProfile(applicantId)
    .then(() => {
      deleteApplicantProfile(applicantId).then(() => {
        deleteUser(userId).then(() => {
          res.status(200).send({ success: true });
        });
      });
    })
    .catch(err => {
      res.status(500).send({ err, success: false });
    });
});

module.exports = router;
