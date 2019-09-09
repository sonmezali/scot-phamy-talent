const { Pool } = require("pg");
const config = require("../../config");
const format = require("pg-format");
const pool = new Pool(config);

// newOpportunitySkills inserts the opportunity id and skill to a new row at opportunity_skills table
//need to install pg-format https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/   to insert multiple entries
// Using pg-format to insert multiple rows with Node Postgres

const newOpportunitySkills = ({ skills, opportunityId }) => {
	const SkillsAndIdArray = skills.map((skill) => [skill, opportunityId]);
	const query = format(
		"INSERT INTO opportunity_skills (skill_id, opportunity_id) VALUES %L",
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
const getSkillsForOpportunitiesList = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT
    skills.name AS skill
  FROM 
    skills
    INNER JOIN  opportunity_skills ON opportunity_skills.skill_id = skills.skill_id
    WHERE opportunity_skills.opportunity_id = '${id}'
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

module.exports = { newOpportunitySkills  , getSkillsForOpportunitiesList};
