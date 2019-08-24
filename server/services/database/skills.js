const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllSkills = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM skills", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = { getAllSkills };
