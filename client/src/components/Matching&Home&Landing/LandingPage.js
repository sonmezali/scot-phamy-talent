import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Header, Grid } from "semantic-ui-react";
import SideBarMenu from "../NavBarAndSideBar/SideBar";

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

  render() {
    const { visible, activeItem } = this.state;
    const { handleItemClick, handleSidebarHide, handleShowClick } = this;
    return (
      <Grid
        columns={1}
        style={{
          backgroundImage: `url(https://i.imgur.com/oweEPFR.png)`,
          position: "absolute",
          left: "0",
          top: "0"
        }}
        className="landing-page"
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
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" fontSize="30" color="blue" textAlign="center">
              <strong>New Scots Got</strong> <br></br> Talent{" "}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ margin: "10px" }}>
            <Image
              src="https://i.imgur.com/jgkgOIC.jpg"
              alt={"Photo by Nicholas Green on Unsplash"}
              centered
              size="large"
            ></Image>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header color="blue" textAlign="center">
              Migrants <em>(including asylum seekers)</em> can create profiles
              where they list their skills, expertise and which jobs they are
              qualified to do. Employers can post job opportunities and migrants
              can "match" with the job ads. The focus is on highlighting the
              wasted talents of people who can't work in line with campaigns
              like #lifttheban
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          columns={2}
          as={Link}
          to="/login"
          centered
          style={{
            backgroundColor: "rgb(232, 246, 248)",
            margin: 2,
            padding: "35px"
          }}
        >
          <Header color="blue" as="h1">
            <Header.Content>
              <Icon name="sign in" />
              SIGN IN
            </Header.Content>
          </Header>
        </Grid.Row>
        <Grid.Row centered columns={3}>
          <Grid.Column
            as={Link}
            to="/company-register"
            textAlign="center"
            width={7}
            style={{
              backgroundColor: "#bce0fd",
              padding: "25px",
              margin: 1
            }}
          >
            <Header color="blue" as="h2">
              <Header.Content>
                <Icon name="building outline" />
                REGISTER AS COMPANY
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column
            width={1}
            style={{ padding: 0, margin: 0 }}
          ></Grid.Column>
          <Grid.Column
            as={Link}
            to="/applicant-register"
            textAlign="center"
            width={7}
            style={{
              padding: "25px",
              backgroundColor: "#bce0fd",
              margin: 1
            }}
          >
            <Header color="blue" as="h2">
              <Header.Content>
                <Icon name="user" />
                REGISTER AS APPLICANT
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <SideBarMenu
          visible={visible}
          handleSidebarHide={handleSidebarHide}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
        />
        <SideBarMenu
          visible={visible}
          handleSidebarHide={handleSidebarHide}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
        />
      </Grid>
    );
  }
}
