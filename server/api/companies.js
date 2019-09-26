const express = require("express");
const router = express.Router();
const {
  registerCompany,
  getAllCompanies,
  getCompanyIdForCreateOpportunity
} = require("../services/database/companies");
const { createUser } = require("../services/database/users");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getCompanyIdForCreateOpportunity(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

router.get("/", (req, res) => {
  getAllCompanies()
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
    description,
    industry,
    logo_url,
    city,
    role,
    email,
    password
  } = req.body;

  const user = { email, password, role };

  createUser(user)
    .then(userData => {
      const user = userData[0];
      const user_id = user.user_id;

      return {
        name,
        description,
        industry,
        logo_url,
        city,
        password,
        user_id
      };
    })
    .then(companyProfile => {
      return registerCompany(companyProfile);
    })
    .then(data => {
      res.send({ success: true });
    });
});

module.exports = router;
