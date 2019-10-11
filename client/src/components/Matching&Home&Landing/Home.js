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
  if (getLoggedInUserData() && getLoggedInUserData().user.role === "admin") {
    return <AdminProfiles />;
  } else {
    return <LandingPage />;
  }
};

export default () => renderComponent();
