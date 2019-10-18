export const getApplicantProfileByUserId = id => {
  return fetch(`/api/applicantProfile/${id}`)
    .then(res => res.json())
    .catch(e => console.log("error", e));
};

export const createNewApplicantUserAndProfile = applicantEntry => {
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
export const deleteApplicantProfile = (applicantId, userId) => {
  return fetch(
    `/api/applicantProfile?applicantId=${applicantId}&userId=${userId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }
  ).then(res => res.json());
};
export const getSkillsForEditApplicantProfile = id => {
  return fetch(`/api/applicantSkills/getSkillsId/${id}`).then(res =>
    res.json()
  );
};
export const updateApplicantProfile = (id, updatedEntries) => {
  return fetch(`/api/applicantProfile/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedEntries),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
