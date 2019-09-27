const express = require("express");
const router = express.Router();
const {
  editApplicantProfile
} = require("../services/database/editApplicantProfile");
const {
  deleteApplicantSkillsForApplicantByapplicantProfileID
} = require("../services/database/applicantSkills");
const { newApplicantSkills } = require("../services/database/applicantSkills");

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    about,
    city,
    cvLink,
    skills,
    profilePicLink,
    rightToWork
  } = req.body;
  const updatedData = {
    id,
    name,
    about,
    city,
    cvLink,
    profilePicLink,
    rightToWork
  };
  editApplicantProfile(updatedData)
    .then(() => id)
    .then(result => {
      deleteApplicantSkillsForApplicantByapplicantProfileID(result);
    })
    .then(data => {
      return id;
    })
    .then(data => {
      newApplicantSkills({ skills, profileID: data });
    })
    .then(data => res.send({ success: true }))
    .catch(err => res.send({ success: false }));
});
module.exports = router;
