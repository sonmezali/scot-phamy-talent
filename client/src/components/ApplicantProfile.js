import React from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Divider,
  Dropdown,
  Menu
} from "semantic-ui-react";
import "../styles/ApplicantProfile.css";
import { Link } from "react-router-dom";
import { getApplicantProfileByUserId } from "../api/applicantProfile";

const options = [
  {
    key: 1,
    text: (
      <Menu.Item as={Link} to="/applicant/manage-profile">
        Edit Profile
      </Menu.Item>
    ),
    value: 1
  },
  {
    key: 2,
    text: (
      <Menu.Item as={Link} to="/applicant/delete-profile">
        Delete Profile
      </Menu.Item>
    ),
    value: 2
  },
  {
    key: 3,
    text: (
      <Menu.Item as={Link} to="/applicant/change-password">
        Change Password
      </Menu.Item>
    ),
    value: 3
  }
];

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
        <Container text style={{ marginTop: "5em" }} border={{}}>
          <Divider horizontal>
            <Menu compact>
              <Dropdown text="Profile" options={options} simple item />
            </Menu>
          </Divider>
          <Segment secondary>
            <Header as="h1">{this.state.applicantName}</Header>
            <Header as="h3">{this.state.city}</Header>
          </Segment>
          <Segment>
            <a href={`mailto: ${this.state.email}`}>
              <Button primary>Contact</Button>
            </a>
            <br />
            <br />
            {/* </Segment>
            <Segment> */}
            <p>
              Hi! My name is {this.state.applicantName}. I am a creative geek
              from {this.state.city}. I enjoy creating eye candy solutions for
              web and mobile apps. Contact me at {this.state.email}
            </p>
          </Segment>
          <Segment>
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
