import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import NavBar from "./components/NavBar";
import NewOpportunityForm from "./components/NewOpportunityForm";
import ApplicantProfile from "./components/ApplicantProfile";

const Routes = () => {
  return (
    <Container>
      <Router>
        <NavBar />

        <div style={{ margin: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/status" exact component={Status} />
          <Route path="/applicant-profile" exact component={ApplicantProfile} />
          <Route
            path="/create-opportunity"
            exact
            component={NewOpportunityForm}
          />
        </div>
      </Router>
    </Container>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
