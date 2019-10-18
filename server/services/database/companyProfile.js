const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getCompanyProfile = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
  users.email,
  company_profile.company_id,
  company_profile.name AS company_Name,
  company_profile.description AS company_Description,
  company_profile.industry,
  company_profile.logo_url,
  company_profile.location AS cityid,
  cities.city AS location,
  company_profile.user_id
   FROM
  company_profile
  INNER JOIN users ON users.user_id = company_profile.user_id 
  INNER JOIN cities ON cities.id = company_profile.location
  WHERE company_profile.user_id = $1`,

      [id],
      (error, result) => {
        if (error) {
          console.error(error);
          return reject(error);
        }
        resolve(result.rows[0]);
      },
    );
  });
};

const editCompanyProfile = ({ name, description, city, logo_url, id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE company_profile SET name=$1, description=$2,location=$3,logo_url=$4  WHERE company_id=${id}`,
      [name, description, city, logo_url],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      },
    );
  });
};
module.exports = { getCompanyProfile, editCompanyProfile };
