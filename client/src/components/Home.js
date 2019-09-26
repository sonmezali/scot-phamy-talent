import React from "react";
import LandingPage from "./LandingPage";
import { getLoggedInUserData } from "../utils/storage";
import MatchingApplicantsAndOppotunities from "./MatchingApplicantsAndOppotunities";

export default () =>
  getLoggedInUserData() ? (
    <MatchingApplicantsAndOppotunities />
  ) : (
    <LandingPage />
  );
