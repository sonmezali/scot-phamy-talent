import React, { Component } from "react";
import { getOpportunityById, getSkillsList } from "../api/opportunities";
import {
  Header,
  Grid,
  Segment,
  Icon,
  Item,
  Dimmer,
  Dropdown,
  Loader,
  Image
} from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
export default class OpportunityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunityId: null,
      opportunity: [],
      skills: [],
      isLoading: true,
      isEditing: false
    };
  }
  //Get data and Id
  componentWillMount() {
    const { pathname } = window.location;
    this.setState({
      opportunityId: pathname && pathname.replace("/opportunities/", "")
    });
  }
  getOpportunity = () => {
    getOpportunityById(this.state.opportunityId).then(data =>
      this.setState({ opportunity: data[0] })
    );
  };
  getSkills = () => {
    getSkillsList(this.state.opportunityId).then(data => {
      const skillsArray = data.map(skill => skill.skill);
      this.setState({
        opportunity: {
          ...this.state.opportunity,
          skills: skillsArray
        },
        isLoading: false
      });
    });
  };
  componentDidMount() {
    this.getOpportunity();
    this.getSkills();
  }

  //Handlers
  handleEdit = () => {
    this.setState({ isEditing: true });
  };
  handleIDeleteProfile = () => {
    console.log("delete"); // i mean to add this console.log to approve the button is functioning
  };
  render() {
    const token = localStorage.getItem("token");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const { opportunity, isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : (
          <React.Fragment>
            {token &&
            loggedInUser.role === "company" &&
            loggedInUser.user_id === opportunity.user_id ? (
              <Grid>
                <Grid.Column floated="right" width={3}>
                  <Dropdown item size="large" icon="options">
                    <Dropdown.Menu direction="left">
                      <Dropdown.Item name="Edit" onClick={this.handleEdit}>
                        <Icon size-="large" name="edit outline"></Icon>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        name="Delete"
                        onClick={this.handleIDeleteProfile}
                      >
                        <Icon size-="large" name="delete"></Icon>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid>
            ) : null}
            <Segment style={{ backgroundColor: "rgb(137, 193, 236)" }}>
              <Header textAlign="center" as="h1">
                {" "}
                {opportunity.opportunity_title}
              </Header>

              <Grid width={12}>
                <Grid.Row>
                  <Grid.Column textAlign="right" style={{ color: "red" }}>
                    <Icon name="calendar times"></Icon>
                    {moment(opportunity.date).format("DD MMM YYYY")}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column textAlign="left">
                    <Icon name="map marker alternate"></Icon>
                    {opportunity.location}
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    {opportunity.type}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Header
              as="h2"
              color="blue"
              as={Link}
              to={`/company-profile/${opportunity.company_id}`}
            >
              <Icon name="building outline"></Icon>
              Company Name:{opportunity.company_name}
            </Header>
            {localStorage.getItem("token") ? (
              <Item.Group>
                <Item.Description as="h4" color="blue">
                  <Icon name="address card outline" color="blue"></Icon>
                  <span style={{ color: "rgb(92, 175, 239)" }}>
                    Contact Name:{" "}
                  </span>{" "}
                  {opportunity.contact_person}
                </Item.Description>

                <Item.Description as="h4" color="blue">
                  <Icon name="phone square" color="blue"></Icon>
                  <span style={{ color: "rgb(92, 175, 239)" }}>
                    Phone Number:{" "}
                  </span>
                  {opportunity.telephone}
                </Item.Description>
                <Item.Description as="h4">
                  <Icon name="mail" color="blue"></Icon>
                  <span style={{ color: "rgb(92, 175, 239)" }}>
                    Email:{" "}
                  </span>{" "}
                  {opportunity.email} {"  "}
                  <a href={`mailto: ${opportunity.email}`}>
                    <Icon name="send" color="blue"></Icon>
                  </a>
                </Item.Description>
              </Item.Group>
            ) : null}
            <Item.Description
              style={{ backgroundColor: "rgb(137, 193, 236)", padding: "12px" }}
            >
              <span>
                <strong>opportunity Description:</strong>
              </span>
              <br></br>
              {opportunity.description}
            </Item.Description>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
