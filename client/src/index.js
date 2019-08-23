import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import CompanyProfile from "./components/CompanyProfile";
import NewOpportunityForm from "./components/NewOpportunityForm";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

const Routes = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/status">
              Status
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/create-opportunity">
              Create Opportunity
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/company-profile">
              Company Profile
            </Link>
          </li>
        </ul>

        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/status/" component={Status} />
            <Route path="/company-profile" exact component={CompanyProfile} />
            <Route Path="/create-opportunity" component={NewOpportunityForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
