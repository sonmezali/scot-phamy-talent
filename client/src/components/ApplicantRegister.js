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
      value: null
    },
    passwordValidation: {
      lengthValid: false,
      matching: false,
      active: false,
      eightCharactersColor: "red",
      matchColor: "red",
      containUppercaseColor: "red",
      containLowercaseColor: "red",
      containNumberColor: "red",
      containUppercase: false,
      containLowercase: false,
      containNumber: false
    },
    successServerStatus: false,
    openSubmitStatusMsg: false,
    skillsData: [],
    citiesData: [],
    checkboxErr: false
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
    if (
      this.state.applicantEntries.value !== null &&
      this.state.passwordValidation.lengthValid &&
      this.state.passwordValidation.matching &&
      this.state.passwordValidation.containUppercase &&
      this.state.passwordValidation.containLowercase &&
      this.state.passwordValidation.containNumber
    ) {
      createNewApplicantUserAndProfile(this.state.applicantEntries).then(
        res => {
          this.setState({ successServerStatus: res.success });
          if (this.state.successServerStatus) {
            this.setState({ openSubmitStatusMsg: true });
            this.clearForm();
          }
        }
      );
    } else {
      return this.setState({
        successServerStatus: false,
        openSubmitStatusMsg: true,
        checkboxErr: true
      });
    }
  };

  handleChangeCheckBox = (e, { value }) =>
    this.setState({
      applicantEntries: {
        ...this.state.applicantEntries,
        value
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
        value: null,
        checked: null
      },
      passwordValidation: {
        lengthValid: null,
        matching: null,
        active: false,
        eightCharactersColor: "red",
        matchColor: "red",
        containUppercaseColor: "red",
        containLowercaseColor: "red",
        containNumberColor: "red",
        containUppercase: null,
        containLowercase: null,
        containNumber: null
      }
    });
  };
  //Validations  this validation is not part of the card and it is not perfect may need help to improve it
  passwordValidation = (password, confirmPassword) => {
    this.isActive(this.state.applicantEntries.password);
    this.isPasswordMatch(password, confirmPassword);
    this.isConfirmNumber(password, confirmPassword);
    this.isConfirmLowercase(password, confirmPassword);
    this.isPasswordTooShort(password, confirmPassword);
    this.isConfirmUppercase(password, confirmPassword);
  };
  isActive = password => {
    if (password.length > 0) {
      this.setState({
        passwordValidation: { ...this.state.passwordValidation, active: true }
      });
    }
  };
  isPasswordTooShort = (password, confirmPassword) => {
    if (password.length >= 6 && confirmPassword.length >= 6) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          lengthValid: true,
          eightCharactersColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          lengthValid: false,
          eightCharactersColor: "red"
        }
      });
    }
  };
  isPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          matching: true,
          matchColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          matching: false,
          matchColor: "red"
        }
      });
    }
  };
  isConfirmUppercase = (password, confirmPassword) => {
    if (
      this.isPasswordContainUpperCase(password) &&
      this.isPasswordContainUpperCase(confirmPassword)
    ) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containUppercase: true,
          containUppercaseColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containUppercase: false,
          containUppercaseColor: "red"
        }
      });
    }
  };
  isConfirmLowercase = (password, confirmPassword) => {
    if (
      this.isPasswordContainLowerCase(password) &&
      this.isPasswordContainLowerCase(confirmPassword)
    ) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containLowercase: true,
          containLowercaseColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containLowercase: false,
          containLowercaseColor: "red"
        }
      });
    }
  };
  isConfirmNumber = (password, confirmPassword) => {
    if (
      this.isPasswordContainNumber(password)  &&
      this.isPasswordContainNumber(confirmPassword)
    ) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containNumber: true,
          containNumberColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containNumber: false,
          containNumberColor: "red"
        }
      });
    }
  };
  isPasswordContainLowerCase = password => {
    const newReg = /(?=.*[a-z])[a-z]/g;
    const pas = newReg.test(password);

    return pas;
  };
  isPasswordContainUpperCase = password => {
    const newReg = /(?=.*[A-Z])[A-Z]/g;
    const pas = newReg.test(password);

    return pas;
  };
  isPasswordContainNumber = password => {
    const newReg = /(?=.*[0-9])[0-9]/g;
    const pas = newReg.test(password);

    return pas;
  };
  isCheckBoxChecked = () => {
    if (
      this.state.applicantEntries.value !== "Yes" ||
      this.state.applicantEntries.value !== "No"
    ) {
      return true;
    } else {
      return false;
    }
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
      eightCharactersColor,
      matchColor,
      containUppercaseColor,
      containLowercaseColor,
      containNumberColor
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
                  onKeyUp={() =>
                    setTimeout(() => {
                      this.passwordValidation(password, confirmPassword);
                    }, 50)
                  }
                  onChange={this.handleChange}
                >
                  <Icon name="undo alternate" color="blue" />
                  <input />
                </Form.Field>
                {active === false ? null : (
                  <Message>
                    <p style={{ color: eightCharactersColor }}>
                      password Must be at least 8 characters
                    </p>
                    <p style={{ color: matchColor }}>Matching Passwords</p>
                    <p style={{ color: containUppercaseColor }}>
                      Password Contain at least 1 Uppercase letter
                    </p>
                    <p style={{ color: containLowercaseColor }}>
                      Password Contain at least 1 Lowercase letter
                    </p>
                    <p style={{ color: containNumberColor }}>
                      Password Contain at least 1 Number letter
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
                <Form.Group inline required>
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
                  {this.state.checkboxErr ? (
                    <Message> you have to choose</Message>
                  ) : null}
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
