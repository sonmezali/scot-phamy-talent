export const getSkillsForEditApplicantProfile = id => {
  return fetch(`/api/applicantSkills/getSkillsId/${id}`).then(res =>
    res.json()
  );
};
export const updateApplicantProfile = (id, updatedEntries) => {
  return fetch(`/api//editApplicantProfile/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedEntries),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
