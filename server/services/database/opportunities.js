const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const createOpportunity = ({
  name,
  description,
  contactPerson,
  telephone,
  email,
  city,
  date,
  type,
  company_id,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO opportunities (name ,description ,contact_person,telephone ,email ,city,date,type,company_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        name,
        description,
        contactPerson,
        telephone,
        email,
        city,
        date,
        type,
        company_id,
      ],
      (error, result) => {
        console.log("dbResult", error, result);
        if (error) {
          reject(error);
        }
        console.log(result);
        resolve(result.rows);
      },
    );
  });
};

module.exports = { createOpportunity };
