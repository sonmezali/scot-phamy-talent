import React from "react";
// import image from "../utils/styles/image/background.svg";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { Grid, Header } from "semantic-ui-react";
import SideBarMenu from "./SideBar";

export default class landingPage extends React.Component {
  state = {
    visible: false,
    activeItem:
      window.location.pathname === "/"
        ? "home"
        : window.location.pathname.substr(1)
  };

  handleHideClick = () => this.setState({ visible: false });

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, visible: false });

  handleSidebarHide = () => this.setState({ visible: false });

  handleShowClick = () =>
    this.setState(prevState => {
      const visibleState = prevState.visible;
      return {
        visible: !visibleState
      };
    });

  //logOut function
  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    document.location.reload();
  };

  render() {
    const { visible, activeItem } = this.state;
    const { handleItemClick, logout, handleSidebarHide } = this;

    return (
      <div alt="background" style={styles.landingPage}>
        <Icon
          name="align left"
          style={styles.menu}
          onClick={this.handleShowClick}
        />
        <Grid style={styles.contents} />
        <Header as="h1" style={styles.title}>
          <strong>New Scots</strong> <br></br> Got Talent
        </Header>
        <Header style={styles.description}>
          Migrants (including asylum seekers) can create profiles where they
          list their skills, expertise and which jobs they are qualified to do.
          Employers can post job opportunities and migrants can "match" with the
          job ads. The focus is on
        </Header>
        <Grid style={styles.signIn} as={Link} to="/login">
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Icon name="sign in" />
            </Grid.Column>
            <Grid.Column>
              <Menu.Item name="Sign In"> Sign in</Menu.Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={styles.signOut} as={Link} to="/login">
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Icon name="edit" />
            </Grid.Column>
            <Grid.Column>
              <Menu.Item name="Register" as={Link} to="/main-register" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SideBarMenu
          visible={visible}
          handleSidebarHide={handleSidebarHide}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          logout={logout}
        />
      </div>
    );
  }
}

const styles = {
  landingPage: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: " grid",
    top: 0,
    left: 0,
    zIndex: 1
  },
  menu: {
    fontSize: "25px",
    position: "absolute",
    zIndex: " 3",
    top: "25px",
    color: "#2699fb"
  },
  contents: {
    padding: "30px",
    background: "#ddeffe",
    paddingTop: "60px",
    paddingBottom: "0"
  },
  title: {
    fontSize: "48px",
    textAlign: "center",
    color: "#2699fb"
  },
  description: {
    color: "#5aaffc",
    fontSize: "20px",
    textAlign: "center"
  },
  signIn: {
    justifyContent: "center",
    display: "flex",
    fontSize: "40px",
    alignItems: "center",
    padding: "30px",
    background: "#f1f9ff"
  },
  signOut: {
    justifyContent: "center",
    display: "flex",
    fontSize: "40px",
    alignItems: "center",
    padding: "30px",
    background: "#bce0fd"
  }
};
