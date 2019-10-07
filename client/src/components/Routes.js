import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./Mathcing&Home&Landing/LandingPage";
import Login from "./Login";
import NavBar from "./NavBarAndSideBar/NavBar";
import ApplicantRegister from "./Applicant/ApplicantRegister";
import NewOpportunityForm from "./Opportunities/NewOpportunityForm";
import ApplicantProfile from "./Applicant/ApplicantProfile";
import CompanyProfile from "./Company/CompanyProfile";
import OpportunitiesList from "./Opportunities/OpportunitiesList";
import CompanyRegister from "./Company/CompanyRegister";
import OpportunityView from "./Opportunities/OpportunityView";
import ApplicantsList from "./Applicant/ApplicantsList";
import { protect } from "../utils/authentication";
import AdminProfiles from "./Admin/AdminProfiles";

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Container>
        <Route path="/" exact component={Home} />
        <Route
          path="/company-profile"
          exact
          component={protect(CompanyProfile, "company")}
        />
        <Route
          path="/company-profile/:id"
          component={protect(CompanyProfile)}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/applicant-profile"
          exact
          component={protect(ApplicantProfile, "applicant")}
        />
        <Route
          path="/applicant-profile/:id"
          component={protect(ApplicantProfile)}
        />
        <Route
          path="/create-opportunity"
          component={protect(NewOpportunityForm, "company")}
        />
        <Route path="/applicant-register" component={ApplicantRegister} />
        <Route path="/company-register" component={CompanyRegister} />
        <Route path="/opportunities" exact component={OpportunitiesList} />
        <Route path="/opportunities/:id" component={OpportunityView} />
        <Route path="/applicants-list" component={ApplicantsList} />
        <Route
          path="/admin-Profiles"
          component={protect(AdminProfiles, "moderator")}
        />
      </Container>
    </Router>
  );
};

export default Routes;
