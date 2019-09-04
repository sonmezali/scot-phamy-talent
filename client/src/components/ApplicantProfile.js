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
      skills: [],
      about: ""
    };
  }

  componentDidMount() {
    const user_id = 2;
    getApplicantProfileByUserId(user_id).then(response => {
      this.setState({
        applicantName: response.applicant_name,
        city: response.city,
        applicationStatus: response.application_status,
        rightToWork: response.right_to_work,
        email: response.email,
        skills: [response.skill_name],
        about: response.about
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
        </Container>
      </Container>
    );
  }
}

export default ApplicantProfile;
