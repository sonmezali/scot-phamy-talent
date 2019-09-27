export const approveApplicantProfile = id => {
  return fetch(`/api/adminProfile/${id}`, { method: "PUT" })
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
};
