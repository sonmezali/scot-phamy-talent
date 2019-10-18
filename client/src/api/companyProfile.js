export const getCompanyProfile = id => {
  return fetch(`/api/company-profile/${id}`)
    .then(res => res.json())
    .catch(e => console.log("error", e));
};

export const updateCompanyProfile = (id, updatedEntries) => {
  return fetch(`/api/company-profile/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedEntries),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
