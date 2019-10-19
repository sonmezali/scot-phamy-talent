import React from "react";
import { getAllApplicants, getSkillsByApplicantId } from "../../api/applicants";
import { Link } from "react-router-dom";
import ApplicantsCard from "./ApplicantsCard";
import { getSkills } from "../../api/skills";
import { getCities } from "../../api/cities";
import { Grid, Header, Dropdown, Form, Icon } from "semantic-ui-react";
import {
  filterBySkills,
  filterByCity,
  filteredByCityAndSkills
} from "../../utils/filterOpportunities";
import { getLoggedInUserData } from "../../utils/storage";
import { getOpportunitiesByCompanyId } from "../../api/opportunities";
import { getSkillsList } from "../../api/opportunities";

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
    cities: [],
    opportunitiesList: []
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
  getOpportunitiesForCompanyProfileByCompanyId = () => {
    const userId = getLoggedInUserData() && getLoggedInUserData().user.user_id; // will get company id from company login
    return getOpportunitiesByCompanyId(userId).then(data =>
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
  getAllApplicants = () => {
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
                  {
                    skills,
                    ...applicant,
                    location: applicant.city
                  }
                ]
              });
            }
          );
        });
    });
  };
  componentDidMount() {
    this.getAllCities();
    this.getAllSkills();
    this.getAllApplicants();
    this.getOpportunitiesForCompanyProfileByCompanyId();
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
          <Grid columns={2} stackable>
            <Grid.Column>
              <Header as="h4">
                <Icon name="check" size="large" color="blue" />
                <Header.Content>
                  Skills{" "}
                  <Dropdown
                    onChange={this.handleSelectSkill}
                    options={skills}
                    multiple
                    scrolling
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
                    scrolling
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
            }).map(applicant => {
              const applicantSkills = applicant.skills;
              const opportunities = this.state.opportunitiesList;
              const matchingPercentage = opportunities.map(opportunity => {
                const matchingSkills = opportunity.skills.filter(skill => {
                  const x = applicantSkills.filter(applicantSkill => {
                    if (applicantSkill.includes(skill)) {
                      return applicantSkill;
                    }
                  });
                  return x.length && x.length;
                });
                const percentage =
                  (matchingSkills.length / opportunity.skills.length) * 100;
                return Number(percentage.toFixed(2));
              });
              const overAllPercentage = (
                matchingPercentage.reduce((a, b) => a + b, 0) /
                opportunities.length
              ).toFixed(0);
              return (
                applicant &&
                applicant.application_status === "approved" && (
                  <Grid.Column
                    key={applicant.applicant_id}
                    as={Link}
                    to={`/applicant-profile/${applicant.applicant_id}`}
                  >
                    <ApplicantsCard
                      {...applicant}
                      overAllPercentage={overAllPercentage}
                    />
                    <br></br>
                  </Grid.Column>
                )
              );
            })}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
