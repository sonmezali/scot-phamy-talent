import React from "react";
import LandingPage from "./LandingPage";
import { getLoggedInUserData } from "../utils/storage";
import MatchingApplicantsAndOppotunities from "./MatchingApplicantsAndOppotunities";
import ApplicantsList from "../components/Applicant/ApplicantsList";

const renderComponent = () => {
  if (
    getLoggedInUserData() &&
    getLoggedInUserData().user.role === "applicant"
  ) {
    return <MatchingApplicantsAndOppotunities />;
  }
  if (getLoggedInUserData() && getLoggedInUserData().user.role === "company") {
    return <ApplicantsList />;
  }
  return <LandingPage />;
};

export default () => renderComponent();
