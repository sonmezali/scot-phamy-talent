import React, { Component } from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkillsByApplicantId } from "../api/applicants";
import { getLoggedInUserData } from "../utils/storage";
import {
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class MatchingApplicantsAndOppotunities extends Component {
  state = {
    applicantSkills: [],
    opportunitiesList: []
  };

  getApplicantSkills = () => {
    const userId = getLoggedInUserData().user.user_id;
    getSkillsByApplicantId(userId).then(data => {
      const skillsArray = data.map(skill => skill.skill);
      this.setState({
        applicantSkills: skillsArray,
        isLoading: false
      });
    });
  };

  getOpportunities = () => {
    getOpportunitiesForList().then(data =>
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
    this.getApplicantSkills();
    this.getOpportunities();
  }
  compare = (a, b) => {
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

  render() {
    const matchingOpportunities = this.state.opportunitiesList
      .map(opportunity => {
        const matching = opportunity.skills.filter(skill => {
          const matchingSkills = this.state.applicantSkills.includes(skill);
          return matchingSkills;
        }).length;
        const percentage = (
          (matching / opportunity.skills.length) *
          100
        ).toFixed(0);
        return { ...opportunity, percentage };
      })
      .sort(this.compare);

    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          {matchingOpportunities.map(opportunity => {
            return (
              <Grid.Column>
                {" "}
                <Card
                  fluid
                  color={opportunity.percentage > 66 ? "green" : "red"}
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
                    <Card.Description>
                      {opportunity.description}
                    </Card.Description>
                    <Card.Content textAlign="right" style={{ width: "100px" }}>
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
  }
}

export default MatchingApplicantsAndOppotunities;
