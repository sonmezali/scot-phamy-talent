import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Container } from "semantic-ui-react";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import NavBar from "./components/NavBar";
import CompanyRegisterPage from "./components/CompanyRegisterPage";
import NewOpportunityForm from "./components/NewOpportunityForm";
import RegisterPage from "./components/RegisterPage";

const Routes = () => {
  return (
    <Container>
      <Router>
        <NavBar />
        <RegisterPage />
        <Grid width={15} centered>
          <div style={{ margin: "20px" }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/status" component={Status} />
              <Route
                Path="/create-opportunity"
                component={NewOpportunityForm}
              />
              <Route Path="/main-register-page" component={RegisterPage} />
              {/* <Route
                Path='/company-register'
                exact
                component={CompanyRegisterPage}
              /> */}
            </Switch>
          </div>
        </Grid>
      </Router>
    </Container>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
