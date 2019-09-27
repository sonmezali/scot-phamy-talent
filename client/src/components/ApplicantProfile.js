import React from "react";
import { Button, Header, Segment, Image, Grid, Icon } from "semantic-ui-react";
import {
  getApplicantProfileByUserId,
  deleteApplicantProfile
} from "../api/applicantProfile";
import { getLoggedInUserData, removeUserData } from "../utils/storage";
import ProfileOptionsButton from "./ProfileOptionsButton";
import { getSkillsByApplicantId } from "../api/applicants";
import ModalComponent from "./Modal";

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
    applicantId: null
  };

  componentDidMount() {
    this.getApplicantData();
    this.getApplicantSkills();
  }
  getApplicantData = () => {
    getApplicantProfileByUserId(this.state.userId).then(applicantData => {
      this.setState({ applicantData, applicantId: applicantData.applicant_id });
    });
  };
  getApplicantSkills = () => {
    getSkillsByApplicantId(this.state.applicantId).then(data => {
      const skillsArray = data.map(skill => skill.skill);
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
  render() {
    const { applicantData, skills, open } = this.state;
    const message = "Are you sure that you want to delete your profile ?";

    return (
      <div>
        {getLoggedInUserData() &&
          getLoggedInUserData().user.role === "applicant" && (
            <ProfileOptionsButton
              deleteOption
              edit
              changePassword
              clickToDelete={this.clickToDelete}
            />
          )}
        <ModalComponent
          message={message}
          open={open}
          handleClose={this.handleClose}
          handleDelete={this.handleDelete}
        />
        <Segment inverted color="blue">
          <Segment inverted color="blue"></Segment>
          <Grid centered>
            <Segment circular centered>
              <Image
                src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
                size="mini"
                circular
                centered
              />
            </Segment>
          </Grid>
          <Segment inverted color="blue" padded="very">
            <Grid centered>
              <Header as="h1">
                Applicant Name: {applicantData && applicantData.applicant_name}
              </Header>
            </Grid>
            <Grid centered>
              <Header as="h3">{applicantData && applicantData.city}</Header>
            </Grid>
          </Segment>
        </Segment>
        <Grid left stackable columns={2}>
          <Grid.Column>
            <Header as="h3">
              <Icon name="briefcase" size="mini" color="white" />
              About: {applicantData && applicantData.about}
            </Header>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="map marker alternate" size="mini" color="white" />
                City: {applicantData && applicantData.city}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                Skills:
                {skills && skills.map(skill => <li>{skill}</li>)}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="mail" size="mini" color="red" />
                Email: {applicantData && applicantData.email}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="linkify" size="mini" color="blue" />
                CV Link: {applicantData && applicantData.cvlink}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="legal" size="mini" color="red" />
                Right to work:{" "}
                {applicantData && applicantData.right_to_work ? "yes" : "No"}
              </Header>
            </Grid>
          </Grid.Column>
        </Grid>

        <Grid centered>
          <Segment basic>
            <a href={`mailto: ${applicantData && applicantData.email}`}>
              <Button primary>Contact</Button>
            </a>
          </Segment>
        </Grid>
      </div>
    );
  }
}

export default ApplicantProfile;
