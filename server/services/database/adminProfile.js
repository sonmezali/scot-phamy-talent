const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const approveApplicantProfile = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE applicant_profile 
      SET application_status ='approved'
       Where applicant_id=${id}`,
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

module.exports = { approveApplicantProfile };
