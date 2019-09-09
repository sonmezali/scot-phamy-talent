export const getApplicantProfileByUserId = id => {
  return fetch(`/api/applicantProfile/${id}`)
    .then(res => res.json())
    .catch(e => console.log("error", e));
};

export const createNewApplicantUserAndProfile = applicantEntry => {
  console.log("applicantEntriesApi=====>", applicantEntry);
  return fetch("/api/applicantProfile/", {
    method: "POST",
    body: JSON.stringify(applicantEntry),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};

// Get the skills from data base to applicant profile using id
export const getSkillsList = id => {
  return fetch(`/api/applicantSkills/${id}`).then(res => res.json());
};
