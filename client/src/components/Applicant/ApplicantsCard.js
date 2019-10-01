import React from "react";
import { Card, Icon, Divider, Button } from "semantic-ui-react";

export default ({
  applicant_name,
  city,
  skills,
  adminOptions,
  handleApprove
}) => (
  <Card centered raised color="blue">
    <Card.Content>
      <Card.Header textAlign="left">
        <Icon size-="large" name="user outline"></Icon>
        Applicant Name: {applicant_name}
      </Card.Header>
      {city && (
        <Card.Content textAlign="left">
          <Icon name="map marker alternate" size="large" color="blue" />
          City: {city}
        </Card.Content>
      )}
      {skills && (
        <Card.Content>
          <Icon name="check" size="large" color="blue" />
          Skills:
          {skills &&
            skills.map((skill, index) => (
              <Card.Content key={index} textAlign="left">
                {skill}
              </Card.Content>
            ))}
        </Card.Content>
      )}
      {adminOptions && (
        <Card.Content extra>
          <Divider></Divider>
          <div className="ui two buttons">
            <Button basic color="green" onClick={handleApprove}>
              Approve
            </Button>
            <Button basic color="red">
              Deny
            </Button>
          </div>
        </Card.Content>
      )}
    </Card.Content>
  </Card>
);
