const express = require("express");
const router = express.Router();

const {
  getSkillsForOpportunitiesList
} = require("../services/database/opportunitySkills");

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
