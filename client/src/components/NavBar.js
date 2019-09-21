import React, { Component } from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SideBarMenu from "./SideBar";
import { getLoggedInUserData, removeUserData } from "../utils/storage";

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

  handleSidebarHide = () => {
    this.setState({ visible: false });
  };

  handleShowClick = () => {
    this.setState({ visible: true });
  };

  //logOut function
  logout = event => {
    event.preventDefault();
    removeUserData();
    document.location.reload();
  };

  render() {
    const { visible, activeItem } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));

    const {
      handleItemClick,
      handleShowClick,
      logout,
      handleSidebarHide
    } = this;
    return (
      <React.Fragment>
        <Menu size="mini" inverted color="blue">
          <Menu.Item>
            <Icon
              size="large"
              name="list layout"
              onClick={handleShowClick}
            ></Icon>
          </Menu.Item>
          <Menu.Item position="left">
            <Menu.Header as="h4">{activeItem}</Menu.Header>
          </Menu.Item>
          {getLoggedInUserData() ? (
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
              Logout
            </Menu.Item>
          ) : (
            <Dropdown item size="large" icon="user">
              <Dropdown.Menu direction="left">
                <Dropdown.Item
                  name="Sign In"
                  active={activeItem === "Sign In"}
                  onClick={handleItemClick}
                  as={Link}
                  to="/login"
                >
                  <Icon size-="large" name="sign-in"></Icon>
                  Sign In
                </Dropdown.Item>
                <Dropdown.Item
                  name="Main register"
                  active={activeItem === "Main register"}
                  onClick={handleItemClick}
                  as={Link}
                  to="/main-register"
                >
                  <Icon size-="large" name="signup"></Icon>
                  Sign up
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <SideBarMenu
            visible={visible}
            handleSidebarHide={handleSidebarHide}
            activeItem={activeItem}
            handleItemClick={handleItemClick}
            logout={logout}
            user={user}
          />
        </Menu>
      </React.Fragment>
    );
  }
}

export default NavBar;
