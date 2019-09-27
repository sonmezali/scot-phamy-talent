const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getApplicantProfile = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
  applicant_profile.applicant_id,
  applicant_profile.user_id,
  applicant_profile.name AS applicant_name,
  applicant_profile.about AS about,
  applicant_profile.cvLink,
  users.email AS email,
  applicant_profile.application_status,
  applicant_profile.right_to_work,
  cities.city
FROM applicant_profile
INNER JOIN users On applicant_profile.user_id = users.user_id
  INNER JOIN cities ON applicant_profile.city = cities.id
WHERE applicant_profile.user_id = $1`,
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
const getAllApplicantsProfile = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
  applicant_profile.applicant_id,
  applicant_profile.name AS applicant_name,
  applicant_profile.about AS about,
  applicant_profile.cvLink,
  users.email AS email,
  applicant_profile.application_status,
  applicant_profile.right_to_work,
  cities.city
FROM applicant_profile
INNER JOIN users On applicant_profile.user_id = users.user_id
  INNER JOIN cities ON applicant_profile.city = cities.id`,

      (error, result) => {
        if (error) {
          console.error(error);
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const createApplicantProfile = ({
  name,
  about,
  city,
  cvLink,
  rightToWork,
  userId
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO applicant_profile (name,about,city,cvLink,right_to_work,user_id ) VALUES($1,$2,$3,$4,$5,$6) RETURNING applicant_id",
      [name, about, city, cvLink, rightToWork, userId],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};
const deleteApplicantProfile = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM applicant_profile WHERE applicant_id = ${id} `,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

module.exports = {
  deleteApplicantProfile,
  getApplicantProfile,
  getAllApplicantsProfile,
  createApplicantProfile
};
