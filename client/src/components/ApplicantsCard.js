import React from "react";
import { Icon, Card } from "semantic-ui-react";

export default ({
  applicant_name,
  city,
  cvlink,
  email,
  about,
  right_to_work
}) => (
  <Card centered raised color="blue">
    <Card.Content>
      <Card.Header> About: {about}</Card.Header>
      <Card.Content textAlign="left">
        Applicant Name: {applicant_name}
      </Card.Content>
      <Card.Content textAlign="left">City: {city}</Card.Content>
      <Card.Content textAlign="left">Link to CV: {cvlink}</Card.Content>
      <Card.Content textAlign="left">
        Right to work: {{ right_to_work } ? "Yes" : "No"}
      </Card.Content>
      <Card.Content textAlign="left">
        <Icon name="mail" color="red"></Icon>
        Email:{email}
      </Card.Content>
    </Card.Content>
  </Card>
);
