import React, { Component } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {
  Grid,
  Container,
  Menu,
  Icon,
  Sidebar,
  Header,
  Segment,
  Button
} from "semantic-ui-react";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import Login from "./components/Login";
// import NavBar from "./components/NavBar";
import ApplicantRegister from "./components/ApplicantRegister";
import NewOpportunityForm from "./components/NewOpportunityForm";
import MainRegister from "./components/MainRegister";
import ApplicantProfile from "./components/ApplicantProfile";
class Routes extends Component {
  state = {
    visible: false,
    activeItem: "home"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    document.location.reload();
  };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { visible, activeItem } = this.state;
    return (
      <Container>
        <Router>
          <Menu inverted>
            <Button disabled={visible} onClick={this.handleShowClick}>
              <Icon name="list layout"></Icon>
            </Button>
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={this.logout}
              as={Link}
              onClick={this.handleItemClick}
              position="right"
              to="/logout"
            >
              <Button inverted basic>
                {activeItem}
              </Button>
            </Menu.Item>

            <Menu.Menu position="right">
              {localStorage.getItem("token") ? (
                <Menu.Item
                  name="Logout"
                  active={activeItem === "Logout"}
                  onClick={this.logout}
                  as={Link}
                  onClick={this.handleItemClick}
                  position="right"
                  to="/logout"
                >
                  <Button primary> Logout</Button>
                </Menu.Item>
              ) : (
                <Menu.Item
                  name="Sign Up"
                  active={activeItem === "Sign Up"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/login"
                >
                  {" "}
                  <Button primary>Sign in</Button>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>

          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item
                name="Home"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "Home"}
                to="/"
              >
                <Icon name="home"></Icon>
              </Menu.Item>
              <Menu.Item
                name="About"
                onClick={this.handleItemClick}
                active={activeItem === "About"}
                as={Link}
                to="/about"
              >
                <Icon name="adn"></Icon>
              </Menu.Item>
              <Menu.Item
                name="Status"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "Status"}
                to="/status"
              >
                <Icon name="star outline"></Icon>
              </Menu.Item>
              <Menu.Item
                name="Create Opportunity"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "Create Opportunity"}
                to="/create-opportunity"
              >
                <Icon name="star outline"></Icon>
              </Menu.Item>
              <Menu.Item
                name="Applicant Profile"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "Applicant Profile"}
                to="/applicant-profile"
              />
              {localStorage.getItem("token") ? (
                <Menu.Item
                  name="Logout"
                  active={activeItem === "Logout"}
                  onClick={this.logout}
                  as={Link}
                  onClick={this.handleItemClick}
                  position="right"
                  to="/logout"
                >
                  <Icon name="log out"></Icon>

                  <Button primary> Logout</Button>
                </Menu.Item>
              ) : (
                <Menu.Menu position="right">
                  <Menu.Item
                    name="Sign In"
                    active={activeItem === "Sign In"}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/login"
                  >
                    <Icon name="sign-in"></Icon>{" "}
                  </Menu.Item>
                  <Menu.Item
                    name="Main register"
                    active={activeItem === "Main register"}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/main-register"
                  >
                    <Icon name="signup"></Icon>
                  </Menu.Item>
                </Menu.Menu>
              )}
            </Sidebar>
            <Sidebar.Pusher dimmed={visible}>
              <Grid width={15} centered>
                <div style={{ margin: "20px" }}>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" exact component={About} />
                  <Route path="/status" exact component={Status} />

                  <Route path="/login" exact component={Login} />
                  <Route
                    path="/applicant-profile"
                    exact
                    component={ApplicantProfile}
                  />
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
                </div>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Router>
      </Container>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById("root"));
