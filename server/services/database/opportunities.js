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
      `INSERT INTO opportunities 
      (name ,description ,contact_person,telephone ,email ,city,date,type,company_id) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING opportunity_id`,
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
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      },
    );
  });
};

const getOpportunitiesForList = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
  opportunities.opportunity_id,
  opportunities.name AS opportunity_Title,
  opportunities.contact_person, 
  opportunities.description,
  opportunities.telephone,
  opportunities.city AS cityid,
  opportunities.email,
  opportunities.date, 
  opportunities.Type,
  cities.city AS location,
  company_profile.user_id AS user_id
  FROM
    opportunities
    INNER JOIN cities ON opportunities.city = cities.id
    INNER JOIN company_profile ON opportunities.company_id = company_profile.company_id

  `,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      },
    );
  });
};
const getOpportunityById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
  opportunities.opportunity_id,
  opportunities.name AS opportunity_Title,
  opportunities.contact_person, 
  opportunities.description,
  opportunities.telephone,
  opportunities.email,
  opportunities.date, 
   opportunities.city AS cityid,
  opportunities.Type,
  cities.city AS location,
  company_profile.name As company_name,
  opportunities.company_id,
  company_profile.user_id AS user_id

  FROM
    opportunities
    INNER JOIN cities ON opportunities.city = cities.id
    INNER JOIN company_profile ON opportunities.company_id = company_profile.company_id
    WHERE opportunities.opportunity_id =${id}
  `,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      },
    );
  });
};
const getOpportunitiesForCompanyProfileByCompanyId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT 
    opportunities.opportunity_id,
  opportunities.name AS opportunity_Title,
  opportunities.contact_person, 
  opportunities.description
  FROM
    opportunities
    INNER JOIN company_profile ON company_profile.company_id =  opportunities.company_id
        WHERE 
    company_profile.user_id = ${id}
    `,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      },
    );
  });
};
const deleteOpportunityByCompany = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM opportunities WHERE opportunity_id = ${id}`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.row);
        }
      },
    );
  });
};

const editOpportunity = ({
  id,
  name,
  description,
  contactPerson,
  telephone,
  email,
  city,
  date,
  type,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE opportunities SET name=$1 ,description=$2 ,contact_person=$3,telephone=$4 ,email=$5 ,city=$6,date=$7,type=$8  WHERE opportunity_id=${id}`,
      [name, description, contactPerson, telephone, email, city, date, type],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      },
    );
  });
};

module.exports = {
  createOpportunity,
  getOpportunitiesForList,
  getOpportunityById,
  getOpportunitiesForCompanyProfileByCompanyId,
  deleteOpportunityByCompany,
  editOpportunity,
};
