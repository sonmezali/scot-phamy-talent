export const getAllApplicants = () => {
  return fetch("/api/applicantProfile")
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
};
export const getSkillsByApplicantId = id => {
  return fetch(`/api/applicantSkills/${id}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
};
