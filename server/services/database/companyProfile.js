const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getCompanyProfile = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			"SELECT * FROM company_profile where company_id = $1",
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
