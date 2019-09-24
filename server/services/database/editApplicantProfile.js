const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const editApplicantProfile = ({
  name,
  about,
  city,
  cvLink,
  rightToWork,
  id
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE applicant_profile SET name=$1,about=$2,city=$3,cvLink=$4,right_to_work=$5 WHERE applicant_id=${id}`,
      [name, about, city, cvLink, rightToWork],
      (error, result) => {
        if (error) {
          // console.error(error);
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};
module.exports = { editApplicantProfile };
