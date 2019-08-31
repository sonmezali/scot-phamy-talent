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
  const name = req.body.name;
  const description = req.body.description;
  const industry = req.body.industry;

  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;

  const user = { email: email, password: password, role: "company" };

  createUser(user)
    .then(userData => {
      const user = userData[0];
      const user_id = user.user_id;

      return {
        name: name,
        description: description,
        industry: industry,
        role: role,
        email: email,
        password: password,
        user_id: user_id
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
