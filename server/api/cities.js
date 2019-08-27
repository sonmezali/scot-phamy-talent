const express = require("express");
const router = express.Router();
const cities = require("../services/database/cities");

/**
 * The route here will be: /cities/ (remember the prefix users is defined in api/index.js)
 */

router.get("/", (req, res) => {
  cities
    .getAllCities()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

module.exports = router;
