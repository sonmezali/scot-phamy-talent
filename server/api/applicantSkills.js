const express = require("express");
const router = express.Router();

const {
  getSkillsForApplicantProfile,
  getSkillsForEditApplicantProfile
} = require("../services/database/applicantSkills");

router.get("/getSkillsId/:id", (req, res) => {
  const { id } = req.params;
  getSkillsForEditApplicantProfile(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});
router.get("/:id/skills", (req, res) => {
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
