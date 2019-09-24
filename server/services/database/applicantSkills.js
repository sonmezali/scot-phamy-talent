const { Pool } = require("pg");
const config = require("../../config");
const format = require("pg-format");
const pool = new Pool(config);

// newApplicantSkills inserts the opportunity id and skill to a new row at opportunity_skills table
//need to install pg-format https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/   to insert multiple entries
// Using pg-format to insert multiple rows with Node Postgres

const newApplicantSkills = ({ skills, profileID }) => {
  const SkillsAndIdArray = skills.map(skill => [skill, profileID]);
  const query = format(
    "INSERT INTO applicant_skills (skill_id, applicant_id) VALUES %L",
    SkillsAndIdArray
  );
  return new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result.rows);
    });
  });
};

const getSkillsForApplicantProfile = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
    skills.name AS skill
  FROM 
    skills
    INNER JOIN  applicant_skills ON applicant_skills.skill_id = skills.skill_id
    INNER JOIN  applicant_profile ON applicant_profile.applicant_id = applicant_skills.applicant_id
    WHERE applicant_profile.user_id = '${id}'
  `,
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
const getSkillsForEditApplicantProfile = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT skill_id FROM applicant_skills WHERE applicant_id=${id}`,
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
const deleteApplicantSkillsForApplicantByapplicantProfileID = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM applicant_skills WHERE applicant_id = ${id} `,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.row);
        }
      }
    );
  });
};
module.exports = {
  newApplicantSkills,
  getSkillsForApplicantProfile,
  getSkillsForEditApplicantProfile,
  deleteApplicantSkillsForApplicantByapplicantProfileID
};
