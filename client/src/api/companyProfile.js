export const getCompanyProfile = id => {
  return fetch(`/api/company-profile/${id}`)
    .then(res => res.json())
    .catch(e => console.log("error", e));
};
