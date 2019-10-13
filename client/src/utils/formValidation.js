const validatePasswordLength = password => password.length > 8;

const validatePasswordMatching = (password, confirmPassword) =>
  password === confirmPassword;
const validatePasswordContainUppercase = password => /[A-Z]/.test(password);
const validatePasswordContainLowercase = password => /[a-z]/.test(password);

const validatePasswordContainNumber = password => /[0-9]/.test(password);

const validateSelectedCity = city => city !== null;

const validateSelectedSkills = skills => skills && skills.length > 0;
const validateSelectedIndustry = industries => industries !== null;

const validateCheckedRightToWork = rightToWork =>
  rightToWork === "Yes" || rightToWork === "No";

const validateApplicantRegisterForm = form => {
  const { password, confirmPassword, city, skills, rightToWork } = form;
  const passwordLength = validatePasswordLength(password);
  const passwordIsMatching = validatePasswordMatching(
    password,
    confirmPassword
  );
  const passwordContainUppercase = validatePasswordContainUppercase(password);
  const passwordContainLowerCase = validatePasswordContainLowercase(password);
  const passwordContainNumber = validatePasswordContainNumber(password);
  const cityIsSelected = validateSelectedCity(city);
  const skillsIsSelected = validateSelectedSkills(skills);
  const checkRightToWorkBox = validateCheckedRightToWork(rightToWork);
  const validPassword =
    !!passwordLength &&
    !!passwordContainUppercase &&
    !!passwordContainLowerCase &&
    !!passwordContainNumber;
  const validConfirmPassword = !!passwordIsMatching;

  const valid =
    !!validPassword &&
    !!validConfirmPassword &&
    !!cityIsSelected &&
    !!skillsIsSelected &&
    !!checkRightToWorkBox;

  return {
    validPassword,
    validConfirmPassword,
    cityIsSelected,
    skillsIsSelected,
    checkRightToWorkBox,
    valid
  };
};

const validateCompanyRegisterForm = form => {
  const { password, confirmPassword, city, industry } = form;
  const passwordLength = validatePasswordLength(password);
  const passwordIsMatching = validatePasswordMatching(
    password,
    confirmPassword
  );
  const passwordContainUppercase = validatePasswordContainUppercase(password);
  const passwordContainLowerCase = validatePasswordContainLowercase(password);
  const passwordContainNumber = validatePasswordContainNumber(password);
  const cityIsSelected = validateSelectedCity(city);
  const industryIsSelected = validateSelectedIndustry(industry);
  const validPassword =
    !!passwordLength &&
    !!passwordContainUppercase &&
    !!passwordContainLowerCase &&
    !!passwordContainNumber;
  const validConfirmPassword = !!passwordIsMatching;

  const valid =
    !!validPassword &&
    !!validConfirmPassword &&
    !!cityIsSelected &&
    !!industryIsSelected;
  return {
    validPassword,
    validConfirmPassword,
    cityIsSelected,
    industryIsSelected,
    valid
  };
};

const validateChangePasswordForm = form => {
  const { password, confirmPassword, city, industry } = form;
  const passwordLength = validatePasswordLength(password);
  const passwordIsMatching = validatePasswordMatching(
    password,
    confirmPassword
  );
  const passwordContainUppercase = validatePasswordContainUppercase(password);
  const passwordContainLowerCase = validatePasswordContainLowercase(password);
  const passwordContainNumber = validatePasswordContainNumber(password);
  const cityIsSelected = validateSelectedCity(city);
  const industryIsSelected = validateSelectedIndustry(industry);
  const validPassword =
    !!passwordLength &&
    !!passwordContainUppercase &&
    !!passwordContainLowerCase &&
    !!passwordContainNumber;
  const validConfirmPassword = !!passwordIsMatching;

  const valid = !!validPassword && !!validConfirmPassword;
  return {
    validPassword,
    validConfirmPassword,
    valid
  };
};

export {
  validateApplicantRegisterForm,
  validateCompanyRegisterForm,
  validateChangePasswordForm
};
