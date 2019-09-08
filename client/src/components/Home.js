import React from "react";
import image from "../utils/styles/image/background.svg";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { Grid, Header } from "semantic-ui-react";

export default ({ activeItem, handleItemClick, handleShowClick }) => {
  return (
    <div
      alt="background"
      style={{
        // backgroundImage: `url(${image})`,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        display: " grid",
        top: 0,
        left: 0,
        zIndex: 1
      }}
    >
      <Icon
        name="align-left"
        style={{
          fontSize: "40px",
          position: "absolute",
          zIndex: " 3",
          top: "25px",
          color: "#2699fb"
        }}
        onClick={handleShowClick}
      />
      <Grid
        style={{
          padding: "30px",
          background: "#ddeffe",
          paddingTop: "60px",
          paddingBottom: "0"
        }}
      />

      <Header
        as="h1"
        style={{
          fontSize: "48px",
          textAlign: "center",
          color: "#2699fb"
        }}
      >
        New Scots got talent
      </Header>
      <Header style={{ color: "#5aaffc", textAlign: "center" }}>
        Migrants (including asylum seekers) can create profiles where they list
        their skills, expertise and which jobs they are qualified to do.
        Employers can post job opportunities and migrants can "match" with the
        job ads. The focus is on
      </Header>
      <Grid
        style={{
          justifyContent: "center",
          display: "flex",
          fontSize: "40px",
          alignItems: "center",
          padding: "30px",
          background: "#f1f9ff"
        }}
      >
        <Icon name="signing" />
        <Menu.Item
          name="Sign In"
          active={activeItem === "Sign In"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          {" "}
          Sign in
        </Menu.Item>
      </Grid>

      <Grid
        style={{
          justifyContent: "center",
          display: "flex",
          fontSize: "40px",
          alignItems: "center",
          padding: "30px",
          background: "#bce0fd"
        }}
      >
        <Icon name="signing" />
        <Menu.Item
          name="Register"
          active={activeItem === "Main register"}
          as={Link}
          to="/main-register"
        />
      </Grid>
    </div>
  );
};
