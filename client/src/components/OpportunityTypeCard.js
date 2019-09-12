import React, { Component } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";

export default class OpportunityTypeCard extends Component {
  render() {
    const { selectedJobType, handelSelectJobType } = this.props;
    return (
      <Grid columns={6} centered>
        <Grid.Column
          mobile={5}
          tablet={5}
          computer={2}
          textAlign="center"
          onClick={() => handelSelectJobType("Full time")}
          style={
            selectedJobType === "Full time"
              ? { backgroundColor: "lightGrey" }
              : null
          }
        >
          <Icon name="briefcase" size="large" color="blue" />
          <Header as="h4"> Full time</Header>
        </Grid.Column>
        <Grid.Column
          mobile={5}
          tablet={5}
          computer={2}
          textAlign="center"
          onClick={() => handelSelectJobType("Volunteer")}
          style={
            selectedJobType === "Volunteer"
              ? { backgroundColor: "lightGrey" }
              : null
          }
        >
          <Icon name="hand paper" size="large" color="blue" />
          <Header as="h4"> Volunteer</Header>
        </Grid.Column>
        <Grid.Column
          mobile={5}
          tablet={5}
          computer={2}
          textAlign="center"
          onClick={() => handelSelectJobType("Internship")}
          style={
            selectedJobType === "Internship"
              ? { backgroundColor: "lightGrey" }
              : null
          }
        >
          <Icon name="handshake outline" size="large" color="blue" />
          <Header as="h4"> Internship</Header>
        </Grid.Column>

        <Grid.Column
          mobile={5}
          tablet={5}
          computer={2}
          textAlign="center"
          onClick={() => handelSelectJobType("Part time")}
          style={
            selectedJobType === "Part time"
              ? { backgroundColor: "lightGrey" }
              : null
          }
        >
          <Icon name="chart pie" size="large" color="blue" />
          <Header as="h4"> Part time</Header>
        </Grid.Column>
        <Grid.Column
          mobile={5}
          tablet={5}
          computer={2}
          textAlign="center"
          onClick={() => handelSelectJobType("Apprenticeship")}
          style={
            selectedJobType === "Apprenticeship"
              ? { backgroundColor: "lightGrey" }
              : null
          }
        >
          <Icon name="certificate" size="large" color="blue" />
          <Header as="h5"> Apprenticeship</Header>
        </Grid.Column>
        <Grid.Column
          mobile={5}
          tablet={5}
          computer={2}
          textAlign="center"
          onClick={() => handelSelectJobType("Work Experience")}
          style={
            selectedJobType === "Work Experience"
              ? { backgroundColor: "lightGrey" }
              : null
          }
        >
          <Icon name="chart pie" size="large" color="blue" />
          <Header as="h4"> Work experience</Header>
        </Grid.Column>
      </Grid>
    );
  }
}
