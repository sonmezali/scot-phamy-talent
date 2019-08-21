const express = require("express");
const router = express.Router();
const usersDb = require("../services/database/users");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
  usersDb
    .getAllUsers()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

module.exports = router;
