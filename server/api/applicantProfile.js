const express = require("express");
const router = express.Router();
const applicantProfileDb = require("../services/database/applicantProfile");

router.get("/:id", (req, res) => {
	const { id } = req.params;
	applicantProfileDb
		.getApplicantProfile(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.send(500);
		});
});

module.exports = router;
