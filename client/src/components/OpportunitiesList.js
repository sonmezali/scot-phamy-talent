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
  Button,
  Image,
  Modal
} from "semantic-ui-react";
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";

class OpportunitiesList extends Component {
  state = {
    searchKeyWord: "",
    selectedJobType: "",
    OpportunitiesList: [],
    selectedOpportunity: "",
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
  handleItemClick = (e, { name }) => this.setState({ selectedJobType: name });

  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, skills: selectedSkill }
    });
  };
  handleSelectOpportunity = e => {
    const selectedOpportunityId = e.target.name;
    this.setState({
      selectedOpportunity: selectedOpportunityId
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, city: selectedCity }
    });
  };

  render() {
    const {
      searchKeyWord,
      selectedJobType,
      OpportunitiesList,
      selectedOpportunity,
      cities,
      skills
    } = this.state;
    console.log(searchKeyWord, selectedOpportunity);
    console.log(this.state.OpportunitiesList);
    return (
      <Container>
        <Form>
          <Form.Field
            control={Input}
            placeholder="What are you looking for ?"
            value={searchKeyWord}
            name="search"
            iconPosition="right"
            onChange={this.handleChange}
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
                options={cities}
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
                multiple
                selection
                options={skills}
                defaultValue="JavaScript"
              />
            </Header.Content>
          </Header>
        </Form>
        <Header textAlign="left">Job Type</Header>
        <Menu compact icon="labeled">
          <Menu.Item
            name="volunteer"
            active={selectedJobType === "volunteer"}
            onClick={this.handleItemClick}
          >
            <Icon name="hand paper" color="blue" />
            Volunteer
          </Menu.Item>

          <Menu.Item
            name="internship"
            active={selectedJobType === "internship"}
            onClick={this.handleItemClick}
          >
            <Icon name="handshake outline" color="blue" />
            Internship
          </Menu.Item>

          <Menu.Item
            name="full time"
            active={selectedJobType === "full time"}
            onClick={this.handleItemClick}
          >
            <Icon name="briefcase" color="blue" />
            Full Time
          </Menu.Item>
          <Menu.Item
            name="part time"
            active={selectedJobType === "part time"}
            onClick={this.handleItemClick}
          >
            <Icon name="chart pie" color="blue" />
            Part Time
          </Menu.Item>
          <Menu.Item
            name="work experience"
            active={selectedJobType === "work experience"}
            onClick={this.handleItemClick}
          >
            <Icon name="certificate" color="blue" />
            Work Experience
          </Menu.Item>
        </Menu>
        {this.state.OpportunitiesList.map((opportunity, index) => (
          <Card
            centered
            key={index}
            raised
            color="blue"
            onClick={this.handleSelectOpportunity}
            name={opportunity.opportunity_id}
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
        <Modal trigger={<Button>Scrolling Content Modal</Button>}>
          <Modal.Header>Profile Picture</Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              <Header>Modal Header</Header>
              <p>
                This is an example of expanded content that will cause the
                modal's dimmer to scroll
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name="chevron right" />
            </Button>
          </Modal.Actions>
        </Modal>{" "}
      </Container>
    );
  }
}

export default OpportunitiesList;
