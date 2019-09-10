import validateCreateOpportunityForm from "./cerateOpportunityValidation";

describe("form to be valid", () => {
  it("should fail if city is not selected  ", () => {
    const formEntry = {
      city: null
    };

    const result = validateCreateOpportunityForm(formEntry);
    expect(result.valid).toEqual(false);
    expect(result.validateSelectCity).toEqual(false);
  });

  it("should fail if city is selected but skills is not selected  ", () => {
    const formEntry = {
      city: "Glasgow",
      skills: []
    };

    const result = validateCreateOpportunityForm(formEntry);
    expect(result.valid).toEqual(false);
    expect(result.validateSelectCity).toEqual(true);
    expect(result.validateSelectSkills).toEqual(false);
  });
  it("should fail if city & skills are selected but type is not selected  ", () => {
    const formEntry = {
      city: "Glasgow",
      skills: ["JavaScript"],
      type: null
    };

    const result = validateCreateOpportunityForm(formEntry);
    expect(result.valid).toEqual(false);
    expect(result.validateSelectCity).toEqual(true);
    expect(result.validateSelectSkills).toEqual(true);
    expect(result.validateSelectType).toEqual(false);
  });
  it("should pass if city & skills & type are selected  ", () => {
    const formEntry = {
      city: "Glasgow",
      skills: ["JavaScript"],
      type: "Full Time"
    };

    const result = validateCreateOpportunityForm(formEntry);
    expect(result.valid).toEqual(true);
    expect(result.validateSelectCity).toEqual(true);
    expect(result.validateSelectSkills).toEqual(true);
    expect(result.validateSelectType).toEqual(true);
  });
});
