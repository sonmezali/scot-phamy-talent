const express = require("express");
const router = express.Router();

const {
  getSkillsForApplicantProfile
} = require("../services/database/applicantSkills");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getSkillsForApplicantProfile(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});

module.exports = router;
