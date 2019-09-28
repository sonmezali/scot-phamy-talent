import React from "react";
import { Button, Header, Segment, Image, Grid, Icon } from "semantic-ui-react";
import {
  getApplicantProfileByUserId,
  deleteApplicantProfile
} from "../api/applicantProfile";
import { getLoggedInUserData, removeUserData } from "../utils/storage";
import ProfileOptionsButton from "./ProfileOptionsButton";
import ModalComponent from "./Modal";
import { Message } from "semantic-ui-react";
import { getSkillsByApplicantId } from "../api/applicants";
import ApplicantProfileContent from "./ApplicantProfileContent";
import EditApplicantProfile from "./EditApplicantProfile";
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
    isEditProfile: false
  };

  componentDidMount() {
    this.getApplicantData().then(() => this.getApplicantSkills());
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
    getSkillsByApplicantId(this.state.applicantId).then(data => {
      const skillsArray = data && data.length && data.map(skill => skill.skill);
      this.setState({
        skills: skillsArray,
        isLoading: false
      });
    });
  };
  clickToDelete = () => {
    this.setState({
      open: true
    });
  };
  handleDelete = () => {
    console.log("Res", this.state.applicantId);
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
  render() {
    // console.log(this.getApplicantSkills());
    const message = "Are you sure that you want to delete your profile ?";
    const { applicantData, skills, isEditProfile, userId, open } = this.state;
    console.log("2255", skills);
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
