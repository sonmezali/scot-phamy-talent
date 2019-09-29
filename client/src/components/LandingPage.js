import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Header, Grid, Segment } from "semantic-ui-react";
import SideBarMenu from "./SideBar";
// import MainRegister from "./MainRegister";

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
            floated="left"
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
              src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&ixid=&auto=format&fit=crop&w=500&q=60"
              alt={"Photo by Nicholas Green on Unsplash"}
              centered
              size="large"
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
          color="blue"
          centered
          as={Link}
          to="/Login"
          style={{ paddingBottom: 2 }}
        >
          <Grid.Column textAlign="center" width="13">
            <Segment style={{ backgroundColor: "#bce0fd" }}>
              <Header color="blue" as="h1">
                <Header.Content>
                  <Icon name="sign in" />
                  Sign In
                </Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          textAlign="center"
          columns={2}
          color="blue"
          style={{ paddingTop: 2 }}
          centered
        >
          <Grid.Column
            as={Link}
            to="/company-register"
            textAlign="center"
            width="7"
          >
            <Segment
              style={{
                padding: "20px",
                backgroundColor: "#bce0fd",
                margin: 5
              }}
            >
              <Header color="blue" as="h3">
                <Header.Content>
                  <Icon name="building outline" />
                  Company Register
                </Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column
            as={Link}
            to="/applicant-register"
            width="7"
            textAlign="center"
          >
            <Segment
              style={{
                padding: "20px",
                backgroundColor: "#bce0fd",
                margin: 5
              }}
            >
              <Header color="blue" as="h3">
                <Header.Content>
                  <Icon name="user" />
                  Applicant Register
                </Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
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
