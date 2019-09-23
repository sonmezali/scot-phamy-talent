import React from "react";
import { Grid, Header, Dropdown, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default ({
  deleteOption,
  edit,
  changePassword,
  clickToDelete,
  createOpportunity,
  linkToCreateOpportunity
}) => {
  return (
    <Grid>
      <Grid.Column floated="right" width={5}>
        <Header>
          Option{" "}
          <Header.Content>
            <Dropdown item size="large" icon="options">
              <Dropdown.Menu direction="left">
                {edit && (
                  <Dropdown.Item name="Edit">
                    <Icon color="green" name="edit outline"></Icon>
                    Edit
                  </Dropdown.Item>
                )}
                {deleteOption && (
                  <Dropdown.Item name="Delete" onClick={clickToDelete}>
                    <Icon color={"red"} name="delete"></Icon>
                    Delete
                  </Dropdown.Item>
                )}
                {changePassword && (
                  <Dropdown.Item name="ChangePassword">
                    <Icon name="lock" color="blue" /> Change Password
                  </Dropdown.Item>
                )}
                {createOpportunity && (
                  <Dropdown.Item
                    name="ChangePassword"
                    as={Link}
                    to={linkToCreateOpportunity}
                  >
                    <Icon name="idea" color="yellow" /> Create Opportunity
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Header.Content>
        </Header>
      </Grid.Column>
    </Grid>
  );
};
