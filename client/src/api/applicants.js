const getAllApplicants = () => {
  return fetch("/api/applicantProfile")
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
};
export default getAllApplicants;
