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
import OpportunityView from "./OpportunityView";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }

  getOpportunityId = id => {
    this.setState({ id: id });
  };
  render() {
    console.log(this.state.id);
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
          <Route
            path="/opportunities"
            render={props => (
              <OpportunitiesList
                {...props}
                getOpportunityId={this.getOpportunityId}
              ></OpportunitiesList>
            )}
          />
          <Route path="/company-profile" component={CompanyProfile} />
          <Route
            path="/opportunity"
            render={props => (
              <OpportunityView
                {...props}
                opportunityId={this.state.id}
              ></OpportunityView>
            )}
          />
        </Container>
      </Router>
    );
  }
}

export default Routes;
