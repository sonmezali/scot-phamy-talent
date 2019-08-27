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
      value: ""
    },
    passwordValidation: {
      active: false,
      lengthColor: "red",
      matchColor: "red",
      containCaseAndNumberColor: "red",
      checked: false,
      valid: null
    },
    success: null,
    modalOpen: false,
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
  handleClose = () => this.setState({ modalOpen: false });
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
  handleChange = e => {
    const property = e.target.name;
    const value = e.target.value;
    this.setState(function(prevState) {
      const newEntries = prevState.applicantEntries;
      newEntries[property] = value;
      return { applicantEntries: newEntries };
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.passwordValidation.valid === true) {
      createNewApplicantUserAndProfile(this.state.applicantEntries).then(
        res => {
          this.setState({ success: res.success });
          if (res.success === true) {
            this.setState({ modalOpen: true });
            this.clearForm();
          }
        }
      );
    }
  };

  handleChangeCheckBox = (e, { value }) =>
    this.setState({
      applicantEntries: { ...this.state.applicantEntries, value }
    });
  // Clear Form Entries after success
  clearForm = e => {
    this.setState({
      applicantEntries: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        about: "",
        city: null,
        skills: [],
        cvLink: "",
        value: ""
      }
    });
  };
  //Validations  this validation is not part of the card and it is not perfect may need help to improve it
  passwordValidation = () => {
    this.isActive();
    if (
      this.isPasswordTooShort() &&
      this.isConfirm() &&
      this.isPasswordMatch()
    ) {
      this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          lengthColor: "green",
          matchColor: "green",
          containCaseAndNumberColor: "green",
          checked: true,
          valid: true
        }
      });
    }
  };
  isActive = () => {
    if (this.state.applicantEntries.password.length > 0) {
      this.setState({
        passwordValidation: { ...this.state.passwordValidation, active: true }
      });
    }
  };
  isPasswordTooShort = () => {
    if (
      this.state.applicantEntries.password.length >= 6 &&
      this.state.applicantEntries.confirmPassword.length >= 6
    ) {
      return true;
    }
  };
  isPasswordMatch = () => {
    if (
      this.state.applicantEntries.password ===
      this.state.applicantEntries.confirmPassword
    ) {
      return true;
    }
  };
  isConfirm = () => {
    if (
      this.isPasswordContainUpperCase(this.state.applicantEntries.password) ===
        true &&
      this.isPasswordContainUpperCase(
        this.state.applicantEntries.confirmPassword
      ) === true
    ) {
      return true;
    }
  };
  isPasswordContainUpperCase = password => {
    const newReg = /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[0-9A-Z-a-z]{8,}/g;
    const pas = newReg.test(password);

    return pas;
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
      value
    } = this.state.applicantEntries;
    const {
      active,
      lengthColor,
      matchColor,
      containCaseAndNumberColor,
      checked
    } = this.state.passwordValidation;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Grid centered columns={2}>
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
                  onKeyUp={this.passwordValidation}
                  onChange={this.handleChange}
                >
                  <Icon name="undo alternate" color="blue" />
                  <input />
                </Form.Field>
                {active === false ? null : (
                  <Message>
                    {/* <p style={{ color: lengthColor }}>
                      Password is 8 characters
                    </p> */}
                    <Checkbox
                      label="Password is 8 characters"
                      checked={checked}
                    />
                    <p style={{ color: matchColor }}>Matching Passwords</p>
                    <p style={{ color: containCaseAndNumberColor }}>
                      password contain at least one Uppercase Lowercase
                      characters and number
                    </p>
                  </Message>
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
                <Form.Group inline>
                  {" "}
                  <Form.Field>
                    <Checkbox
                      label="Yes"
                      name="radioGroup"
                      value="Yes"
                      checked={value === "Yes"}
                      onChange={this.handleChangeCheckBox}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="No"
                      name="radioGroup"
                      value="No"
                      checked={value === "No"}
                      onChange={this.handleChangeCheckBox}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Button fluid lapel="Submit" primary>
                  Sign Up
                </Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.success === true && (
            <Modal
              open={this.state.modalOpen}
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
          {this.state.success === false && (
            <Modal
              basic
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
            >
              <Modal.Header> Something went Wrong</Modal.Header>
              <Modal.Content>
                <p>check Your Data</p>
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
        </Form>
      </div>
    );
  }
}

export default ApplicantRegister;
