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
  Segment,
  Button
} from "semantic-ui-react";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import Login from "./components/Login";
// import NavBar from "./components/NavBar";
import NewOpportunityForm from "./components/NewOpportunityForm";
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
              position="right"
              name="logout"
              onClick={this.logout}
              as={Link}
              to="/logout"
            >
              <Button secondary>{activeItem}</Button>
            </Menu.Item>

            <Menu.Menu position="right">
              {localStorage.getItem("token") ? (
                <Menu.Item
                  position="right"
                  name="logout"
                  onClick={this.logout}
                  as={Link}
                  to="/logout"
                >
                  <Button primary>Log Out</Button>
                </Menu.Item>
              ) : (
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/login"
                >
                  <Button primary>Sign In</Button>
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
                name="home"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "home"}
                to="/"
              >
                <Icon name="home"></Icon>
              </Menu.Item>
              <Menu.Item
                name="about"
                onClick={this.handleItemClick}
                active={activeItem === "about"}
                as={Link}
                to="/about"
              >
                <Icon name="adn"></Icon>
              </Menu.Item>
              <Menu.Item
                name="status"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "status"}
                to="/status"
              >
                <Icon name="star outline"></Icon>
              </Menu.Item>
              <Menu.Item
                name="create_opportunity"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "create_opportunity"}
                to="/create-opportunity"
              >
                <Icon name="star outline"></Icon>
              </Menu.Item>
              <Menu.Item
                name="applicant-profile"
                onClick={this.handleItemClick}
                as={Link}
                active={activeItem === "applicant-profile"}
                to="/applicant-profile"
              />
              {localStorage.getItem("token") ? (
                <Menu.Item
                  position="right"
                  name="logout"
                  onClick={this.logout}
                  as={Link}
                  to="/logout"
                >
                  <Icon name="log out"></Icon>
                </Menu.Item>
              ) : (
                <Menu.Item
                  name="login"
                  onClick={this.handleItemClick}
                  as={Link}
                  active={activeItem === "login"}
                  to="/login"
                >
                  <Icon name="sign-in"></Icon>
                </Menu.Item>
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
