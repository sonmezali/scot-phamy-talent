import React from "react";
import { Icon, Card, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getLoggedInUserData } from "../utils/storage";
import moment from "moment";

export default ({
  opportunity,
  cardButtons,
  ConfirmDelete,
  handleEditOpportunity,
  contactPerson,
  date
}) => (
  <Card centered raised color="blue">
    <Card.Content
      as={Link}
      to={
        getLoggedInUserData() && `/opportunities/${opportunity.opportunity_id}`
      }
    >
      <Card.Header>{opportunity.opportunity_title}</Card.Header>
      {contactPerson && (
        <Card.Content textAlign="left">
          contact Person: {opportunity.contact_person}
        </Card.Content>
      )}
      {date && (
        <Card.Meta textAlign="right">
          <Icon name="calendar times" color="red"></Icon>
          {moment(opportunity.date).format("DD MMM YYYY")}{" "}
        </Card.Meta>
      )}
    </Card.Content>
    <Card.Content
      as={Link}
      to={
        getLoggedInUserData() && `/opportunities/${opportunity.opportunity_id}`
      }
    >
      <Card.Description
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        }}
      >
        {opportunity.description}
      </Card.Description>
    </Card.Content>
    {cardButtons && (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={handleEditOpportunity}>
            Edit
          </Button>
          <Button
            basic
            color="red"
            onClick={() => ConfirmDelete(opportunity.opportunity_id)}
          >
            Delete
          </Button>
        </div>
      </Card.Content>
    )}
  </Card>
);
