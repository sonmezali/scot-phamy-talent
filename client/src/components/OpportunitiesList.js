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
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import { Link } from "react-router-dom";

class OpportunitiesList extends Component {
  state = {
    searchKeyWord: "",
    selectedJobType: "",
    OpportunitiesList: [],
    selectedOpportunity: "",
    cities: [],
    skills: [],
    selectedSkills: [],
    filteredResult: [],
    filtering: false
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
            OpportunitiesList: [
              ...this.state.OpportunitiesList,
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
    const selectedCity = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, city: selectedCity }
    });
  };
  filteringOpportunitiesBySkills = () => {
    const filteredBySkills = this.state.OpportunitiesList.filter(opportunity =>
      this.state.selectedSkills.some(skill =>
        opportunity.skills.includes(skill)
      )
    ).filter(opportunity => this.state.selectedJobType === opportunity.type);
    this.setState({
      filteredResult: filteredBySkills,
      filtering: true
    });
  };
  render() {
    console.log(this.state.selectedOpportunity);
    const { searchKeyWord, cities, skills } = this.state;
    return (
      <div>
        <Form>
          <Form.Field
            control={Input}
            placeholder="What are you looking for ?"
            value={searchKeyWord}
            name="search"
            iconPosition="right"
            onChange={this.handleChange}
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
                onChange={this.handleSelectSkill}
                options={cities}
                multiple
                defaultValue="Glasgow"
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
                defaultValue="JavaScript"
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
            >
              <Icon name="briefcase" size="large" color="blue" />
              <Header as="h4"> Full time</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Volunteer")}
            >
              <Icon name="hand paper" size="large" color="blue" />
              <Header as="h4"> Volunteer</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Internship")}
            >
              <Icon name="handshake outline" size="large" color="blue" />
              <Header as="h4"> Internship</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Part Time")}
            >
              <Icon name="chart pie" size="large" color="blue" />
              <Header as="h4"> Part Time</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Apprenticeship")}
            >
              <Icon name="certificate" size="large" color="blue" />
              <Header as="h5"> Apprenticeship</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Work Experience")}
            >
              <Icon name="chart pie" size="large" color="blue" />
              <Header as="h4"> Work Experience</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider>
          <br></br>
        </Divider>
        <br />
        <Grid>
          {this.state.OpportunitiesList.map((opportunity, index) => (
            <Card
              centered
              key={index}
              raised
              color="blue"
              onClick={() =>
                this.props.getOpportunityId(opportunity.opportunity_id)
              }
              name={opportunity.opportunity_id}
              as={Link}
              to="/opportunity"
            >
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  name={opportunity.opportunity_id}
                >
                  <Icon
                    name="ellipsis vertical"
                    color="blue"
                    onClick={this.handleSelectOpportunity}
                  ></Icon>
                </Image>
                <Card.Header>{opportunity.opportunity_title}</Card.Header>
                <Card.Content textAlign="left">
                  contact Person: {opportunity.contact_person}
                </Card.Content>
                <Card.Meta textAlign="left">
                  Expire at:{opportunity.date}{" "}
                </Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>{opportunity.description}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid>
      </div>
    );
  }
}

export default OpportunitiesList;
