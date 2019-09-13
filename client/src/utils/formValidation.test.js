import validateForm from "./formValidation";
describe("form to be valid", () => {
  it("should be 8 characters length", () => {
    const formData = {
      password: ""
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(false);
  });

  it("should fail if Password NotMatching", () => {
    const formData = {
      password: "abcdefghij"
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(false);
  });

  it(`should fail if there is capital letter and matching password 
  and length is 8 characters But there is no LowerCase letter `, () => {
    const formData = {
      password: "ABCDEFGHIJ"
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(false);
  });

  it("should not pass if Length & match & uppercase & Lowercase & but no number", () => {
    const formData = {
      password: "abcdEfghj"
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(false);
  });

  it("should not pass length & match & lowercase & uppercase & number but no city selected ", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: null
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(true);
    expect(result.validConfirmPassword).toEqual(true);
    expect(result.cityIsSelected).toEqual(false);
  });
  it("should not pass length & match & lowercase & uppercase & number & city selected  but no Skills", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: "Glasgow",
      skills: []
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(true);
    expect(result.validConfirmPassword).toEqual(true);
    expect(result.cityIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(false);
  });
  it("should not pass length & match & lowercase & uppercase & number & city selected &  Skills but no right to work", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: "Glasgow",
      skills: ["v", "b", "v"],
      rightToWork: ""
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(false);
    expect(result.validPassword).toEqual(true);
    expect(result.validConfirmPassword).toEqual(true);
    expect(result.cityIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(true);
    expect(result.checkRightToWorkBox).toEqual(false);
  });
  it("should pass length & match & lowercase & uppercase & number & city selected  & no Skills and not checked", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: "Glasgow",
      skills: ["v", "b", "v"],
      rightToWork: "Yes"
    };

    const result = validateForm(formData);
    expect(result.valid).toEqual(true);
    expect(result.validPassword).toEqual(true);
    expect(result.validConfirmPassword).toEqual(true);
    expect(result.cityIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(true);
  });
});
