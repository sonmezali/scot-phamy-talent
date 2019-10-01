import React from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import MenuItems from "./MenuItems";

export default ({
  visible,
  activeItem,
  handleSidebarHide,
  handleItemClick
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      color={"blue"}
      onHide={handleSidebarHide}
      visible={visible}
      width="thin"
    >
      <MenuItems
        vertical
        visible={visible}
        handleSidebarHide={handleSidebarHide}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
      />
    </Sidebar>
  );
};
