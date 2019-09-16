const express = require("express");
const router = express.Router();
const companyRegister = require("../services/database/companies");
const { createUser } = require("../services/database/users");

router.get("/", (req, res) => {
  companyRegister
    .getAllCompanies()
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
    role,
    email,
    password
  } = req.body;

  const user = { email: email, password: password, role: "company" };

  createUser(user)
    .then(userData => {
      const user = userData[0];
      const user_id = user.user_id;

      return {
        name,
        description,
        industry,
        logo_url,
        role,
        email,
        password,
        user_id
      };
    })
    .then(companyProfile => {
      return companyRegister.registerCompany(companyProfile);
    })
    .then(data => {
      res.send({ success: true });
    });
});

module.exports = router;
