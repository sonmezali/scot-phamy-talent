const express = require("express");
const router = express.Router();

const {
  newOpportunitySkills,
  getSkillsForOpportunitiesList
} = require("../services/database/opportunitySkills");

/**
 * The route here will be: /addSkillsToOpportunity/ (remember the prefix users is defined in api/index.js)
 */

router.post("/", (req, res) => {
  const skills = req.body.skills;
  const opportunityId = req.body.opportunityId;
  newOpportunitySkills(skills, opportunityId)
    .then(data => {
      res.send({ success: true });
    })
    .catch(err => {
      res.sendStatus(500).send({ success: false });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getSkillsForOpportunitiesList(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});

module.exports = router;
