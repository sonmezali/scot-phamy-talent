export const createNewOpportunity = formEntry => {
  return fetch("/api/opportunities", {
    method: "POST",
    body: JSON.stringify(formEntry),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};

export const getOpportunitiesForList = () => {
  return fetch("/api/opportunities").then(res => res.json());
};
export const getSkillsList = id => {
  return fetch(`/api/opportunitySkills/${id}`).then(res => res.json());
};

export const getopprtunityById = id => {
  return fetch(`/api/opportunities/opportunity/${id}`).then(res => res.json());
};
