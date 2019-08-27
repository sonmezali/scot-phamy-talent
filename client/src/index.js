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
import ApplicantRegister from "./components/ApplicantRegister";
import NewOpportunityForm from "./components/NewOpportunityForm";
import MainRegister from "./components/MainRegister";
import ApplicantProfile from "./components/ApplicantProfile";

const Routes = () => {
  return (
    <Container>
      <Router>
        <NavBar />
        <div style={{ margin: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/status" component={Status} />
          <Route path="/create-opportunity" component={NewOpportunityForm} />
          <Route path="/main-register" component={MainRegister} />
          <Route
            path="/applicant-register"
            exact
            component={ApplicantRegister}
          />
          <Route path="/applicant-profile" exact component={ApplicantProfile} />
        </div>
      </Router>
    </Container>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
