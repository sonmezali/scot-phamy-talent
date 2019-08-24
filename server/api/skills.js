const express = require("express");
const router = express.Router();
const skills = require("../services/database/skills");

/**
 * The route here will be: /skills/ (remember the prefix users is defined in api/index.js)
 */

router.get("/", (req, res) => {
  skills
    .getAllSkills()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.SendStatus(500);
    });
});

// router.get("/", (req, res) => {
//   res.send("All good");
// });

module.exports = router;
