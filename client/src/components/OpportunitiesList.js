import React, { Component } from "react";
import {
  Container,
  Header,
  Input,
  Dropdown,
  Menu,
  Form,
  Icon,
  Card,
  Image
} from "semantic-ui-react";
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";

class OpportunitiesList extends Component {
  state = {
    OpportunitiesList: [],
    opportunitySkills: [],
    cities: [],
    skills: []
  };
  // Get data
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skills: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.skill_id
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
  getOpportunities = () => {
    getOpportunitiesForList().then(data =>
      this.setState({ OpportunitiesList: data }).then(
        getSkillsList().then(data => {
          this.setState({ opportunitySkills: data });
        })
      )
    );
  };

  // SkillsList = () => {
  //   getSkillsList().then((data) => {
  //     this.setState({ opportunitySkills: data });
  //   });
  // };
  filterSkillsForEachId = opportunity_id => {
    const skillsssss = this.state.opportunitySkills
      .filter(skill => skill.id === opportunity_id)
      .map(skill => skill.skill);
    return skillsssss;
  };

  componentDidMount() {
    this.getOpportunities();
    this.SkillsList();
    this.getAllSkills();
    this.getAllCities();
    this.filterSkillsForEachId(5);
  }
  render() {
    console.log(this.filterSkillsForEachId(5));
    console.log(this.state.OpportunitiesList);
    return (
      <Container>
        <Form>
          <Form.Field
            control={Input}
            placeholder="What are you looking for ?"
            // value={}
            name="search"
            iconPosition="right"
            // onChange={this.handleChange}
          >
            <Icon name="search" />
            <input />
          </Form.Field>
          <Header as="h3">
            <Icon name="map marker alternate" size="big" color="blue" />
            <Header.Content>
              <Dropdown
                inline
                header="Select City"
                options={this.state.cities}
                defaultValue="Glasgow"
              />
            </Header.Content>
          </Header>
          <Header as="h3">
            <Icon name="check" size="big" color="blue" />
            <Header.Content>
              Skills {"   "}
              <Dropdown
                inline
                color="yellow"
                header="Select Skill"
                options={this.state.skills}
                defaultValue="JavaScript"
              />
            </Header.Content>
          </Header>
        </Form>
        <Header textAlign="left">Job Type</Header>
        <Menu compact icon="labeled">
          <Menu.Item
            name="gamepad"
            // onClick={this.handleItemClick
          >
            <Icon name="hand paper" color="blue" />
            Volunteer
          </Menu.Item>

          <Menu.Item
            name="video camera"
            // onClick={this.handleItemClick}
          >
            <Icon name="handshake outline" color="blue" />
            Internship
          </Menu.Item>

          <Menu.Item
            name="video play"
            // onClick={this.handleItemClick}
          >
            <Icon name="briefcase" color="blue" />
            Full Time
          </Menu.Item>
          <Menu.Item
            name="video play"
            // onClick={this.handleItemClick}
          >
            <Icon name="chart pie" color="blue" />
            Part Time
          </Menu.Item>
          <Menu.Item
            name="video play"
            // onClick={this.handleItemClick}
          >
            <Icon name="certificate" color="blue" />
            Work Experience
          </Menu.Item>
        </Menu>
        {this.state.OpportunitiesList.map((Opportunity, index) => (
          <Card centered key={index} raised color="blue">
            <Card.Content>
              <Image floated="right" size="mini">
                <Icon name="ellipsis vertical" color="blue" />
              </Image>
              <Card.Header>{Opportunity.opportunity_title}</Card.Header>
              <Card.Content textAlign="left">
                contact Person: {Opportunity.contact_person}
              </Card.Content>
              <Card.Meta textAlign="left">
                Expire at:{Opportunity.date}{" "}
              </Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Description>{Opportunity.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Container>
    );
  }
}

export default OpportunitiesList;
