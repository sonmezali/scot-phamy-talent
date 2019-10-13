import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Grid,
  Header,
  Segment,
  Button,
  Modal
} from "semantic-ui-react";
import { ValidatedFormInput } from "./ValidatedFormFields";
import { getLoggedInUserData } from "../../utils/storage";
import { getUserById, changePassword } from "../../api/users";
import { validateChangePasswordForm } from "../../utils/formValidation";

const userId = getLoggedInUserData() && getLoggedInUserData().user.user_id;

export default class ChangePassword extends Component {
  state = {
    formEntries: {
      email: "",
      newPassword: "",
      oldPassword: "",
      confirmNewPassword: ""
    },
    formErrors: {},
    userData: [],
    openSubmitStatusMsg: false,
    successServerStatus: false
  };

  getUserDate = () => {
    getUserById(userId) &&
      getUserById(userId).then(userData =>
        this.setState({ userData: userData })
      );
  };
  componentDidMount() {
    this.getUserDate();
  }
  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.formEntries;
      newEntries[property] = value;
      return { formEntries: newEntries };
    });
  };
  clearForm = () => {
    this.setState({
      formEntries: {
        email: "",
        newPassword: "",
        oldPassword: "",
        confirmNewPassword: ""
      },
      formErrors: {},
      userData: [],
      openSubmitStatusMsg: false,
      successServerStatus: false
    });
  };
  handleCloseSuccess = () => {
    this.setState({ openSubmitStatusMsg: false });
    this.clearForm();
  };

  handleSubmit = e => {
    const newPasswordEntry = this.state.formEntries.newPassword;
    const currentPassword = this.state.userData.password;
    const currentEmail = this.state.userData.email;
    const currentValues = { currentPassword, currentEmail };
    e.preventDefault();

    const result = validateChangePasswordForm(
      this.state.formEntries,
      currentValues
    );
    const { valid } = result;
    if (valid) {
      changePassword(userId, newPasswordEntry).then(res => {
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
    } else {
      return this.setState({
        formErrors: result
      });
    }
  };
  render() {
    const {
      formEntries: { email, newPassword, oldPassword, confirmNewPassword },
      formErrors,
      successServerStatus,
      openSubmitStatusMsg
    } = this.state;
    const { handleChange, handleSubmit, handleCloseSuccess } = this;
    return (
      <Grid centered>
        <Grid.Row columns={1}>
          <Header as="h1">Change Password</Header>
        </Grid.Row>
        <Segment color="blue" size="mini">
          <Grid.Row columns={1}>
            <Form onSubmit={handleSubmit}>
              <ValidatedFormInput
                control={Input}
                label="email"
                value={email}
                type="email"
                valid={formErrors.validCurrentEmail}
                validationMessage="This is not your email"
                placeholder="email"
                iconPosition="left"
                name="email"
                required
                onChange={handleChange}
              >
                <Icon name="at" color="blue" />
                <input />
              </ValidatedFormInput>
              <ValidatedFormInput
                control={Input}
                label="Old Password"
                value={oldPassword}
                type="password"
                valid={formErrors.validOldPasswordCurrent}
                validationMessage="Wrong Password"
                placeholder="Old Password"
                iconPosition="left"
                name="oldPassword"
                required
                onChange={handleChange}
              >
                <Icon name="lock" color="blue" />
                <input />
              </ValidatedFormInput>
              <ValidatedFormInput
                control={Input}
                fluid
                label="New Password"
                value={newPassword}
                type="password"
                valid={formErrors.validPassword}
                validationMessage="Password Must Have At Least 8 Character And Contain At Least One UpperCase , LowerCase,Number"
                placeholder="newPassword"
                iconPosition="left"
                name="newPassword"
                required
                onChange={handleChange}
              >
                <Icon name="lock" color="green" />
                <input />
              </ValidatedFormInput>
              <ValidatedFormInput
                control={Input}
                label="Confirm New Password"
                value={confirmNewPassword}
                type="Password"
                placeholder="Confirm Password"
                iconPosition="left"
                valid={formErrors.validConfirmPassword}
                validationMessage="Passwords Are Not Matching"
                name="confirmNewPassword"
                required
                onChange={handleChange}
              >
                <Icon name="undo alternate" color="green" />
                <input />
              </ValidatedFormInput>
              <Button fluid primary>
                submit
              </Button>
            </Form>
          </Grid.Row>
        </Segment>
        {successServerStatus === true && (
          <Modal
            open={openSubmitStatusMsg}
            onClose={handleCloseSuccess}
            basic
            size="small"
          >
            <Header icon="browser" content="Password changes successfully" />
            <Modal.Actions>
              <Button color="green" onClick={handleCloseSuccess} inverted>
                <Icon name="checkmark" /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </Grid>
    );
  }
}
