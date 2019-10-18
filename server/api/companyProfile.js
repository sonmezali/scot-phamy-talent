const express = require("express");
const router = express.Router();
const {
  getCompanyProfile,
  editCompanyProfile,
} = require("../services/database/companyProfile");

/**
 * The route here will be: /company-profile/ (remember the prefix company-profile is defined in api/index.js)
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  getCompanyProfile(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, city, logo_url } = req.body;
  const updatedData = {
    name,
    description,
    city,
    logo_url,
    id,
  };
  editCompanyProfile(updatedData)
    .then((data) => res.send({ success: true }))
    .catch((err) => res.send({ success: false }));
});
module.exports = router;
