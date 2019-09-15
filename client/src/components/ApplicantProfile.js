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
import {
  getApplicantProfileByUserId,
  getSkillsList
} from "../api/applicantProfile";

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
    userId: null,
    applicantData: {},
    skills: [],
    isLoading: true
  };
  // Get data from db
  componentWillMount() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userId = loggedInUser.user_id;
    this.setState({ userId: userId });
  }
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
        <Divider horizontal>
          <Menu compact>
            <Dropdown text="Your Profile" options={options} simple item />
          </Menu>
        </Divider>
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
