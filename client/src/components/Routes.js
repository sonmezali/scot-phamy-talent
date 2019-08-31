import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Status from "./Status";
import Login from "./Login";
import NavBar from "./NavBar";
import ApplicantRegister from "./ApplicantRegister";
import NewOpportunityForm from "./NewOpportunityForm";
import MainRegister from "./MainRegister";
import ApplicantProfile from "./ApplicantProfile";

class Routes extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Container>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/status" exact component={Status} />

          <Route path="/login" exact component={Login} />
          <Route path="/applicant-profile" exact component={ApplicantProfile} />
          <Route
            path="/create-opportunity"
            exact
            component={NewOpportunityForm}
          />
          <Route path="/main-register" exact component={MainRegister} />
          <Route
            path="/applicant-register"
            exact
            component={ApplicantRegister}
          />
        </Container>
      </Router>
    );
  }
}

export default Routes;
