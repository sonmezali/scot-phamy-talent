import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = { activeItem: "home" };

  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    document.location.reload();
  };

  handleItemClick = ({ name }) => this.setState({ activeItem: name });
  render() {
    const activeItem = this.state;
    return (
      <Menu tabular size="large">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="about"
          active={activeItem === "about"}
          onClick={this.handleItemClick}
          as={Link}
          to="/about"
        />
        <Menu.Item
          name="status"
          active={activeItem === "status"}
          onClick={this.handleItemClick}
          as={Link}
          to="/status"
        />
        <Menu.Item
          name="create_opportunity"
          active={activeItem === "create_opportunity"}
          onClick={this.handleItemClick}
          as={Link}
          to="/create-opportunity"
        />
        <Menu.Item
          name="applicant-profile"
          active={activeItem === "applicant-profile"}
          onClick={this.handleItemClick}
          as={Link}
          to="/applicant-profile"
        />
        {localStorage.getItem("token") ? (
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.logout}
            as={Link}
            to="/logout"
          />
        ) : (
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
            as={Link}
            to="/login"
          />
        )}
      </Menu>
    );
  }
}

export default NavBar;
