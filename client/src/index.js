import ReactDOM from "react-dom";
import React from "react";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Routes from "./components/Routes";

ReactDOM.render(<Routes />, document.getElementById("root"));
import CompanyProfile from "./components/CompanyProfile";
<Route path="/company-profile" exact component={CompanyProfile}/>