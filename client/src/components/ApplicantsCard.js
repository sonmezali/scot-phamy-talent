import React from "react";
import { Grid, Icon, Card } from "semantic-ui-react";

export default ({ applicant_name, city, skills }) => (
  <Card centered raised color="blue">
    <Card.Content>
      <Card.Header textAlign="left">
        Applicant Name: {applicant_name}
      </Card.Header>
      <Card.Content textAlign="left">City: {city}</Card.Content>
      <Card.Content>
        Skills:
        {skills.map(skill => (
          <Card.Content textAlign="left"> {skill}</Card.Content>
        ))}
      </Card.Content>
    </Card.Content>
  </Card>
);
