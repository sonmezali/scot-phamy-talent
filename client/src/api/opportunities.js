export const createNewOpportunity = formEntry => {
  return fetch("/api/opportunities/newOpportunity", {
    method: "POST",
    body: JSON.stringify(formEntry),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};
