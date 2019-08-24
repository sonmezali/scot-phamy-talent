export const getApplicantProfileByUserId = id => {
  return fetch(`/api/applicant-profile/${id}`)
    .then(res => res.json())
    .catch(e => console.log("error", e));
};
