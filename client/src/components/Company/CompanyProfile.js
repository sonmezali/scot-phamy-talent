import React from "react";

import {
  Divider,
  Button,
  Header,
  Modal,
  Image,
  Icon,
  Grid,
  Segment
} from "semantic-ui-react";
import { getCompanyProfile } from "../../api/companyProfile";
import {
  getOpportunitiesByCompanyId,
  deleteOpportunityAndConnectedSkills
} from "../../api/opportunities";
import OpportunityCard from "../Opportunities/OpportunityCard";
import { getLoggedInUserData, removeUserData } from "../../utils/storage";
import ProfileOptionsButton from "../GeneralSupComponents/ProfileOptionsButton";
import { deleteUser } from "../../api/users";

class CompanyProfile extends React.Component {
  state = {
    userId:
      (window.location.pathname.includes("/company-profile/") &&
        window.location.pathname.replace("/company-profile/", "")) ||
      null,
    companyData: {},
    opportunitiesArray: [],
    openDeleteMsg: false,
    askDeleteOpportunityPermission: false,
    askDeleteProfilePermission: false,
    selectedId: null
  };

  getOpportunitiesForCompanyProfileByCompanyId = () => {
    const { userId } = this.state; // will get company id from company login
    getOpportunitiesByCompanyId(userId).then(opportunities =>
      this.setState({
        opportunitiesArray: opportunities
      })
    );
  };

  getCompanyProfileData = () => {
    const { userId } = this.state; // will get company id from company login
    getCompanyProfile(userId).then(companyData => {
      this.setState({ companyData: companyData });
    });
  };

  componentDidMount() {
    this.getCompanyProfileData();
    this.getOpportunitiesForCompanyProfileByCompanyId();
  }
  // Handlers
  handleEditOpportunity = () => {
    return "/company/manage-profile";
  };

  confirmDeleteOpportunity = id => {
    this.setState({
      selectedId: id,
      askDeleteOpportunityPermission: true,
      openDeleteMsg: true
    });
  };
  confirmDeleteProfile = () => {
    this.setState({
      askDeleteProfilePermission: true,
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
  logout = () => {
    removeUserData();
    document.location.href = "/";
  };
  handleDeleteCompanyProfile = id => {
    deleteUser(id).then(res => {
      if (res) {
        this.setState({ openDeleteMsg: false });
        return this.logout();
      }
    });
  };

  render() {
    const {
      companyData,
      opportunitiesArray,
      userId,
      openDeleteMsg,
      askDeleteOpportunityPermission,
      askDeleteProfilePermission,
      selectedId
    } = this.state;
    if (userId === null || !userId) {
      return null;
    }
    return (
      <React.Fragment>
        {getLoggedInUserData() &&
          getLoggedInUserData().user.role === "company" && (
            <ProfileOptionsButton
              changePassword
              deleteOption
              edit
              createOpportunity
              linkToCreateOpportunity={"/create-opportunity"}
              clickToDelete={this.confirmDeleteProfile}
            />
          )}
        <Segment style={{ background: "#bce0fd" }}>
          <Image
            centered
            size="tiny"
            src={
              companyData && companyData.logo_url
                ? companyData.logo_url
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            alt="Company Logo"
          />
          <Header textAlign="center" as="h3">
            {companyData && companyData.company_name}
          </Header>
          <Header textAlign="center" as="h3">
            Location: {companyData && companyData.location}
          </Header>
        </Segment>
        <Segment centered basic>
          <a href={`mailto: ${companyData && companyData.email}`}>
            <Button primary size="large">
              Contact
            </Button>
          </a>
        </Segment>
        <Segment>
          <Header as="h3">About Company</Header>

          <p>{companyData && companyData.company_description}</p>
        </Segment>
        <Grid stackable>
          <Grid.Row columns={3} stretched>
            {opportunitiesArray &&
              opportunitiesArray.map(opportunity => (
                <Grid.Column key={opportunity.opportunity_id}>
                  <OpportunityCard
                    date
                    contactPerson
                    opportunity={opportunity}
                    cardButtons={
                      Number(getLoggedInUserData().user.user_id) ===
                      Number(userId)
                        ? true
                        : false
                    }
                    ConfirmDelete={this.confirmDeleteOpportunity}
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
        {askDeleteOpportunityPermission && (
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
        {askDeleteProfilePermission && (
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
              content="Are You Sure You Want To Delete The Company Profile"
            />
            <p>You will Delete the user also will not be able to login again</p>
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
                onClick={() => this.handleDeleteCompanyProfile(userId)}
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

export default CompanyProfile;
