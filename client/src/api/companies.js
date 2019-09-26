export const companyRegister = profile => {
  return fetch("/api/companies", {
    method: "POST",
    body: JSON.stringify(profile),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};
export const getCompanyIdForCompanyRegister = id => {
  return fetch(`/api/companies/${id}`).then(res => {
    return res.json();
  });
};
