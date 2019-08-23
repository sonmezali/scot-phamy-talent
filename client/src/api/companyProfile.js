export const getCompanyProfile = () => {
    return fetch("/api/company-profile").then(res => res.json());
  };