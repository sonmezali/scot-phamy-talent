import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid, Container } from "semantic-ui-react";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import NavBar from "./components/NavBar";
import ApplicantRegister from "./components/ApplicantRegister";
import NewOpportunityForm from "./components/NewOpportunityForm";
import MainRegister from "./components/MainRegister";

const Routes = () => {
  return (
    <Container>
      <Router>
        <NavBar />
        <Grid width={15}>
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
          </div>
        </Grid>
      </Router>
    </Container>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
