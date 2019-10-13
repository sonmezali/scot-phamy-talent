const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  editPassword,
  getUserById
} = require("../services/database/users");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
  getAllUsers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  getUserById(userId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});

router.put("/change-password", (req, res) => {
  const { userId, newPassword } = req.body;
  editPassword({ userId, newPassword })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500);
    });
});
module.exports = router;
