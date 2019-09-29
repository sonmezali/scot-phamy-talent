import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NavBar from "./NavBar";
import ApplicantRegister from "./ApplicantRegister";
import NewOpportunityForm from "./NewOpportunityForm";
import ApplicantProfile from "./ApplicantProfile";
import CompanyProfile from "./CompanyProfile";
import OpportunitiesList from "./OpportunitiesList";
import CompanyRegister from "./CompanyRegister";
import OpportunityView from "./OpportunityView";
import ApplicantsList from "./ApplicantsList";
import { protect } from "../utils/authentication";
import AdminProfiles from "./AdminProfiles";
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
