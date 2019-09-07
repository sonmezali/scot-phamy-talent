import React, { Component } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SideBarMenu from "./SideBar";
class NavBar extends Component {
  state = {
    visible: false,
    activeItem:
      window.location.pathname === "/"
        ? "home"
        : window.location.pathname.substr(1)
  };
  // handlers
  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, visible: false });

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
    const { handleItemClick, logout } = this;
    return (
      <React.Fragment>
        <Menu size="mini" inverted>
          <Menu.Item onClick={this.handleShowClick}>
            <Icon size="large" name="list layout"></Icon>
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Header>{activeItem}</Menu.Header>
          </Menu.Item>
          {localStorage.getItem("token") ? (
            <Menu.Item
              name="Logout"
              size="mini"
              active={activeItem === "Logout"}
              onClick={event => {
                this.logout(event);
                handleItemClick(event);
              }}
              as={Link}
              position="right"
              to="/logout"
            >
              <Button primary> Logout</Button>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Button
                style={{ margin: "1px" }}
                size="mini"
                primary
                name="Sign In"
                active={activeItem === "Sign In"}
                onClick={handleItemClick}
                as={Link}
                to="/login"
              >
                Sign In
              </Button>{" "}
              <Button
                style={{ margin: "1px" }}
                primary
                size="mini"
                name="Main register"
                active={activeItem === "Main register"}
                onClick={handleItemClick}
                as={Link}
                to="/main-register"
              >
                Sign up
              </Button>
            </Menu.Item>
          )}
        </Menu>
        <SideBarMenu
          visible={visible}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          logout={logout}
        />
      </React.Fragment>
    );
  }
}

export default NavBar;
