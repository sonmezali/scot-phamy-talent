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
export const getSkillsList = id => {
  return fetch(`/api/opportunitySkills/opportunitySkillsForList/${id}`).then(
    res => res.json()
  );
};
