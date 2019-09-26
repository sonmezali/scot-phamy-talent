import React, { Component } from "react";
import { Card } from "semantic-ui-react";
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

  render() {
    console.log("applicantSkills", this.state.applicantSkills);
    console.log("opportunitiesList", this.state.opportunitiesList);

    return (
      <div>
        {this.state.opportunitiesList.map(opportunity => {
          const matching = opportunity.skills.filter(skill => {
            const matchingSkills = this.state.applicantSkills.includes(skill);
            return matchingSkills;
          }).length;
          const percentage = (
            (matching / opportunity.skills.length) *
            100
          ).toFixed(2);
          return (
            <Card
              key={opportunity.opportunity_id}
              as={Link}
              to={
                getLoggedInUserData() &&
                `/opportunities/${opportunity.opportunity_id}`
              }
            >
              <Card.Content>
                <Card.Header>{opportunity.opportunity_title}</Card.Header>
                <Card.Description>{opportunity.description}</Card.Description>
                <CircularProgressbarWithChildren
                  strokeWidth
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    strokeLinecap: "butt"
                  })}
                >
                  {percentage > 60 ? (
                    <img
                      style={{ width: 50, marginTop: -180 }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRePtynQytlAevO-zkIk1hJHVWGr0LmbNhm7MSbUIz63g3puHya"
                      alt="cherry"
                    />
                  ) : null}

                  <div style={{ fontSize: 12, marginTop: -5 }}></div>
                </CircularProgressbarWithChildren>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default MatchingApplicantsAndOppotunities;
