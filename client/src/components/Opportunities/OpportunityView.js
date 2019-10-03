import React, { Component } from "react";
import { getOpportunityById, getSkillsList } from "../../api/opportunities";
import {
  Header,
  Grid,
  Modal,
  Segment,
  Icon,
  Item,
  Dimmer,
  Button,
  Loader,
  Image
} from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { getLoggedInUserData } from "../../utils/storage";
import { deleteOpportunityAndConnectedSkills } from "../../api/opportunities";
import ProfileOptionsButton from "../GeneralSupComponents/ProfileOptionsButton";

export default class OpportunityView extends Component {
  state = {
    opportunityId:
      (window.location.pathname.includes("/opportunities/") &&
        window.location.pathname.replace("/opportunities/", "")) ||
      null,
    opportunity: [],
    skills: [],
    isLoading: true,
    isEditing: false,
    openDeleteMsg: false,
    askDeletePermission: false
  };

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
  handleDeleteOpportunity = id => {
    deleteOpportunityAndConnectedSkills(id).then(data => {
      return window.history.go(-1);
    });
  };
  render() {
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
            {getLoggedInUserData() &&
              getLoggedInUserData().user.role === "company" &&
              getLoggedInUserData().user.user_id === opportunity.user_id && (
                <ProfileOptionsButton
                  edit
                  deleteOption
                  clickToDelete={() =>
                    this.setState({
                      askDeletePermission: true,
                      openDeleteMsg: true
                    })
                  }
                />
              )}
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
            <Link to={`/company-profile/${opportunity.user_id}`}>
              <Header as="h2" color="blue">
                <Icon name="building outline"></Icon>
                Company Name:{opportunity.company_name}
              </Header>
            </Link>

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
                <span style={{ color: "rgb(92, 175, 239)" }}>Email: </span>{" "}
                {opportunity.email} {"  "}
                <a href={`mailto: ${opportunity.email}`}>
                  <Icon name="send" color="blue"></Icon>
                </a>
              </Item.Description>
            </Item.Group>
            <Item.Description
              style={{
                backgroundColor: "rgb(137, 193, 236)",
                padding: "12px"
              }}
            >
              <span>
                <strong>opportunity Description:</strong>
              </span>
              <br></br>
              {opportunity.description}
            </Item.Description>
          </React.Fragment>
        )}
        {this.state.askDeletePermission && (
          <Modal
            open={this.state.openDeleteMsg}
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
                onClick={() =>
                  this.handleDeleteOpportunity(this.state.opportunityId)
                }
              >
                <Icon name="remove" /> Delete
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
