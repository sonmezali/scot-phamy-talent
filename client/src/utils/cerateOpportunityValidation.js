const validateSelectedCity = city => {
  return city !== null;
};
const validateSelectedSkills = skills => {
  return skills && skills.length > 0;
};
const validateSelectOpportunityType = type => {
  return type !== null;
};

const validateCreateOpportunityForm = form => {
  const { city, skills, type } = form;

  const validateSelectCity = validateSelectedCity(city);
  const validateSelectSkills = validateSelectedSkills(skills);
  const validateSelectType = validateSelectOpportunityType(type);

  const valid =
    !!validateSelectSkills && !!validateSelectCity && !!validateSelectType;
  return {
    validateSelectCity,
    validateSelectSkills,
    validateSelectType,
    valid
  };
};

export default validateCreateOpportunityForm;
