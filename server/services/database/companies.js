const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllCompanies = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM company_profile", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const registerCompany = ({
  name,
  description,
  industry,
  city,
  logo_url,
  user_id
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO company_profile (name ,description ,location, industry,logo_url ,user_id) VALUES($1,$2,$3,$4, $5,$6)",
      [name, description, city, industry, logo_url, user_id],
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

module.exports = { registerCompany, getAllCompanies };
