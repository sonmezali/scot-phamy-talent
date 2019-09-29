import React from "react";
import { getAllApplicants, getSkillsByApplicantId } from "../api/applicants";
import { Link } from "react-router-dom";
import ApplicantsCard from "./ApplicantsCard";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import { Grid, Header, Dropdown, Form, Icon } from "semantic-ui-react";
import {
  filterBySkills,
  filterByCity,
  filteredByCityAndSkills
} from "../utils/filterOpportunities";
const filteredApplicantsList = ({
  applicantsList,
  selectedSkills,
  selectedCity
}) => {
  const skills = selectedSkills && selectedSkills.length;
  const cities = selectedCity && selectedCity.length;
  if (skills && !cities) {
    return filterBySkills(applicantsList, selectedSkills);
  }
  if (!skills && cities) {
    return filterByCity(applicantsList, selectedCity);
  }
  if (skills && cities) {
    return filteredByCityAndSkills(
      applicantsList,
      selectedCity,
      selectedSkills
    );
  }
  return applicantsList;
};
export default class ApplicantsList extends React.Component {
  state = {
    applicantsList: [],
    skills: [],
    selectedSkills: [],
    selectedCity: [],
    cities: []
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
  getAllCities = () => {
    getCities().then(response => {
      this.setState({
        cities: response.map(city => ({
          key: city.id,
          text: city.city,
          value: city.city,
          content: city.city
        }))
      });
    });
  };
  componentDidMount() {
    this.getAllCities();
    this.getAllSkills();
    getAllApplicants().then(res => {
      res &&
        res.map(applicant => {
          return getSkillsByApplicantId(applicant.applicant_id).then(
            skillsData => {
              const skills =
                skillsData && skillsData.map(result => result && result.skill);
              this.setState({
                applicantsList: [
                  ...this.state.applicantsList,
                  { skills, ...applicant, location: applicant.city }
                ]
              });
            }
          );
        });
    });
  }
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      selectedSkills: selectedSkill
    });
  };
  handleSelectCity = (e, data) => {
    const city = data.value;
    this.setState({
      selectedCity: city
    });
  };
  render() {
    const {
      selectedSkills,
      applicantsList,
      skills,
      cities,
      selectedCity
    } = this.state;

    return (
      <div>
        <Form>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Header as="h4">
                <Icon name="check" size="large" color="blue" />
                <Header.Content>
                  Skills{" "}
                  <Dropdown
                    onChange={this.handleSelectSkill}
                    options={skills}
                    multiple
                    placeholder="Select skills"
                  />
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">
                <Icon name="map marker alternate" size="large" color="blue" />
                <Header.Content>
                  City{" "}
                  <Dropdown
                    onChange={this.handleSelectCity}
                    options={cities}
                    multiple
                    placeholder="Select City"
                  />
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid>
        </Form>
        <Grid stackable>
          <Grid.Row columns={3} stretched>
            {filteredApplicantsList({
              applicantsList,
              selectedSkills,
              selectedCity
            }).map(
              applicant =>
                applicant &&
                applicant.application_status === "approved" && (
                  <Grid.Column
                    key={applicant.applicant_id}
                    as={Link}
                    to={`/applicant-profile/${applicant.applicant_id}`}
                  >
                    <ApplicantsCard {...applicant} />
                    <br></br>
                  </Grid.Column>
                )
            )}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
