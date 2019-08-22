const express = require("express");
const router = express.Router();

const users = require("./users");
const status = require("./status");
const applicantProfile = require("./applicantProfile");

router.use("/users", users);
router.use("/status", status);
router.use("/applicant-profile", applicantProfile);

module.exports = router;
