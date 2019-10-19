import React from "react";
import LandingPage from "./LandingPage";
import { getLoggedInUserData } from "../../utils/storage";
import MatchingApplicantsAndOppotunities from "./MatchingApplicantsAndOppotunities";
import ApplicantsList from "../Applicant/ApplicantsList";
import AdminProfiles from "../Admin/AdminProfiles";

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
  if (
    getLoggedInUserData() &&
    getLoggedInUserData().user.role === "moderator"
  ) {
    return <AdminProfiles />;
  }
  return <LandingPage />;
};

export default () => {
  return <React.Fragment>{renderComponent()}</React.Fragment>;
};
