import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import NavBar from "./NavBar";
import ApplicantRegister from "./ApplicantRegister";
import NewOpportunityForm from "./NewOpportunityForm";
import MainRegister from "./MainRegister";
import ApplicantProfile from "./ApplicantProfile";
import CompanyProfile from "./CompanyProfile";
import OpportunitiesList from "./OpportunitiesList";
import CompanyRegister from "./CompanyRegister";

class Routes extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Container>
          <Route path="/" exact component={Home} />
          <Route path="/company-profile" component={CompanyProfile} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/applicant-profile" component={ApplicantProfile} />
          <Route path="/create-opportunity" component={NewOpportunityForm} />
          <Route path="/main-register" component={MainRegister} />
          <Route path="/applicant-register" component={ApplicantRegister} />
          <Route path="/company-register" component={CompanyRegister} />
          <Route path="/opportunities" component={OpportunitiesList} />
          <Route path="/company-profile" exact component={CompanyProfile} />
        </Container>
      </Router>
    );
  }
}

export default Routes;
