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
      applicantName: "",
      city: "",
      applicationStatus: "",
      rightToWork: null,
      email: "",
      skills: []
    };
  }

  componentDidMount() {
    const user_id = 2; //This is hard coded because we don't have user login information yet

    getApplicantProfileByUserId(user_id).then(response => {
      this.setState({
        applicantName: response.applicant_name,
        city: response.city,
        applicationStatus: response.application_status,
        rightToWork: response.right_to_work,
        email: response.email,
        skills: [response.skill_name]
      });
    });
  }
  render() {
    return (
      <Container>
        <Container text style={{ marginTop: "4em" }} border={{}}>
          <Divider horizontal>
            <Menu compact>
              <Dropdown text="Your Profile" options={options} simple item />
            </Menu>
          </Divider>
          <Container></Container>
          <Segment inverted color="blue">
            <Segment inverted color="blue"></Segment>
            <Grid centered>
              <Segment
                circular
                style={square}
                centered
                verticalAlign="middle"
                horizontalAlign="middle"
              >
                <Image
                  src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
                  appImage
                  size="medium"
                  circular
                  centered
                />
              </Segment>
            </Grid>
            <Header as="h1">{this.state.applicantName}</Header>
            <Header as="h3">{this.state.city}</Header>
          </Segment>
          <Segment basic>
            <a href={`mailto: ${this.state.email}`}>
              <Button primary>Contact</Button>
            </a>

            <Segment basic>
              Hi! My name is {this.state.applicantName}. I am a creative geek
              from {this.state.city}. I enjoy creating eye candy solutions for
              web and mobile apps. Contact me at {this.state.email}
            </Segment>
          </Segment>
          <Segment inverted style={skillsAreaStyle}>
            <Header as="h2">Skills</Header>
            <Divider />
            {this.state.skills.map(skill => (
              <Button basic>{skill}</Button>
            ))}
          </Segment>
        </Container>
      </Container>
    );
  }
}

export default ApplicantProfile;
