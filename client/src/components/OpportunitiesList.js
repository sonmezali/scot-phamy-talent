import React, { Component } from "react";
import {
  Grid,
  Header,
  Input,
  Dropdown,
  Form,
  Icon,
  Card,
  Image,
  Divider
} from "semantic-ui-react";
import moment from "moment";
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import { Link } from "react-router-dom";
import filterOpportunities from "../utils/filterOpportunities";

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
  handleItemClick = name => this.setState({ selectedJobType: name });

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
    return (
      <div>
        <Form>
          <Form.Field
            control={Input}
            placeholder="What are you looking for ?"
            value={searchKeyWord}
            name="search"
            iconPosition="right"
            onChange={this.handleChangeSearchKeyWord}
          >
            <Icon name="search" color="blue" />
            <input />
          </Form.Field>

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
        </Form>
        <Header textAlign="left">Job Type</Header>

        <Grid columns={3} centered>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Full time")}
              style={
                this.state.selectedJobType === "Full time"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="briefcase" size="large" color="blue" />
              <Header as="h4"> Full time</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Volunteer")}
              style={
                this.state.selectedJobType === "Volunteer"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="hand paper" size="large" color="blue" />
              <Header as="h4"> Volunteer</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Internship")}
              style={
                this.state.selectedJobType === "Internship"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="handshake outline" size="large" color="blue" />
              <Header as="h4"> Internship</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Part time")}
              style={
                this.state.selectedJobType === "Part time"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="chart pie" size="large" color="blue" />
              <Header as="h4"> Part time</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Apprenticeship")}
              style={
                this.state.selectedJobType === "Apprenticeship"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="certificate" size="large" color="blue" />
              <Header as="h5"> Apprenticeship</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Work Experience")}
              style={
                this.state.selectedJobType === "Work Experience"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="chart pie" size="large" color="blue" />
              <Header as="h4"> Work experience</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider>
          <br></br>
        </Divider>
        <br />
        <Grid stackable>
          <Grid.Row columns={3} stretched>
            {filterOpportunities({
              selectedCity,
              searchKeyWord,
              selectedJobType,
              opportunitiesList,
              selectedSkills
            }).map((opportunity, index) => (
              <Grid.Column>
                <Card
                  centered
                  key={index}
                  raised
                  color="blue"
                  as={Link}
                  to={`/opportunities/${opportunity.opportunity_id}`}
                >
                  <Card.Content>
                    <Card.Header>{opportunity.opportunity_title}</Card.Header>
                    <Card.Content textAlign="left">
                      contact Person: {opportunity.contact_person}
                    </Card.Content>
                    <Card.Meta textAlign="right">
                      <Icon name="calendar times" color="red"></Icon>
                      {moment(opportunity.date).format("DD MMM YYYY")}{" "}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Card.Description
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                      }}
                    >
                      {opportunity.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
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
