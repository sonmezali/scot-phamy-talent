import React from "react";
import {
  Button,
  Header,
  Segment,
  Image,
  Grid,
  Icon,
  Divider
} from "semantic-ui-react";
import { getApplicantProfileByUserId } from "../api/applicantProfile";
import { getLoggedInUserData } from "../utils/storage";
import ProfileOptionsButton from "./ProfileOptionsButton";
import { getSkillsByApplicantId } from "../api/applicants";

class ApplicantProfile extends React.Component {
  state = {
    userId:
      (window.location.pathname.includes("/applicant-profile/") &&
        window.location.pathname.replace("/applicant-profile/", "")) ||
      null,
    applicantData: {},
    skills: [],
    isLoading: true
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
      const skillsArray = data.map(skill => skill.skill);
      this.setState({
        skills: skillsArray,
        isLoading: false
      });
    });
  };

  render() {
    const { applicantData, skills } = this.state;
    return (
      <div>
        {getLoggedInUserData() &&
          getLoggedInUserData().user.role === "applicant" && (
            <ProfileOptionsButton deleteOption edit changePassword />
          )}
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
