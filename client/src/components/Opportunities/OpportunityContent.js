import React from "react";
import { Header, Grid, Segment, Icon, Item } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default ({ opportunity }) => {
  return (
    <React.Fragment>
      <Segment style={{ backgroundColor: "rgb(137, 193, 236)" }}>
        <Header textAlign="center" as="h1">
          {" "}
          {opportunity.opportunity_title}
        </Header>

        <Grid width={12}>
          <Grid.Row>
            <Grid.Column textAlign="right" style={{ color: "red" }}>
              <Icon name="calendar times"></Icon>
              {moment(opportunity.date).format("DD MMM YYYY")}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Icon name="map marker alternate"></Icon>
              {opportunity.location}
            </Grid.Column>
            <Grid.Column textAlign="right">{opportunity.type}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Link to={`/company-profile/${opportunity.user_id}`}>
        <Header as="h2" color="blue">
          <Icon name="building outline"></Icon>
          Company Name:{opportunity.company_name}
        </Header>
      </Link>

      <Item.Group>
        <Item.Description as="h4">
          <Icon name="address card outline" color="blue"></Icon>
          <span style={{ color: "rgb(92, 175, 239)" }}>
            Contact Name:{" "}
          </span>{" "}
          {opportunity.contact_person}
        </Item.Description>

        <Item.Description as="h4">
          <Icon name="phone square" color="blue"></Icon>
          <span style={{ color: "rgb(92, 175, 239)" }}>Phone Number: </span>
          {opportunity.telephone}
        </Item.Description>
        <Item.Description as="h4">
          <Icon name="mail" color="blue"></Icon>
          <span style={{ color: "rgb(92, 175, 239)" }}>Email: </span>{" "}
          {opportunity.email} {"  "}
          <a href={`mailto: ${opportunity.email}`}>
            <Icon name="send" color="blue"></Icon>
          </a>
        </Item.Description>
        <Item.Description as="h4">
          <Icon name="check" color="blue"></Icon>
          <span style={{ color: "rgb(92, 175, 239)" }}>
            {" "}
            Required Skills:{" "}
          </span>{" "}
          {opportunity.skills &&
            opportunity.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
        </Item.Description>
      </Item.Group>
      <Item.Description
        style={{
          backgroundColor: "rgb(137, 193, 236)",
          padding: "12px"
        }}
      >
        <span>
          <strong>opportunity Description:</strong>
        </span>
        <br></br>
        {opportunity.description}
      </Item.Description>
    </React.Fragment>
  );
};
