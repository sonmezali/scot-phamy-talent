const express = require("express");
const router = express.Router();
const {
  approveApplicantProfile
} = require("../services/database/adminProfile");
router.put("/:id", (req, res) => {
  const { id } = req.params;
  approveApplicantProfile(id)
    .then(data => {
      res.send({ success: true });
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});
module.exports = router;
