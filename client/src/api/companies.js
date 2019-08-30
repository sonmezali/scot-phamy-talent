export const companyRegister = profile => {
  return fetch("/api/companies", {
    method: "POST",
    body: JSON.stringify(profile),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};
