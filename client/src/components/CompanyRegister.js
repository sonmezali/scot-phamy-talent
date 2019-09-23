import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  TextArea,
  Modal,
  Icon,
  Grid,
  Header
} from "semantic-ui-react";
import { getCities } from "../api/cities";

import { validateCompanyRegisterForm } from "../utils/formValidation";
import { companyRegister } from "../api/companies";
import { industryList } from "../utils/constants";
import {
  ValidatedFormInput,
  ValidatedFormDropDown
} from "./ValidatedFormFields";

class CompanyRegister extends Component {
  state = {
    companyProfile: {
      role: "company",
      name: "",
      description: "",
      industry: null,
      logo_url: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: null,
      user_id: ""
    },
    formErrors: {},
    successServerStatus: false,
    openSubmitStatusMsg: false,
    citiesData: []
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      companyProfile: { ...this.state.companyProfile, city: selectedCity }
    });
  };
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
  componentDidMount() {
    this.getAllCities();
  }
  handleSubmit = e => {
    e.preventDefault();
    const result = validateCompanyRegisterForm(this.state.companyProfile);
    const { valid } = result;
    if (valid) {
      companyRegister(this.state.companyProfile).then(res => {
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

  handleCloseFail = () => this.setState({ openSubmitStatusMsg: false });
  handleCloseSuccess = () => {
    this.setState({ openSubmitStatusMsg: false });
    this.resetForm();
  };
  handleIndustry = (event, data) => {
    const { value: selectedIndustries } = data;
    this.setState({
      companyProfile: {
        ...this.state.companyProfile,
        industry: selectedIndustries
      }
    });
  };

  resetForm = e => {
    this.setState({
      companyProfile: {
        role: "company",
        name: "",
        description: "",
        industry: null,
        logo_url: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: null,
        user_id: ""
      },
      formErrors: {},
      successServerStatus: false,
      openSubmitStatusMsg: false,
      citiesData: []
    });
  };

  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;

    this.setState(function(prevState) {
      const newEntries = prevState.companyProfile;
      newEntries[property] = value;
      return { companyProfile: newEntries };
    });
  };
  render() {
    const {
      name,
      description,
      industry,
      logo_url,
      email,
      password,
      city,
      confirmPassword
    } = this.state.companyProfile;
    const {
      formErrors,
      successServerStatus,
      openSubmitStatusMsg,
      citiesData
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Grid centered stackable columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" textAlign="center">
                  Create New Company
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column>
                <Form.Field
                  label="Company Name"
                  control={Input}
                  placeholder="Company Name"
                  required
                  value={name}
                  name="name"
                  onChange={this.handleChange}
                >
                  <input />
                </Form.Field>
                <Form.Field
                  control={Input}
                  label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={this.handleChange}
                >
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
                  floated="left"
                  label="Company Description"
                  control={TextArea}
                  placeholder="Company Description"
                  name="description"
                  value={description}
                  required
                  onChange={this.handleChange}
                ></Form.Field>
                <ValidatedFormDropDown
                  label="Industry"
                  name="industry"
                  options={industryList}
                  search
                  selection
                  value={industry}
                  valid={formErrors.industryIsSelected}
                  validationMessage="Industry Is Not Selected"
                  required
                  placeholder="Select Industry"
                  onChange={this.handleIndustry}
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
                  options={citiesData}
                  onChange={this.handleSelectCity}
                />

                <Form.Field
                  label="Logo URL"
                  control={Input}
                  type="text"
                  placeholder="Enter your Company logo URL"
                  name="logo_url"
                  value={logo_url}
                  onChange={this.handleChange}
                >
                  <input />
                </Form.Field>
                <Button type="submit" primary fluid>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {successServerStatus && (
            <Modal
              open={openSubmitStatusMsg}
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
          {!successServerStatus && (
            <Modal
              basic
              open={openSubmitStatusMsg}
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

export default CompanyRegister;
