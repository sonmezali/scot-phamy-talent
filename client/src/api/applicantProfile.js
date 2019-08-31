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
