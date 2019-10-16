const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getOpportunitiesForList,
  getOpportunityById,
  getOpportunitiesForCompanyProfileByCompanyId,
  deleteOpportunityByCompany,
  editOpportunity,
} = require("../services/database/opportunities");
const {
  newOpportunitySkills,
  deleteOpportunitySkillsForOpportunityByCompany,
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
    company_id,
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
    company_id,
  };
  createOpportunity(formEntries)
    .then((data) => {
      const opportunityId = data[0].opportunity_id;
      return { opportunityId, skills };
    })
    .then((SkillsAndOpportunityID) => {
      return newOpportunitySkills(SkillsAndOpportunityID);
    })
    .then((data) => res.send({ success: true }))
    .catch((err) => {
      res.status(500).send({ success: false });
    });
});

router.get("/opportunity/:opportunityId", (req, res) => {
  const id = req.params.opportunityId;
  getOpportunityById(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send(err);
    });
});
router.get("/company/:companyId", (req, res) => {
  const id = req.params.companyId;
  getOpportunitiesForCompanyProfileByCompanyId(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/", (req, res) => {
  getOpportunitiesForList()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete("/:opportunityId", (req, res) => {
  const { opportunityId } = req.params;
  deleteOpportunitySkillsForOpportunityByCompany(opportunityId)
    .then(() => deleteOpportunityByCompany(opportunityId))
    .then(() => res.send({ deleted: true }))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
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
  } = req.body;
  const updatedData = {
    id,
    name,
    description,
    contactPerson,
    telephone,
    email,
    city,
    date,
    type,
    skills,
  };
  editOpportunity(updatedData)
    .then(() => {
      return deleteOpportunitySkillsForOpportunityByCompany(id);
    })
    .then((data) => {
      return id;
    })
    .then((opportunityId) => {
      newOpportunitySkills({ skills, opportunityId });
    })
    .then((data) => res.send({ success: true }))
    .catch((err) => res.send({ success: false }));
});
module.exports = router;
