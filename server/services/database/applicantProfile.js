const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getApplicantProfile = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT applicant_profile.name,cities.city, applicant_profile.application_status, applicant_profile.right_to_work, users.email, skills.name FROM applicant_profile INNER JOIN cities ON applicant_profile.city=cities.id
       INNER JOIN users on applicant_profile.user_id=users.user_id
       INNER JOIN applicant_skills on applicant_profile.applicant_id= applicant_skills.applicant_id 
       INNER JOIN skills on applicant_skills.skill_id=skills.skill_id where applicant_profile.applicant_id=$1`,
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

module.exports = { getApplicantProfile };
