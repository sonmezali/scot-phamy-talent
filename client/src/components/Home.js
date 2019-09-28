import React from "react";
import LandingPage from "./LandingPage";
import { getLoggedInUserData } from "../utils/storage";
import MatchingApplicantsAndOppotunities from "./MatchingApplicantsAndOppotunities";
import ApplicantsList from "./ApplicantsList";

export default () =>
  getLoggedInUserData() && getLoggedInUserData().user.role === "applicant" ? (
    <MatchingApplicantsAndOppotunities />
  ) : getLoggedInUserData() && getLoggedInUserData().user.role === "company" ? (
    <ApplicantsList />
  ) : (
    <LandingPage />
  );
