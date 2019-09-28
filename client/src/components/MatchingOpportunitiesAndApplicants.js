import React, { Component } from "react";
import { Grid, Divider } from "semantic-ui-react";
import { getSkillsList } from "../api/opportunities";
import { getLoggedInUserData } from "../utils/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import OpportunityCard from "./OpportunityCard";
import { getOpportunitiesByCompanyId } from "../api/opportunities";

class MatchingOpportunitiesAndApplicant extends Component {
  state = {
    opportunitiesList: []
  };

  getOpportunitiesForCompanyProfileByCompanyId = () => {
    const userId = getLoggedInUserData() && getLoggedInUserData().user.user_id; // will get company id from company login
    getOpportunitiesByCompanyId(userId).then(data =>
      data.forEach(opportunity => {
        getSkillsList(opportunity.opportunity_id).then(data => {
          const skills = data && data.map(result => result && result.skill);
          this.setState({
            opportunitiesList: [
              ...this.state.opportunitiesList,
              { ...opportunity, skills }
            ]
          });
        });
      })
    );
  };

  componentDidMount() {
    this.getOpportunitiesForCompanyProfileByCompanyId();
  }

  render() {
    console.log("skills", this.props.skills);
    const { opportunitiesList } = this.state;
    console.log("array", this.state.opportunitiesList);

    return (
      <Grid stackable>
        <Grid.Row columns={3} stretched>
          {opportunitiesList &&
            opportunitiesList.map(opportunity => {
              const matching = opportunity.skills.filter(skill => {
                const matchingSkills =
                  this.props.skills && this.props.skills.includes(skill);
                return matchingSkills;
              }).length;
              const percentage = (
                (matching / opportunity.skills.length) *
                100
              ).toFixed(2);
              return (
                <Grid.Column key={opportunity.opportunity_id}>
                  <OpportunityCard opportunity={opportunity} />

                  <br></br>
                  <CircularProgressbar
                    strokeWidth
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </Grid.Column>
              );
            })}
          <Divider></Divider>
        </Grid.Row>
      </Grid>
    );
  }
}

export default MatchingOpportunitiesAndApplicant;
