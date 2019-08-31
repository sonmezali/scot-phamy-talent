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

class NewCompanyForm extends Component {
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
        console.log(data);
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
        this.setState({ success: false, error: err });
      });
  };

  handleIndustry = (event, data) => {
    const selectedIndustries = data.value;
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
    const property = event.target.name;
    const value = event.target.value;
    this.setState(function(prevState) {
      const newEntries = prevState.companyProfile;
      newEntries[property] = value;
      return { companyProfile: newEntries };
    });
  };
  render() {
    console.log(this.state.companyProfile);

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Grid.Row mobile={16} tablet={8} computer={4}>
            <Grid.Column width={15}>
              <Header as="h1" textAlign="center">
                Create New Company
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Form.Field
            label="Company Name"
            control={Input}
            iconPosition="left"
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
            iconPosition="left"
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
          <Button
            type="submit"
            primary
            // onClick={this.state.success === true ? this.resetForm : null}
          >
            Submit
          </Button>
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
        </Form>
      </div>
    );
  }
}

export default NewCompanyForm;
