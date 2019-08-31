const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getOpportunitiesForList
} = require("../services/database/opportunities");
const {
  newOpportunitySkills
} = require("../services/database/opportunitySkills");
/**
 * The route here will be: /opportunities/ (remember the prefix users is defined in api/index.js)
 */

// post the new opportunity  takes the values from the body transferred from client api/opportunities
router.post("/", (req, res) => {
  const {
    name,
    description,
    contactPerson,
    telephone,
    email,
    city,
    date,
    type,
    skills,
    company_id
  } = req.body;

  const formEntries = {
    name,
    description,
    contactPerson,
    telephone,
    email,
    city,
    date,
    type,
    skills,
    company_id
  };
  createOpportunity(formEntries)
    .then(data => {
      const opportunityId = data[0].opportunity_id;
      return { opportunityId, skills };
    })
    .then(SkillsAndOpportunityID => {
      return newOpportunitySkills(SkillsAndOpportunityID);
    })
    .then(data => res.send({ success: true }))
    .catch(err => {
      res.status(500).send({ success: false });
    });
});

router.get("/", (req, res) => {
  getOpportunitiesForList()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
