import React, { Component } from "react";
import { getAllApplicants, getSkillsByApplicantId } from "../api/applicants";
import ApplicantsCard from "./ApplicantsCard";
import { getSkills } from "../api/skills";
import { Grid, Header, Dropdown, Form, Icon } from "semantic-ui-react";
export default class ApplicantsList extends React.Component {
  state = {
    applicantsList: [],
    skills: [],
    selectedSkills: []
  };
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skills: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.name,
          content: skill.name
        }))
      });
    });
  };

  componentDidMount() {
    this.getAllSkills();
    getAllApplicants().then(res => {
      res.map(applicant => {
        getSkillsByApplicantId(applicant.applicant_id).then(skillsData => {
          const skills =
            skillsData && skillsData.map(result => result && result.skill);

          this.setState({
            applicantsList: [
              ...this.state.applicantsList,
              { skills, ...applicant }
            ]
          });
        });
      });
    });
  }
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      selectedSkills: selectedSkill
    });
  };
  render() {
    console.log(this.state.selectedSkills);
    return (
      <div>
        <Form>
          <Grid.Column>
            <Header as="h4">
              <Icon name="check" size="large" color="blue" />
              <Header.Content>
                Skills{" "}
                <Dropdown
                  inline
                  header="SKills"
                  onChange={this.handleSelectSkill}
                  options={this.state.skills}
                  onClose={this.filteringOpportunitiesBySkills}
                  multiple
                  placeholder="Select skills"
                />
              </Header.Content>
            </Header>
          </Grid.Column>
        </Form>
        {this.state.applicantsList.map(applicant => (
          <ApplicantsCard {...applicant} key={applicant.applicant_id} />
        ))}
      </div>
    );
  }
}
