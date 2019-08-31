const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);
// const { newOpportunitySkills } = require("./opportunitySkills");

const createOpportunity = ({
	name,
	description,
	contactPerson,
	telephone,
	email,
	city,
	date,
	type,
	company_id,
}) => {
	return new Promise((resolve, reject) => {
		pool.query(
			"INSERT INTO opportunities (name ,description ,contact_person,telephone ,email ,city,date,type,company_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING opportunity_id",
			[
				name,
				description,
				contactPerson,
				telephone,
				email,
				city,
				date,
				type,
				company_id,
			],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result.rows);
			}
		);
	});
};

module.exports = { createOpportunity };
