import React, { Component } from "react";
import { getopprtunityById, getSkillsList } from "../api/opportunities";
import { Header, Grid } from "semantic-ui-react";

export default class OpportunityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunityId: 1, //this.props.opportunityId,
      opportunity: [],
      skills: []
    };
  }

  getOpportunity = () => {
    getopprtunityById(this.state.opportunityId).then(data =>
      this.setState({ opportunity: data[0] })
    );
  };
  getSkills = () => {
    getSkillsList(this.state.opportunityId).then(data => {
      const skillsarray = data.map(skill => skill.skill);
      this.setState({
        opportunity: { ...this.state.opportunity, skills: skillsarray }
      });
    });
  };
  componentDidMount() {
    this.getOpportunity();
    this.getSkills();
  }
  render() {
    const { opportunity } = this.state;
    return (
      <Grid centered stackable columns={1}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header as="h1">{opportunity.opportunity_title}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <p> {opportunity.description}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <p> {opportunity.contact_person}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
