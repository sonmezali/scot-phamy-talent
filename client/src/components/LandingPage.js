import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { Grid, Header } from "semantic-ui-react";
import SideBarMenu from "./NavBarAndSideBar/SideBar";

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
    const {
      handleItemClick,
      logout,
      handleSidebarHide,
      handleShowClick
    } = this;
    return (
      <Grid
        stretched
        columns={1}
        style={{
          backgroundColor: "rgb(221, 239, 254)",
          position: "absolute",
          left: "0",
          top: "0"
        }}
      >
        <Grid.Row>
          <Image
            floated="Left"
            style={{ marginTop: "6px", marginLeft: "15px" }}
            onClick={handleShowClick}
          >
            <Icon name="bars" size="big" color="blue"></Icon>
          </Image>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: "white" }}>
          <Grid.Column>
            <Header as="h1" fontSize="30" color="blue" textAlign="center">
              <strong>New Scots Got</strong> <br></br> Talent{" "}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ margin: "10px" }}>
            <Image
              src="https://trinitychurchvirginia.com/wp-content/uploads/2019/08/people2.jpg"
              centered
            ></Image>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: "white" }}>
          <Grid.Column>
            <Header
              color="blue"
              style={{ backgroundColor: "white" }}
              textAlign="center"
            >
              Migrants <em>(including asylum seekers)</em> can create profiles
              where they list their skills, expertise and which jobs they are
              qualified to do. Employers can post job opportunities and migrants
              can "match" with the job ads. The focus is on
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          columns={2}
          style={{ padding: "35px" }}
          as={Link}
          to="/login"
          centered
        >
          <Header color="blue" as="h1">
            <Header.Content>
              <Icon name="sign in" />
              Sign In
            </Header.Content>
          </Header>
        </Grid.Row>
        <Grid.Row
          centered
          columns={2}
          style={{ padding: "35px", backgroundColor: "#bce0fd" }}
          as={Link}
          to="/login"
        >
          <Header color="blue" as="h1">
            <Header.Content>
              <Icon name="edit" />
              Register
            </Header.Content>
          </Header>
        </Grid.Row>
        <SideBarMenu
          visible={visible}
          handleSidebarHide={handleSidebarHide}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          logout={logout}
        />
      </Grid>
    );
  }
}
