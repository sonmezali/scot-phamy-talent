const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getCompanyProfile = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
  users.email,
  company_profile.name AS company_Name,
  company_profile.description AS company_Description,
  company_profile.industry,
  opportunities.name AS opportunity_title,
  opportunities.contact_person,
  opportunities.date,
  opportunities.description AS opportunity_description FROM
  company_profile
  INNER JOIN opportunities ON opportunities.company_id = company_profile.company_id
  INNER JOIN users ON users.user_id=company_profile.user_id WHERE
  company_profile.company_id = $1`,

			[id],
			(error, result) => {
				if (error) {
					console.error(error);
					return reject(error);
				}
				resolve(result.rows[0]);
			}
		);
	});
};

module.exports = { getCompanyProfile };
