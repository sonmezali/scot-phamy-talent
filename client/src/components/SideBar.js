import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";

export default ({ visible, activeItem, handleItemClick }) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      width="thin"
      style={{
        top: "50px"
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
        name="Opportunities"
        active={activeItem === "Opportunities"}
        onClick={handleItemClick}
        as={Link}
        to="/opportunities"
      >
        <Icon name="clipboard list"></Icon>
        Opportunity List
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
        name="Applicant Profile"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Applicant Profile"}
        to="/applicant-profile"
      >
        <Icon name="address card outline"></Icon>
        Applicant Profile
      </Menu.Item>

      <Menu.Item
        name="company-profile"
        active={activeItem === "company-profile"}
        onClick={handleItemClick}
        as={Link}
        to="/company-profile"
      >
        <Icon name="cubes" />
        Company Profile
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
    </Sidebar>
  );
};
