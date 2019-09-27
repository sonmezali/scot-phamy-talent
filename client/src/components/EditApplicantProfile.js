import {
  Button,
  Header,
  Grid,
  TextArea,
  Form,
  Icon,
  Input,
  Modal
} from "semantic-ui-react";
import React, { Component } from "react";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import { updateApplicantProfile } from "../api/editApplicantProfile";
import { getSkillsForEditApplicantProfile } from "../api/editApplicantProfile";
export default class EditApplicantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedApplicantEntries: {
        name: this.props.applicantData.applicant_name,
        about: this.props.applicantData.about,
        city: this.props.applicantData.cityid,
        skills: [],
        cvLink: this.props.applicantData.cvlink,
        rightToWork: this.props.applicantData.right_to_work ? "Yes" : "No"
      },
      successServerStatus: false,
      openSubmitStatusMsg: false,
      skillsData: [],
      citiesData: []
    };
  }
  //Getting Data
  getAllCities = () => {
    getCities().then(response => {
      this.setState({
        citiesData: response.map(city => ({
          key: city.id,
          text: city.city,
          value: city.id
        }))
      });
    });
  };
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skillsData: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.skill_id
        }))
      });
    });
  };
  getSkillsIdFromDatabase = () => {
    getSkillsForEditApplicantProfile(
      this.props.applicantData.applicant_id
    ).then(res => {
      const currentSkillsId = Object.values(res).map(skill => skill.skill_id);

      this.setState({
        editedApplicantEntries: {
          ...this.state.editedApplicantEntries,
          skills: currentSkillsId
        }
      });
    });
  };
  componentDidMount() {
    this.getAllSkills();
    this.getAllCities();
    this.getSkillsIdFromDatabase();
  }
  //Handlers
  handleCloseFail = () => this.setState({ openSubmitStatusMsg: false });
  handleCloseSuccess = () => {
    this.setState({ openSubmitStatusMsg: false });
    return window.location.reload();
  };
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      editedApplicantEntries: {
        ...this.state.editedApplicantEntries,
        skills: selectedSkill
      }
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      editedApplicantEntries: {
        ...this.state.editedApplicantEntries,
        city: selectedCity
      }
    });
  };
  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.editedApplicantEntries;
      newEntries[property] = value;
      return { editedApplicantEntries: newEntries };
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    updateApplicantProfile(
      this.props.applicantData.applicant_id,
      this.state.editedApplicantEntries
    ).then(res => {
      this.setState({ successServerStatus: res.success });
      if (this.state.successServerStatus) {
        this.setState({ openSubmitStatusMsg: true });
      } else {
        return this.setState({
          successServerStatus: false,
          openSubmitStatusMsg: true
        });
      }
    });
  };

  handleChangeCheckBox = (e, { value }) =>
    this.setState({
      editedApplicantEntries: {
        ...this.state.editedApplicantEntries,
        rightToWork: value
      }
    });
  render() {
    const {
      name,
      about,
      city,
      skills,
      cvLink,
      rightToWork
    } = this.state.editedApplicantEntries;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Grid centered stackable columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" textAlign="center">
                  {" "}
                  Edit Your Profile Data
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Full Name"
                  value={name}
                  iconPosition="left"
                  name="name"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="user" color="blue" />
                  <input />
                </Form.Field>
                <Form.Field
                  control={TextArea}
                  label="About me"
                  name="about"
                  value={about}
                  required
                  onChange={this.handleChange}
                />
                <Form.Select
                  label="Location"
                  name="city"
                  placeholder="Select city"
                  search
                  selection
                  value={city}
                  options={this.state.citiesData}
                  onChange={this.handleSelectCity}
                />
                <Form.Select
                  label="Skills"
                  onChange={this.handleSelectSkill}
                  options={this.state.skillsData}
                  name="skills"
                  value={skills}
                  multiple
                  search
                  selection
                  placeholder="Select Skills"
                />
                <Form.Field
                  control={Input}
                  label="Link To External CV"
                  placeholder="Link To External CV"
                  iconPosition="left"
                  name="cvLink"
                  value={cvLink}
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="linkify" color="blue" />
                  <input />
                </Form.Field>
                <Header as="h4">Do you have the right to work? </Header>
                <Form.Group unstackable grouped>
                  <Form.Checkbox
                    label="Yes"
                    name="radioGroup"
                    value="Yes"
                    checked={rightToWork === "Yes"}
                    onChange={this.handleChangeCheckBox}
                  />
                  <Form.Checkbox
                    label="No"
                    name="radioGroup"
                    value="No"
                    checked={rightToWork === "No"}
                    onChange={this.handleChangeCheckBox}
                  />
                </Form.Group>
                <Form.Button fluid lapel="Submit" primary>
                  Save Changes
                </Form.Button>{" "}
                <Form.Button
                  fluid
                  lapel="Submit"
                  basic
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.successServerStatus && (
            <Modal
              open={this.state.openSubmitStatusMsg}
              onClose={this.handleCloseSuccess}
              closeIcon
              basic
              size="small"
            >
              <Modal.Header> Application Edited successfully</Modal.Header>
              <Modal.Actions>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="OK"
                  onClick={this.handleCloseSuccess}
                />
              </Modal.Actions>
            </Modal>
          )}
          {!this.state.successServerStatus && (
            <Modal
              basic
              open={this.state.openSubmitStatusMsg}
              onClose={this.handleCloseFail}
              closeIcon
            >
              <Modal.Header> Something went Wrong</Modal.Header>
              <Modal.Content>
                <p>check Your Data</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  negative
                  icon="checkmark"
                  labelPosition="right"
                  content="OK"
                  onClick={this.handleCloseFail}
                />
              </Modal.Actions>
            </Modal>
          )}
        </Form>
      </div>
    );
  }
}
