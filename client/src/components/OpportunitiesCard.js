import React from "react";
import { Icon, Card } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
export default ({ opportunity }) => (
  <Card
    centered
    raised
    color="blue"
    as={Link}
    to={`/opportunities/${opportunity.opportunity_id}`}
  >
    <Card.Content>
      <Card.Header>{opportunity.opportunity_title}</Card.Header>
      <Card.Content textAlign="left">
        contact Person: {opportunity.contact_person}
      </Card.Content>
      <Card.Meta textAlign="right">
        <Icon name="calendar times" color="red"></Icon>
        {moment(opportunity.date).format("DD MMM YYYY")}{" "}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
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
  </Card>
);
