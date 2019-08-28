import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";

class NavBar extends Component {
  state = {
    activeItem:
      window.location.pathname === "/"
        ? "home"
        : window.location.pathname.substr(1)
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    document.location.reload();
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu pointing size="large" color="blue">
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
        {/* <Menu.Item
          position='right'
          name='main_register'
          active={activeItem === "main_register"}
          onClick={this.handleItemClick}
          as={Link}
          to='/main-register'
        > */}
        {/* <Button primary>SignUp</Button>
        </Menu.Item> */}
        {localStorage.getItem("token") ? (
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.logout}
            as={Link}
            position="right"
            to="/logout"
          >
            <Button primary> Logout</Button>
          </Menu.Item>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
              as={Link}
              to="/login"
            >
              {" "}
              <Button primary>Sign in</Button>
            </Menu.Item>
            <Menu.Item
              name="main_register"
              active={activeItem === "main_register"}
              onClick={this.handleItemClick}
              as={Link}
              to="/main-register"
            >
              <Button primary> Sign up</Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default NavBar;
