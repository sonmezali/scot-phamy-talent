import React, { Component } from "react";
import { getOpportunityById, getSkillsList } from "../../api/opportunities";
import {
  Header,
  Modal,
  Segment,
  Icon,
  Dimmer,
  Button,
  Loader,
  Image
} from "semantic-ui-react";
import { getLoggedInUserData } from "../../utils/storage";
import { deleteOpportunityAndConnectedSkills } from "../../api/opportunities";
import ProfileOptionsButton from "../GeneralSupComponents/ProfileOptionsButton";
import OpportunityContent from "./OpportunityContent";
import EditOpportunity from "./EditOpportunity";

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
    askDeletePermission: false,
    isEditProfile: false
  };

  getOpportunity = () => {
    getOpportunityById(this.state.opportunityId).then(data =>
      this.setState({ opportunity: data[0] })
    );
  };
  getSkills = () => {
    getSkillsList(this.state.opportunityId).then(data => {
      const skillsArray = data.map(skill => skill.skill);
      const skillsIdArray = data.map(skill => skill.skill_id);

      this.setState({
        opportunity: {
          ...this.state.opportunity,
          skills: skillsArray,
          skillsId: skillsIdArray
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
  handleClickToEdit = () => {
    this.setState({ isEditProfile: true });
  };
  render() {
    const { opportunity, isLoading, isEditProfile, opportunityId } = this.state;
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
            {isEditProfile ? (
              <EditOpportunity
                opportunity={opportunity}
                opportunityId={opportunityId}
              />
            ) : (
              <React.Fragment>
                {getLoggedInUserData() &&
                  getLoggedInUserData().user.role === "company" &&
                  getLoggedInUserData().user.user_id ===
                    opportunity.user_id && (
                    <ProfileOptionsButton
                      edit
                      deleteOption
                      handleClickToEdit={this.handleClickToEdit}
                      clickToDelete={() =>
                        this.setState({
                          askDeletePermission: true,
                          openDeleteMsg: true
                        })
                      }
                    />
                  )}
                <OpportunityContent
                  opportunity={opportunity}
                  opportunityId={opportunityId}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
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
      </React.Fragment>
    );
  }
}
