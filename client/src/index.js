import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { Grid, Container } from "semantic-ui-react";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewOpportunityForm from "./components/NewOpportunityForm";
import ApplicantProfile from "./components/ApplicantProfile";
import OpportunitiesList from "./components/OpportunitiesList";

const Routes = () => {
  return (
    <Container>
      <Router>
        <NavBar />
        <Grid width={15} centered>
          <div style={{ margin: "20px" }}>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/status" exact component={Status} />

            <Route path="/login" exact component={Login} />
            <Route path="/applicant-profile" component={ApplicantProfile} />
            <Route path="/create-opportunity" component={NewOpportunityForm} />
            <Route
              path="/opportunity-list"
              component={OpportunitiesList}
            ></Route>
          </div>
        </Grid>
      </Router>
    </Container>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
