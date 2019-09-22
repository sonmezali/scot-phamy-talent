import React from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Divider,
  Dropdown,
  Menu,
  Icon,
  Image,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getApplicantProfileByUserId } from "../api/applicantProfile";
import { getSkillsByApplicantId } from "../api/applicants";

const options = [
  {
    key: 1,
    text: (
      <Menu.Item as={Link} to="/applicant/manage-profile">
        <Icon name="edit" />
        Edit Profile
      </Menu.Item>
    ),
    value: 1
  },
  {
    key: 2,
    text: (
      <Menu.Item as={Link} to="/applicant/delete-profile">
        <Icon name="delete" /> Delete Profile
      </Menu.Item>
    ),
    value: 2
  },
  {
    key: 3,
    text: (
      <Menu.Item as={Link} to="/applicant/change-password">
        <Icon name="expeditedssl" /> Change Password
      </Menu.Item>
    ),
    value: 3
  }
];

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
        <Divider horizontal>
          <Menu compact>
            <Dropdown text="Your Profile" options={options} simple item />
          </Menu>
        </Divider>

        <Segment inverted color="blue">
          <Grid centered>
            <Segment circular centered>
              <Image
                src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
                size="mini"
                circular
                left
              />
            </Segment>
          </Grid>
          <Segment inverted color="blue" padded="very">
            <Grid centered>
              <Header as="h1">
                Applicant Name: {applicantData.applicant_name}
              </Header>
            </Grid>
          </Segment>
        </Segment>
        <Grid left stackable columns={2}>
          <Grid.Column>
            <Header as="h3">
              <Icon name="briefcase" size="mini" color="white" />
              About: {applicantData.about}
            </Header>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="map marker alternate" size="mini" color="white" />
                City: {applicantData.city}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="check" size="mini" color="white" />
                Skills:
                {skills.map(skill => skill)}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="mail" size="mini" color="red" />
                Email: {applicantData.email}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="linkify" size="mini" color="blue" />
                CV Link: {applicantData.cvlink}
              </Header>
            </Grid>
            <br></br>
            <br></br>
            <Grid left>
              <Header as="h3">
                <Icon name="legal" size="mini" color="red" />
                Right to work: {applicantData.right_to_work ? "yes" : "No"}
              </Header>
            </Grid>
          </Grid.Column>
        </Grid>

        <Grid centered>
          <Segment basic>
            <a href={`mailto: ${applicantData.email}`}>
              <Button primary>Contact</Button>
            </a>
          </Segment>
        </Grid>
      </div>
    );
  }
}

export default ApplicantProfile;
