import React from "react";
import { Card } from "semantic-ui-react"

export default ({ applicant_name, city, skills }) => (
  <Card centered raised color="blue">
    <Card.Content>
      <Card.Header textAlign="left">
        <Icon size-="large" name="user outline"></Icon>
        Applicant Name: {applicant_name}
      </Card.Header>
      <Card.Content textAlign="left">
        <Icon name="map marker alternate" size="large" color="blue" />
        City: {city}
      </Card.Content>
      <Card.Content>
        <Icon name="check" size="large" color="blue" />
        Skills:
        {skills.map((skill, index) => (
          <Card.Content key={index} textAlign="left">
            {skill}
          </Card.Content>
        ))}
      </Card.Content>
    </Card.Content>
  </Card>
);
