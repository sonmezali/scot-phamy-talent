const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  editPassword,
  getUserById,
  deleteUser
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

router.get("/:userId([0-9]+)", (req, res) => {
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
  editPassword(userId, newPassword)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500);
    });
});
router.delete("/delete-user/:userId([0-9]+)", (req, res) => {
  const { userId } = req.params;
  deleteUser(userId)
    .then(data => res.send({ userDeleted: true }))
    .catch(err => {
      res.status(500);
    });
});
module.exports = router;
