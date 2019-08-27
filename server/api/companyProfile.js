const express = require("express");
const router = express.Router();
const companyProfileDb = require("../services/database/companyProfile");

/**
 * The route here will be: /company-profile/ (remember the prefix company-profile is defined in api/index.js)
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  companyProfileDb
    .getCompanyProfile(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

module.exports = router;
