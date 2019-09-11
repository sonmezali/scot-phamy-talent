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

const square = { width: 100, height: 100, align: "center" };
const skillsAreaStyle = { background: "LightSkyBlue " };
class ApplicantProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 3,
      applicantId: null,
      applicantName: "",
      city: "",
      applicationStatus: "",
      rightToWork: null,
      email: "",
      skills: [],
      about: "",
      isLoading: true
    };
  }
  // Get data from db
  componentWillMount() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      const userId = loggedInUser.user_id;
      this.setState({ userId: userId });
      console.log(loggedInUser);
    } else {
      // window.location.replace("/applicant-profile");
      this.props.history.push(`/`);
    }
  }
  componentDidMount() {
    this.getApplicantData();
    this.getApplicantSkills();
  }
  getApplicantData = () => {
    getApplicantProfileByUserId(this.state.userId).then(response => {
      this.setState({
        ...this.state,
        applicantId: response.applicant_id,
        applicantName: response.applicant_name,
        city: response.city,
        applicationStatus: response.application_status,
        rightToWork: response.right_to_work,
        email: response.email,
        about: response.about
      });
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
            <Segment circular style={square} centered>
              <Image
                src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
                size="medium"
                circular
                centered
              />
            </Segment>
          </Grid>
          <Segment inverted color="blue" padded="very">
            <Grid centered>
              <Header as="h1">{this.state.applicantName}</Header>
            </Grid>
            <Grid centered>
              <Header as="h3">{this.state.city}</Header>
            </Grid>
          </Segment>
        </Segment>
        <Grid centered>
          <Segment basic>
            <a href={`mailto: ${this.state.email}`}>
              <Button primary>Contact</Button>
            </a>

            <Segment basic>{this.state.about}</Segment>
          </Segment>
        </Grid>
        <Segment inverted style={skillsAreaStyle}>
          <Grid centered padded>
            {" "}
            <Header as="h2">Skills</Header>
          </Grid>
          <Divider />
          {this.state.skills.map(skill => (
            <Button basic>{skill}</Button>
          ))}
        </Segment>
      </div>
    );
  }
}

export default ApplicantProfile;
