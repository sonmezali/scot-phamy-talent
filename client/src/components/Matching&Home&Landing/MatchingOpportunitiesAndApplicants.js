import React from "react";
import { Grid, Card } from "semantic-ui-react";
import { getLoggedInUserData } from "../../utils/storage";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const compare = (a, b) => {
  const genreA = Number(a.percentage);
  const genreB = Number(b.percentage);
  let comparison = 0;
  if (genreA < genreB) {
    comparison = 1;
  } else if (genreA > genreB) {
    comparison = -1;
  }
  return comparison;
};
export default ({ opportunitiesList }) => {
  return (
    <Grid stackable>
      <Grid.Row columns={3} stretched>
        {opportunitiesList.sort(compare).map(opportunity => {
          return (
            <Grid.Column>
              {" "}
              <Card
                fluid
                color={opportunity.percentage > 60 ? "green" : "red"}
                key={opportunity.opportunity_id}
                as={Link}
                to={
                  getLoggedInUserData() &&
                  `/opportunities/${opportunity.opportunity_id}`
                }
              >
                <Card.Content>
                  <Card.Header textAlign="center">
                    {opportunity.opportunity_title}
                  </Card.Header>
                  <Card.Description>{opportunity.description}</Card.Description>
                  <br />
                  <Card.Content style={{ width: "100px" }}>
                    <CircularProgressbarWithChildren
                      value={opportunity.percentage}
                      text={`${opportunity.percentage}%`}
                    >
                      <div style={{ fontSize: 12, marginTop: -5 }}></div>
                    </CircularProgressbarWithChildren>
                  </Card.Content>
                </Card.Content>
              </Card>
              <br />
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
  );
};
