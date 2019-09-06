import React, { Component } from "react";
import {
  Form,
  Input,
  Dropdown,
  Button,
  TextArea,
  Message,
  Grid,
  Header
} from "semantic-ui-react";

import { companyRegister } from "../api/companies";
import { industryList } from "../utils/constants";

class CompanyRegister extends Component {
  state = {
    companyProfile: {
      name: "",
      description: "",
      industry: [],
      email: "",
      password: "",
      user_id: ""
    },
    error: null,
    success: null
  };

  handleSubmit = e => {
    e.preventDefault();

    companyRegister(this.state.companyProfile)
      .then(data => {
        if (data.success) {
          this.setState({
            companyProfile: {
              name: "",
              description: "",
              industry: [],
              email: "",
              password: ""
            },
            success: true
          });
        } else {
          this.setState({});
        }
        this.resetForm(data.success);
      })
      .catch(err => {
        this.setState({ success: false, error: err || "error" });
      });
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

  resetForm = success => {
    this.setState({
      companyProfile: {
        name: "",
        description: "",
        industry: [],
        email: "",
        password: ""
      },
      success: success
    });
  };
  handleChange = event => {
    const { target } = event;
    const { name: property } = target;
    const { value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.companyProfile;
      newEntries[property] = value;
      return { companyProfile: newEntries };
    });
  };
  render() {
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
                  value={this.state.companyProfile.name}
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
                  value={this.state.companyProfile.email}
                  required
                  onChange={this.handleChange}
                >
                  <input />
                </Form.Field>
                <Form.Field
                  label="Password"
                  control={Input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.companyProfile.password}
                  required
                  onChange={this.handleChange}
                >
                  <input />
                </Form.Field>
                <Form.Field
                  floated="left"
                  label="Company Description"
                  control={TextArea}
                  placeholder="Company Description"
                  name="description"
                  value={this.state.companyProfile.description}
                  required
                  onChange={this.handleChange}
                ></Form.Field>
                <Form.Field>
                  <label> Select Industry</label>
                  <Dropdown
                    label="Industry"
                    options={industryList}
                    search
                    selection
                    value={this.state.companyProfile.industry}
                    required
                    placeholder="Select Industry"
                    onChange={this.handleIndustry}
                  />
                </Form.Field>
                <Button type="submit" primary fluid>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row width={15}>
              {this.state.success === true && (
                <Message positive>
                  <Message.Header>
                    Company Profile Created successfully
                  </Message.Header>
                </Message>
              )}
              {this.state.success === false && (
                <Message negative>
                  <Message.Header>Something went Wrong</Message.Header>
                  <p>check Your Form</p>
                </Message>
              )}
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default CompanyRegister;
