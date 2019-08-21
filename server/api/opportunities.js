const express = require("express");
const router = express.Router();
const newOpportunity = require("../services/database/opportunities");

/**
 * The route here will be: /cities/ (remember the prefix users is defined in api/index.js)
 */

router.post("/newOpportunity", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const contactPerson = req.body.contactPerson;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const city = req.body.city;
  const date = req.body.data;
  const type = req.body.type;
  const skills = req.body.skills;
  const company_id = req.body.company_id;
  let formEntries = {
    name,
    description,
    contactPerson,
    telephone,
    email,
    city,
    date,
    type,
    // skills,
    company_id,
  };
  newOpportunity
    .createOpportunity(formEntries)
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      res.sendStatus(500).send({ success: false });
      console.log(err);
    });
});

module.exports = router;
