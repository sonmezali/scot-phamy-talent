import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";

export default ({
  visible,
  handleSidebarHide,
  activeItem,
  handleItemClick,
  logout
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      onHide={handleSidebarHide}
      vertical
      visible={visible}
      width="thin"
      style={{
        top: "48px"
      }}
    >
      <Menu.Item
        name="Home"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Home"}
        to="/"
      >
        <Icon name="home"></Icon>
        Home
      </Menu.Item>
      <Menu.Item
        name="About"
        onClick={handleItemClick}
        active={activeItem === "About"}
        as={Link}
        to="/about"
      >
        <Icon name="adn"> </Icon>
        About
      </Menu.Item>
      <Menu.Item
        name="Opportunity List"
        active={activeItem === "Opportunity List"}
        onClick={handleItemClick}
        as={Link}
        to="/opportunity-list"
      >
        <Icon name="clipboard list"></Icon>
        Opportunity List
      </Menu.Item>
      <Menu.Item
        name="Status"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Status"}
        to="/status"
      >
        <Icon name="tag"></Icon>
        Status
      </Menu.Item>
      <Menu.Item
        name="Create Opportunity"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Create Opportunity"}
        to="/create-opportunity"
      >
        <Icon name="idea"></Icon>
        Create Opportunity
      </Menu.Item>
      <Menu.Item
          name="company-profile"
          active={activeItem === "company-profile"}
          onClick={handleItemClick}
          as={Link}
          to="/company-profile"
        />
      <Menu.Item
        name="Applicant Profile"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Applicant Profile"}
        to="/applicant-profile"
      >
        <Icon name="address card outline"></Icon>
        Applicant Profile
      </Menu.Item>
      {localStorage.getItem("token") ? (
        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={event => {
            logout(event);
            handleItemClick(event);
          }}
          as={Link}
          position="right"
          to="/logout"
        >
          <Icon name="log out"></Icon>
          Log Out
        </Menu.Item>
      ) : (
        <Menu.Menu>
          <Menu.Item
            name="Sign In"
            active={activeItem === "Sign In"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          >
            <Icon name="sign-in"></Icon>
            Sign In
          </Menu.Item>
          <Menu.Item
            name="Main register"
            active={activeItem === "Main register"}
            onClick={handleItemClick}
            as={Link}
            to="/main-register"
          >
            <Icon name="signup"></Icon>
            Sign In
          </Menu.Item>
        </Menu.Menu>
      )}
    </Sidebar>
  );
};
