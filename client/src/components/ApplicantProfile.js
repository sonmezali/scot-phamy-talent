import React from "react";
import { Message } from "semantic-ui-react";
import { getApplicantProfileByUserId } from "../api/applicantProfile";
import { getLoggedInUserData } from "../utils/storage";
import ProfileOptionsButton from "./ProfileOptionsButton";
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
    isEditProfile: false
  };

  componentDidMount() {
    this.getApplicantData();
    this.getApplicantSkills();
  }
  getApplicantData = () => {
    getApplicantProfileByUserId(this.state.userId).then(applicantData => {
      this.setState({ applicantData: applicantData });
    });
  };
  getApplicantSkills = () => {
    getSkillsByApplicantId(this.state.userId).then(data => {
      const skillsArray = data && data.map(skill => skill.skill);
      this.setState({
        skills: skillsArray,
        isLoading: false
      });
    });
  };
  handleClickToEdit = () => {
    this.setState({ isEditProfile: true });
  };
  render() {
    const { applicantData, skills, isEditProfile, userId } = this.state;
    return applicantData.application_status === "approved" ? (
      <div>
        {getLoggedInUserData() &&
          getLoggedInUserData().user.role === "applicant" &&
          Number(getLoggedInUserData().user.user_id) === Number(userId) && (
            <ProfileOptionsButton
              deleteOption
              edit
              changePassword
              handleClickToEdit={this.handleClickToEdit}
            />
          )}
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
