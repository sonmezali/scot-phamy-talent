import React from "react";
// import image from "../utils/styles/image/background.svg";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { Grid, Header } from "semantic-ui-react";

export default () => {
  return (
    <div alt="background" style={styles.landingPage}>
      <Grid style={styles.contents} />
      <Header as="h1" style={styles.title}>
        New Scots got talent
      </Header>
      <Header style={styles.description}>
        Migrants (including asylum seekers) can create profiles where they list
        their skills, expertise and which jobs they are qualified to do.
        Employers can post job opportunities and migrants can "match" with the
        job ads. The focus is on
      </Header>
      <Grid style={styles.signIn}>
        <Icon name="signing" />
        <Menu.Item name="Sign In" as={Link} to="/login">
          {" "}
          Sign in
        </Menu.Item>
      </Grid>

      <Grid style={styles.signOut}>
        <Icon name="signing" />
        <Menu.Item name="Register" as={Link} to="/main-register" />
      </Grid>
    </div>
  );
};

const styles = {
  landingPage: {
    // backgroundImage: `url(${image})`,
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: " grid",
    top: 0,
    left: 0,
    zIndex: 1
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
