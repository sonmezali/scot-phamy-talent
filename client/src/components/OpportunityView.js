import React, { Component } from "react";
import { getOpportunityById, getSkillsList } from "../api/opportunities";
import { Header, Grid, Segment, Card, Item } from "semantic-ui-react";
import moment from "moment";
export default class OpportunityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunityId: null,
      opportunity: [],
      skills: []
    };
  }
  componentWillMount() {
    const { pathname } = window.location;
    this.setState({
      opportunityId: pathname && pathname.replace("/opportunities/", "")
    });
  }
  getOpportunity = () => {
    getOpportunityById(this.state.opportunityId).then(data =>
      this.setState({ opportunity: data[0] })
    );
  };
  getSkills = () => {
    getSkillsList(this.state.opportunityId).then(data => {
      const skillsArray = data.map(skill => skill.skill);
      this.setState({
        opportunity: { ...this.state.opportunity, skills: skillsArray }
      });
    });
  };
  componentDidMount() {
    this.getOpportunity();
    this.getSkills();
  }
  render() {
    const { opportunity } = this.state;
    console.log("id===>", this.state.opportunityId);
    return (
      <React.Fragment>
        <Segment>
          <Header textAlign="center" as="h1">
            {" "}
            {opportunity.opportunity_title}
          </Header>
          <Grid>
            <Grid.Column floated="left" width={4}>
              {opportunity.location}
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              {moment(opportunity.date).format("MMM Do YY")}
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
