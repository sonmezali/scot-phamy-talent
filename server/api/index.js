const express = require("express");
const router = express.Router();

const users = require("./users");
const status = require("./status");
const cities = require("./cities");
const skills = require("./skills");
const newOpportunity = require("./opportunities");

router.use("/users", users);
router.use("/status", status);
router.use("/cities", cities);
router.use("/skills", skills);
router.use("/opportunities", newOpportunity);

module.exports = router;
