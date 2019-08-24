import React, { Component } from "react";
import { Header, Form, Icon, Input, Grid, Checkbox } from "semantic-ui-react";
import { getSkills } from "../api/skills";
class ApplicantRegister extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });
  state = { Skills: [] };
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skills: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.skill_id
        }))
      });
    });
  };
  componentDidMount() {
    this.getAllSkills();
  }
  render() {
    return (
      <div>
        <Form>
          <Grid centered>
            <Grid.Row centered>
              <Grid.Column width={3}>{"  "}</Grid.Column>
              <Grid.Column width={16}>
                <Header as="h1" textAlign="center">
                  {" "}
                  Applicant Registration
                </Header>
              </Grid.Column>
              <Grid.Column width={3}>{"     "}</Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column width={3}>{"  "}</Grid.Column>
              <Grid.Column width={8}>
                <Form.Field
                  control={Input}
                  label="Name"
                  placeholder="Name"
                  iconPosition="left"
                  name="Name"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="user" color="blue" />
                  <input />
                </Form.Field>
                <Form.Field
                  control={Input}
                  label="Email"
                  type="email"
                  placeholder="Email"
                  iconPosition="left"
                  name="Email"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="at" color="blue" />
                  <input />
                </Form.Field>
                <Form.Field
                  control={Input}
                  label="Password"
                  type="password"
                  placeholder="Password"
                  iconPosition="left"
                  name="Password"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="lock" color="blue" />
                  <input />
                </Form.Field>
                <Form.Field
                  control={Input}
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  iconPosition="left"
                  name="Confirm Password"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="lock" color="blue" />
                  <input />
                </Form.Field>
                <Form.Dropdown
                  label="Skills"
                  onChange={this.handleSelectSkill}
                  options={this.state.skills}
                  name="skills"
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
                  name="LinkToCV"
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
                      checked={this.state.value === "Yes"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="No"
                      name="radioGroup"
                      value="No"
                      checked={this.state.value === "No"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={3}>{"     "}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default ApplicantRegister;
