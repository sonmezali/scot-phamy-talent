import React, { Component } from "react";
import {
  Grid,
  Header,
  Input,
  Message,
  Dropdown,
  Form,
  Icon,
  Modal,
  Button,
  Divider
} from "semantic-ui-react";
import { deleteOpportunityAndConnectedSkills } from "../../api/opportunities";
import { getOpportunitiesForList, getSkillsList } from "../../api/opportunities";
import { getSkills } from "../../api/skills";
import { getCities } from "../../api/cities";
import OpportunityTypeFilters from "./OpportunityTypeFilters";
import { filterOpportunities } from "../../utils/filterOpportunities";
import OpportunityCard from "./OpportunityCard";
import { Link } from "react-router-dom";
import { getLoggedInUserData } from "../../utils/storage";

class OpportunitiesList extends Component {
  state = {
    selectedCity: [],
    searchKeyWord: "",
    selectedJobType: "",
    opportunitiesList: [],
    selectedOpportunity: "",
    cities: [],
    skills: [],
    selectedSkills: [],
    askToLogIn: false,
    openDeleteMsg: false,
    askDeletePermission: false,
    selectedId: null
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
  handleEditOpportunity = () => {
    return "/company/manage-profile";
  };
  handleClose = () => {
    this.setState({ askToLogIn: false });
  };
  handleClickOnOpportunity = e => {
    !getLoggedInUserData() && this.setState({ askToLogIn: true });
  };
  ConfirmDelete = id => {
    this.setState({
      selectedId: id,
      askDeletePermission: true,
      openDeleteMsg: true
    });
  };
  handleDeleteOpportunity = id => {
    deleteOpportunityAndConnectedSkills(id).then(data => {
      if (data.deleted) {
        this.setState({ openDeleteMsg: false });
        return this.getOpportunitiesForCompanyProfileByCompanyId();
      }
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
      selectedSkills,
      openDeleteMsg,
      askDeletePermission,
      selectedId
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
                    scrolling
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
                    scrolling
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
                onClick={this.handleClickOnOpportunity}
              >
                <OpportunityCard
                  opportunity={opportunity}
                  cardButtons={
                    getLoggedInUserData() &&
                    Number(opportunity.user_id) ===
                      Number(getLoggedInUserData().user.user_id)
                      ? true
                      : false
                  }
                  ConfirmDelete={this.ConfirmDelete}
                  handleEditOpportunity={this.handleEditOpportunity(
                    opportunity.opportunity_id
                  )}
                />
                <br></br>
              </Grid.Column>
            ))}
            <Divider></Divider>
          </Grid.Row>
        </Grid>
        {this.state.askToLogIn && (
          <Modal
            open={this.state.askToLogIn}
            onClose={this.handleClose}
            closeIcon
            basic
            size="small"
          >
            <Modal.Header>
              {" "}
              Log In First to View the opportunity Details{" "}
            </Modal.Header>
            <Modal.Actions>
              <Button
                color="blue"
                icon="sign in"
                labelPosition="right"
                content="Sign In"
                onClick={this.handleClose}
                as={Link}
                to="/"
              />
            </Modal.Actions>
          </Modal>
        )}
        {askDeletePermission && (
          <Modal
            open={openDeleteMsg}
            onClose={this.handleClose}
            closeIcon
            basic
            size="small"
          >
            <Header
              icon="warning sign"
              color="yellow"
              content="Are You Sure You Want To Delete Opportunity"
            />
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => this.setState({ openDeleteMsg: false })}
                inverted
              >
                No
              </Button>
              <Button
                color="red"
                inverted
                onClick={() => this.handleDeleteOpportunity(selectedId)}
              >
                <Icon name="remove" /> Delete
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    );
  }
}

export default OpportunitiesList;
