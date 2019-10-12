import React from "react";
import {
  getApplicantProfileByUserId,
  deleteApplicantProfile
} from "../../api/applicantProfile";
import { getLoggedInUserData, removeUserData } from "../../utils/storage";
import ProfileOptionsButton from "../GeneralSupComponents/ProfileOptionsButton";
import ModalComponent from "../GeneralSupComponents/Modal";
import { Message } from "semantic-ui-react";
import { getSkillsByApplicantId } from "../../api/applicants";
import ApplicantProfileContent from "./ApplicantProfileContent";
import EditApplicantProfile from "./EditApplicantProfile";
import { getSkillsList } from "../../api/opportunities";
import { getOpportunitiesByCompanyId } from "../../api/opportunities";

class ApplicantProfile extends React.Component {
  state = {
    userId:
      (window.location.pathname.includes("/applicant-profile/") &&
        window.location.pathname.replace("/applicant-profile/", "")) ||
      null,
    applicantData: {},
    skills: [],
    isLoading: true,
    open: false,
    applicantId: null,
    isEditProfile: false,
    opportunitiesList: []
  };
  getOverAllPercentageOfMatchingForApplicant = percentage => {
    console.log(percentage);
  };
  componentDidMount() {
    this.getApplicantData()
      .then(() => this.getApplicantSkills())
      .then(this.getOpportunitiesForCompanyProfileByCompanyId());
  }
  getApplicantData = () => {
    return getApplicantProfileByUserId(this.state.userId).then(
      applicantData => {
        this.setState({
          applicantData,
          applicantId: applicantData && applicantData.applicant_id
        });
      }
    );
  };
  getApplicantSkills = () => {
    return getSkillsByApplicantId(this.state.applicantId).then(data => {
      const skillsArray = data && data.length && data.map(skill => skill.skill);
      this.setState({
        skills: skillsArray,
        isLoading: false
      });
    });
  };
  getOpportunitiesForCompanyProfileByCompanyId = () => {
    const userId = getLoggedInUserData() && getLoggedInUserData().user.user_id; // will get company id from company login
    return getOpportunitiesByCompanyId(userId).then(data =>
      data.forEach(opportunity => {
        getSkillsList(opportunity.opportunity_id).then(data => {
          const skills = data && data.map(result => result && result.skill);
          const matching = skills.filter(skill => {
            const matchingSkills =
              this.state.skills && this.state.skills.includes(skill);
            return matchingSkills;
          }).length;
          const percentage = ((matching / skills.length) * 100).toFixed(0);
          this.setState({
            opportunitiesList: [
              ...this.state.opportunitiesList,
              { ...opportunity, skills, percentage }
            ]
          });
        });
      })
    );
  };

  clickToDelete = () => {
    this.setState({
      open: true
    });
  };

  handleDelete = () => {
    const { applicantId, userId } = this.state;
    deleteApplicantProfile(applicantId, userId).then(res => {
      if (res && res.success) {
        removeUserData();
        this.setState({
          open: false
        });
        window.location.reload();
      }
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleClickToEdit = () => {
    this.setState({ isEditProfile: true });
  };
  getOverAllPercentageOfMatchingForApplicant = () => {
    return (
      this.state.opportunitiesList
        .map(opportunity => Number(opportunity.percentage))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
      this.state.opportunitiesList.length
    );
  };
  render() {
    const message = "Are you sure that you want to delete your profile ?";
    const { applicantData, skills, isEditProfile, userId, open } = this.state;
    return applicantData && applicantData.application_status === "approved" ? (
      <div>
        {getLoggedInUserData() &&
          getLoggedInUserData().user.role === "applicant" &&
          Number(getLoggedInUserData().user.user_id) === Number(userId) && (
            <ProfileOptionsButton
              deleteOption
              edit
              changePassword
              clickToDelete={this.clickToDelete}
              handleClickToEdit={this.handleClickToEdit}
            />
          )}
        <ModalComponent
          message={message}
          open={open}
          handleClose={this.handleClose}
          handleDelete={this.handleDelete}
        />

        {isEditProfile ? (
          <EditApplicantProfile applicantData={applicantData} />
        ) : (
          <ApplicantProfileContent
            opportunitiesList={this.state.opportunitiesList}
            applicantData={applicantData}
            skills={skills}
          />
        )}
      </div>
    ) : (
      <Message
        size="massive"
        warning
        compact
        content="
          You Account Is Pending For Approval"
      />
    );
  }
}

export default ApplicantProfile;
