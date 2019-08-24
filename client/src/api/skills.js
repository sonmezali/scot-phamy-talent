export const getSkills = () => {
  return fetch("/api/skills").then(res => res.json());
};
