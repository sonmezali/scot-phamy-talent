import React, { Component } from "react";
import {
  Header,
  TextArea,
  Form,
  Icon,
  Input,
  Grid,
  Checkbox,
  Modal,
  Message,
  Button
} from "semantic-ui-react";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import { createNewApplicantUserAndProfile } from "../api/applicantProfile";
import validateForm from "../utils/formValidation";
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
  handleClose = () => this.setState({ openSubmitStatusMsg: false });
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
    const result = validateForm(this.state.applicantEntries);
    const { valid } = result;
    if (valid) {
      createNewApplicantUserAndProfile(this.state.applicantEntries).then(
        res => {
          this.setState({ successServerStatus: res.success });
          if (this.state.successServerStatus) {
            this.setState({ openSubmitStatusMsg: true });
            this.clearForm();
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
        rightToWork: null,
        checked: null
      }
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
                  label="Name"
                  placeholder="Name"
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
                <Form.Field
                  control={Input}
                  label="Password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  iconPosition="left"
                  name="password"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="lock" color="blue" />
                  <input />
                </Form.Field>
                <Form.Field
                  control={Input}
                  label="Confirm Password"
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  iconPosition="left"
                  name="confirmPassword"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="undo alternate" color="blue" />
                  <input />
                </Form.Field>
                {formErrors.passwordLength === false ? (
                  <Message negative>
                    Password Must Be atleast 8 Characters
                  </Message>
                ) : (
                  ""
                )}
                {formErrors.passwordIsMatching === false ? (
                  <Message negative>Passwords Are Not Matching</Message>
                ) : (
                  ""
                )}
                {formErrors.passwordContainUppercase === false ? (
                  <Message negative>
                    Password Must Contain atleast 1 Uppercase Letter
                  </Message>
                ) : (
                  ""
                )}
                {formErrors.passwordContainLowerCase === false ? (
                  <Message negative>
                    Password Must Contain atleast 1 Lowercase Letter
                  </Message>
                ) : (
                  ""
                )}
                {formErrors.passwordContainNumber === false ? (
                  <Message negative>
                    Password Must Contain atleast 1 Number
                  </Message>
                ) : (
                  ""
                )}
                <Form.Field
                  label="About me"
                  control={TextArea}
                  placeholder="About me"
                  name="about"
                  value={about}
                  required
                  onChange={this.handleChange}
                />
                <Form.Dropdown
                  label="Location"
                  name="city"
                  placeholder="Select city"
                  search
                  selection
                  required
                  value={city}
                  options={this.state.citiesData}
                  onChange={this.handleSelectCity}
                />
                {formErrors.cityIsSelected === false ? (
                  <Message negative>Location Is Not Selected</Message>
                ) : (
                  ""
                )}

                <Form.Dropdown
                  label="Skills"
                  onChange={this.handleSelectSkill}
                  options={this.state.skillsData}
                  name="skills"
                  value={skills}
                  multiple
                  selection
                  required
                  placeholder="Select Skills"
                />
                {formErrors.skillsIsSelected === false ? (
                  <Message negative>Skills Is Not Selected</Message>
                ) : (
                  ""
                )}

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
                <Form.Group inline required>
                  {" "}
                  <Form.Field>
                    <Checkbox
                      label="Yes"
                      name="radioGroup"
                      value="Yes"
                      checked={rightToWork === "Yes"}
                      onChange={this.handleChangeCheckBox}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="No"
                      name="radioGroup"
                      value="No"
                      checked={rightToWork === "No"}
                      onChange={this.handleChangeCheckBox}
                    />
                  </Form.Field>
                  {formErrors.checkRightToWorkBox === false ? (
                    <Message negative>Please Select One</Message>
                  ) : (
                    ""
                  )}
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
              onClose={this.handleClose}
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
                  onClick={this.handleClose}
                />
              </Modal.Actions>
            </Modal>
          )}
          {this.state.successServerStatus === false && (
            <Modal
              basic
              open={this.state.openSubmitStatusMsg}
              onClose={this.handleClose}
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
                  onClick={this.handleClose}
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
