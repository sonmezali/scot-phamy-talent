const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getApplicantProfile = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT applicant_profile.name AS applicant_name,cities.city, applicant_profile.application_status, applicant_profile.right_to_work, users.email, skills.name AS skill_name FROM applicant_profile INNER JOIN cities ON applicant_profile.city=cities.id
       INNER JOIN users on applicant_profile.user_id=users.user_id
       INNER JOIN applicant_skills on applicant_profile.applicant_id= applicant_skills.applicant_id 
       INNER JOIN skills on applicant_skills.skill_id=skills.skill_id where users.user_id=$1`,
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

const createApplicantProfile = ({
	name,
	about,
	city,
	cvLink,
	value,
	user_id,
}) => {
	return new Promise((resolve, reject) => {
		pool.query(
			"INSERT INTO applicant_profile (name,about,city,cvLink,right_to_work,user_id ) VALUES($1,$2,$3,$4,$5,$6) RETURNING applicant_id",
			[name, about, city, cvLink, value, user_id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result.rows);
			}
		);
	});
};
module.exports = { getApplicantProfile, createApplicantProfile };
