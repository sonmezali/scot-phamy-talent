import React, { Component } from "react";
import {
  Grid,
  Header,
  Input,
  Message,
  Dropdown,
  Form,
  Icon,
  Divider
} from "semantic-ui-react";
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import OpportunityTypeFilters from "./OpportunityTypeFilters";
import filterOpportunities from "../utils/filterOpportunities";
import OpportunityCard from "./OpportunityCard";
import { Link } from "react-router-dom";

class OpportunitiesList extends Component {
  state = {
    selectedCity: [],
    searchKeyWord: "",
    selectedJobType: "",
    opportunitiesList: [],
    selectedOpportunity: "",
    cities: [],
    skills: [],
    selectedSkills: []
  };
  // Get data
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
  // get the opportunities array
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
    this.getOpportunities();
    this.getAllCities();
    this.getAllSkills();
  }
  // handlers
  handelSelectJobType = name => this.setState({ selectedJobType: name });

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
  handleChangeSearchKeyWord = e => {
    const searchKeyWord = e.target.value;
    this.setState({
      ...this.state,
      searchKeyWord: searchKeyWord
    });
  };

  render() {
    const {
      searchKeyWord,
      cities,
      skills,
      selectedCity,
      selectedJobType,
      opportunitiesList,
      selectedSkills
    } = this.state;
    const filteredOpportunities = filterOpportunities({
      selectedCity,
      searchKeyWord,
      selectedJobType,
      opportunitiesList,
      selectedSkills
    });
    return (
      <div>
        <Form>
          <Input
            fluid
            style={{ color: "rgb(22, 135, 219)" }}
            placeholder="What are you looking for ?"
            value={searchKeyWord}
            name="search"
            icon="search"
            onChange={this.handleChangeSearchKeyWord}
          />
          <br />
          <Grid stackable columns={2}>
            <Grid.Column>
              <Header as="h4">
                <Icon name="map marker alternate" size="large" color="blue" />
                <Header.Content>
                  Location{" "}
                  <Dropdown
                    inline
                    header="Location"
                    options={cities}
                    multiple
                    onChange={this.handleSelectCity}
                    placeholder="Search city"
                  />
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">
                <Icon name="check" size="large" color="blue" />
                <Header.Content>
                  Skills{" "}
                  <Dropdown
                    inline
                    header="SKills"
                    onChange={this.handleSelectSkill}
                    options={skills}
                    onClose={this.filteringOpportunitiesBySkills}
                    multiple
                    placeholder="Select skills"
                  />
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid>
        </Form>
        <Header textAlign="left">Job Type</Header>

        <OpportunityTypeFilters
          handelSelectJobType={this.handelSelectJobType}
          selectedJobType={selectedJobType}
        />
        <Divider />
        <br />
        {!filteredOpportunities.length ? (
          <Message negative>
            <Message.Header>
              No matching opportunities to display.
            </Message.Header>
            <p> Please change your search criteria and try again</p>
          </Message>
        ) : null}
        <Grid stackable>
          <Grid.Row columns={3} stretched>
            {filteredOpportunities.map(opportunity => (
              <Grid.Column
                key={opportunity.opportunity_id}
                as={Link}
                to={{
                  pathname: `/opportunities/id`,
                  state: { opportunityId: opportunity.opportunity_id }
                }}
              >
                <OpportunityCard opportunity={opportunity} />
                <br></br>
              </Grid.Column>
            ))}
            <Divider></Divider>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default OpportunitiesList;
