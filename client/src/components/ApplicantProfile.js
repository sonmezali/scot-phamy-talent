import React from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Divider,
  Image,
  Grid
} from "semantic-ui-react";
import {
  getApplicantProfileByUserId,
  getSkillsList
} from "../api/applicantProfile";
import { getLoggedInUserData } from "../utils/storage";
import ProfileOptionsButton from "./ProfileOptionsButton";
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
    getSkillsList(this.state.userId).then(data => {
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
        <Container></Container>

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
              <Header as="h1">{applicantData.applicant_name}</Header>
            </Grid>
            <Grid centered>
              <Header as="h3">{applicantData.city}</Header>
            </Grid>
          </Segment>
        </Segment>
        <Grid centered>
          <Segment basic>
            <a href={`mailto: ${applicantData.email}`}>
              <Button primary>Contact</Button>
            </a>

            <Segment basic>{applicantData.about}</Segment>
          </Segment>
        </Grid>
        <Segment style={{ background: "LightSkyBlue " }}>
          <Grid centered padded>
            {" "}
            <Header as="h2">Skills</Header>
          </Grid>
          <Divider />
          {skills.map(skill => (
            <Button basic>{skill}</Button>
          ))}
        </Segment>
      </div>
    );
  }
}

export default ApplicantProfile;
