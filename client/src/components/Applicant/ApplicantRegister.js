import React, { Component } from "react";
import {
  Header,
  TextArea,
  Form,
  Icon,
  Input,
  Grid,
  Modal,
  Button
} from "semantic-ui-react";
import { getSkills } from "../../api/skills";
import { getCities } from "../../api/cities";
import { createNewApplicantUserAndProfile } from "../../api/applicantProfile";
import { validateApplicantRegisterForm } from "../../utils/formValidation";
import {
  ValidatedFormInput,
  ValidatedFormDropDown,
  ValidatedFormCheckbox
} from "../GeneralSupComponents/ValidatedFormFields";
class ApplicantRegister extends Component {
  state = {
    applicantEntries: {
      role: "applicant",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      city: null,
      skills: [],
      cvLink: "",
      profilePicLink: "",
      rightToWork: null
    },
    formErrors: {},
    successServerStatus: false,
    openSubmitStatusMsg: false,
    skillsData: [],
    citiesData: []
  };

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
  componentDidMount() {
    this.getAllSkills();
    this.getAllCities();
  }
  //Handlers
  handleCloseFail = () => this.setState({ openSubmitStatusMsg: false });
  handleCloseSuccess = () => {
    this.setState({ openSubmitStatusMsg: false });
    this.clearForm();
  };
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      applicantEntries: {
        ...this.state.applicantEntries,
        skills: selectedSkill
      }
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      applicantEntries: { ...this.state.applicantEntries, city: selectedCity }
    });
  };
  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.applicantEntries;
      newEntries[property] = value;
      return { applicantEntries: newEntries };
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const result = validateApplicantRegisterForm(this.state.applicantEntries);
    const { valid } = result;
    if (valid) {
      createNewApplicantUserAndProfile(this.state.applicantEntries).then(
        res => {
          this.setState({ successServerStatus: res.success });
          if (this.state.successServerStatus) {
            this.setState({ openSubmitStatusMsg: true });
          } else {
            return this.setState({
              successServerStatus: false,
              openSubmitStatusMsg: true
            });
          }
        }
      );
    } else {
      return this.setState({
        formErrors: result
      });
    }
  };

  handleChangeCheckBox = (e, { value }) =>
    this.setState({
      applicantEntries: {
        ...this.state.applicantEntries,
        rightToWork: value
      },
      checkboxErr: false
    });
  // Clear Form Entries after successServerStatus
  clearForm = e => {
    this.setState({
      applicantEntries: {
        role: "applicant",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        about: "",
        city: null,
        skills: [],
        cvLink: "",
        profilePicLink: "",
        rightToWork: null
      },
      formErrors: {},
      successServerStatus: false,
      openSubmitStatusMsg: false,
      skillsData: [],
      citiesData: []
    });
  };
  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      about,
      city,
      skills,
      cvLink,
      profilePicLink,
      rightToWork
    } = this.state.applicantEntries;
    const { formErrors } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Grid centered stackable columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" textAlign="center">
                  {" "}
                  Applicant Registration
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Full Name"
                  placeholder="Full Name"
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
                  control={Input}
                  label="Email"
                  value={email}
                  type="email"
                  placeholder="Email"
                  iconPosition="left"
                  name="email"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="at" color="blue" />
                  <input />
                </Form.Field>
                <ValidatedFormInput
                  control={Input}
                  label="Password"
                  value={password}
                  type="password"
                  valid={formErrors.validPassword}
                  validationMessage="Password Must Have At Least 8 Character And Contain At Least One UpperCase , LowerCase,Number"
                  placeholder="Password"
                  iconPosition="left"
                  name="password"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="lock" color="blue" />
                  <input />
                </ValidatedFormInput>
                <ValidatedFormInput
                  control={Input}
                  label="Confirm Password"
                  value={confirmPassword}
                  type="Password"
                  placeholder="Confirm Password"
                  iconPosition="left"
                  valid={formErrors.validConfirmPassword}
                  validationMessage="Passwords Are Not Matching"
                  name="confirmPassword"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="undo alternate" color="blue" />
                  <input />
                </ValidatedFormInput>
                <Form.Field
                  control={TextArea}
                  label="About me"
                  placeholder="About me"
                  name="about"
                  value={about}
                  required
                  onChange={this.handleChange}
                />
                <ValidatedFormDropDown
                  label="Location"
                  name="city"
                  placeholder="Select city"
                  search
                  selection
                  valid={formErrors.cityIsSelected}
                  validationMessage="Location Is Not Selected"
                  required
                  value={city}
                  scrolling
                  options={this.state.citiesData}
                  onChange={this.handleSelectCity}
                />

                <ValidatedFormDropDown
                  label="Skills"
                  error
                  onChange={this.handleSelectSkill}
                  options={this.state.skillsData}
                  name="skills"
                  valid={formErrors.skillsIsSelected}
                  validationMessage="Skills Are Not Selected"
                  value={skills}
                  multiple
                  scrolling
                  selection
                  search
                  required
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
                <Form.Field
                  control={Input}
                  label="Profile Picture Link"
                  placeholder="Profile Picture Link"
                  iconPosition="left"
                  name="profilePicLink"
                  value={profilePicLink}
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="photo" color="blue" />
                  <input />
                </Form.Field>
                <Header as="h4">Do you have the right to work? </Header>
                <Form.Group unstackable grouped>
                  <ValidatedFormCheckbox
                    label="Yes"
                    valid={formErrors.checkRightToWorkBox}
                    validationMessage="Please Check If you are Allowed to Work"
                    name="radioGroup"
                    value="Yes"
                    checked={rightToWork === "Yes"}
                    onChange={this.handleChangeCheckBox}
                  />
                  <ValidatedFormCheckbox
                    valid={formErrors.checkRightToWorkBox}
                    validationMessage="Please Check If you are Not Allowed to Work"
                    label="No"
                    name="radioGroup"
                    value="No"
                    checked={rightToWork === "No"}
                    onChange={this.handleChangeCheckBox}
                  />
                </Form.Group>
                <Form.Button fluid lapel="Submit" primary>
                  Sign Up
                </Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.successServerStatus === true && (
            <Modal
              open={this.state.openSubmitStatusMsg}
              onClose={this.handleCloseSuccess}
              closeIcon
              basic
              size="small"
            >
              <Modal.Header> Request Submitted successfully</Modal.Header>
              <Modal.Content>
                <p>Waiting For approval</p>
              </Modal.Content>
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
          {this.state.successServerStatus === false && (
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

export default ApplicantRegister;
