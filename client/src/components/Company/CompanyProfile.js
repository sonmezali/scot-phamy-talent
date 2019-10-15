import React from "react";

import { Button, Header, Modal, Icon } from "semantic-ui-react";
import { getCompanyProfile } from "../../api/companyProfile";
import {
  getOpportunitiesByCompanyId,
  deleteOpportunityAndConnectedSkills
} from "../../api/opportunities";
import { getLoggedInUserData, removeUserData } from "../../utils/storage";
import ProfileOptionsButton from "../GeneralSupComponents/ProfileOptionsButton";
import { deleteUser } from "../../api/users";
import CompanyProfileContent from "./CompanyProfileContent";
import EditCompanyProfile from "./EditCompanyProfile";
class CompanyProfile extends React.Component {
  state = {
    userId:
      (window.location.pathname.includes("/company-profile/") &&
        window.location.pathname.replace("/company-profile/", "")) ||
      null,
    companyData: {},
    opportunitiesArray: [],
    openDeleteProfileMsg: false,
    openDeleteOpportunityMsg: false,
    askDeleteOpportunityPermission: false,
    askDeleteProfilePermission: false,
    selectedId: null,
    isEditCompanyProfile: false
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
      openDeleteOpportunityMsg: true
    });
  };
  confirmDeleteProfile = () => {
    this.setState({
      askDeleteProfilePermission: true,
      openDeleteProfileMsg: true
    });
  };
  handleDeleteOpportunity = id => {
    deleteOpportunityAndConnectedSkills(id).then(data => {
      if (data.deleted) {
        this.setState({ openDeleteOpportunityMsg: false });
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
        this.setState({ openDeleteProfileMsg: false });
        return this.logout();
      }
    });
  };
  handleClickToEdit = () => {
    this.setState({ isEditCompanyProfile: true });
  };

  render() {
    const {
      companyData,
      opportunitiesArray,
      userId,
      openDeleteProfileMsg,
      openDeleteOpportunityMsg,
      askDeleteOpportunityPermission,
      askDeleteProfilePermission,
      selectedId,
      isEditCompanyProfile
    } = this.state;
    if (userId === null || !userId) {
      return null;
    }
    return (
      <React.Fragment>
        {isEditCompanyProfile ? (
          <EditCompanyProfile companyData={companyData}></EditCompanyProfile>
        ) : (
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
                  handleClickToEdit={this.handleClickToEdit}
                />
              )}
            <CompanyProfileContent
              companyData={companyData}
              opportunitiesArray={opportunitiesArray}
              userId={userId}
              confirmDeleteOpportunity={this.confirmDeleteOpportunity}
            />
          </React.Fragment>
        )}
        {askDeleteOpportunityPermission && (
          <Modal
            open={openDeleteOpportunityMsg}
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
                onClick={() =>
                  this.setState({ openDeleteOpportunityMsg: false })
                }
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
            open={openDeleteProfileMsg}
            onClose={() => this.setState({ openDeleteProfileMsg: false })}
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
                onClick={() => this.setState({ openDeleteProfileMsg: false })}
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
