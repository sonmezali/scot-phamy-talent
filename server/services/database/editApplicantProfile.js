const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const editApplicantProfile = ({
  name,
  about,
  city,
  cvLink,
  rightToWork,
  profilePicLink,
  id
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE applicant_profile SET name=$1, about=$2, city=$3, cvLink=$4, profile_picture=$5, right_to_work=$6 WHERE applicant_id=${id}`,
      [name, about, city, cvLink, profilePicLink, rightToWork],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};
module.exports = { editApplicantProfile };
