export const createNewOpportunity = formEntry => {
  return fetch("/api/opportunities/newOpportunity", {
    method: "POST",
    body: JSON.stringify(formEntry),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};

export const getOpportunitiesForList = () => {
  return fetch("/api/opportunities/opportunityList").then(res => res.json());
};
export const getSkillsList = () => {
  return fetch("/api/opportunitySkills/opportunitySkillsForList").then(res =>
    res.json()
  );
};
