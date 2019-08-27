import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  TextArea,
  Modal,
  Grid,
  Header,
  Divider
} from "semantic-ui-react";
import { getCities } from "../api/cities";
import { getSkills } from "../api/skills";
import { createNewOpportunity } from "../api/opportunities";
import { opportunityType } from "../utils/constants";

class NewOpportunityForm extends Component {
  state = {
    formEntries: {
      name: "",
      description: "",
      contactPerson: "",
      telephone: "",
      email: "",
      city: null,
      date: "",
      type: "",
      skills: [],
      company_id: 1 // hardCoded
    },
    cities: [],
    skills: [],
    success: null,
    open: false
  };
  close = () => this.setState({ open: false });
  //Getting data
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
  getAllCities = () => {
    getCities().then(response => {
      this.setState({
        cities: response.map(city => ({
          key: city.id,
          text: city.city,
          value: city.id
        }))
      });
    });
  };

  componentDidMount() {
    this.getAllCities();
    this.getAllSkills();
  }
  //Handlers
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, skills: selectedSkill }
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, city: selectedCity }
    });
  };
  handleSelectOppType = (e, data) => {
    const selectedOpp = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, type: selectedOpp }
    });
  };

  handlePost = e => {
    e.preventDefault();
    createNewOpportunity(this.state.formEntries).then(res => {
      this.setState({ success: res.success });
      if (res.success === true) {
        this.setState({ open: true });
        this.clearForm();
      }
    });
  };
  handleClose = () => this.setState({ modalOpen: false });
  handleChange = e => {
    const property = e.target.name;
    const value = e.target.value;
    this.setState(function(prevState) {
      const newEntries = prevState.formEntries;
      newEntries[property] = value;
      return { formEntries: newEntries };
    });
  };
  //clear form Entries  after Success
  clearForm = e => {
    this.setState({
      formEntries: {
        name: "",
        description: "",
        contactPerson: "",
        telephone: "",
        email: "",
        city: null,
        date: "",
        type: "",
        skills: [],
        company_id: 1 // hardCoded
      }
    });
  };

  render() {
    return (
      <div style={{ margin: "10px" }}>
        <Form>
          <Grid centered stackable columns={2}>
            <Grid.Row mobile={16} tablet={8} computer={4}>
              <Grid.Column width={15}>
                <Header as="h1" textAlign="center">
                  {" "}
                  Create New Opportunity
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row mobile={16} tablet={8} computer={4}>
              <Grid.Column width={4}>
                <Header as="h3"> Opportunity Details</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form.Field
                  label="Title"
                  control={Input}
                  iconPosition="left"
                  placeholder="Title"
                  required
                  value={this.state.formEntries.name}
                  name="name"
                  onChange={this.handleChange}
                >
                  <input />
                  <Icon name="pencil alternate" />
                </Form.Field>
                <Form.Field
                  label="Description"
                  control={TextArea}
                  placeholder="opportunity Details"
                  name="description"
                  value={this.state.formEntries.description}
                  required
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Divider fitted />
            <Grid.Row mobile={16} tablet={8} computer={4}>
              <Grid.Column width={4}>
                <Header as="h3"> Contact Details</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form.Group>
                  <Form.Field
                    control={Input}
                    label="Contact Person"
                    placeholder="Contact Person"
                    iconPosition="left"
                    name="contactPerson"
                    value={this.state.formEntries.contactPerson}
                    required
                    onChange={this.handleChange}
                  >
                    <Icon name="user" />
                    <input />
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    label="Telephone"
                    type="number"
                    placeholder="Telephone"
                    iconPosition="left"
                    name="telephone"
                    value={this.state.formEntries.telephone}
                    required
                    onChange={this.handleChange}
                  >
                    <Icon name="phone" />
                    <input />
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    label="e-Mail"
                    placeholder="e-Mail"
                    iconPosition="left"
                    name="email"
                    type="email"
                    value={this.state.formEntries.email}
                    required
                    onChange={this.handleChange}
                  >
                    <Icon name="at" />
                    <input />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
            <Divider fitted />
            <Grid.Row mobile={16} tablet={8} computer={4}>
              <Grid.Column width={4}>
                <Header as="h3">Additional Information</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form.Group>
                  <Form.Dropdown
                    label="Location"
                    name="city"
                    placeholder="Select city"
                    search
                    selection
                    required
                    value={this.state.formEntries.city}
                    options={this.state.cities}
                    onChange={this.handleSelectCity}
                  />
                  <Form.Field
                    control={Input}
                    label="Expiry Date"
                    type="date"
                    placeholder="Expiry date"
                    iconPosition="left"
                    required
                    value={this.state.formEntries.date}
                    name="date"
                    onChange={this.handleChange}
                  >
                    <Icon name="calendar alternate" />
                    <input />
                  </Form.Field>
                  <Form.Dropdown
                    label="Opportunity Type"
                    options={opportunityType}
                    search
                    selection
                    value={this.state.formEntries.type}
                    required
                    placeholder="Select Opportunity Type"
                    onChange={this.handleSelectOppType}
                  />{" "}
                </Form.Group>
                <Form.Dropdown
                  label="Skills"
                  onChange={this.handleSelectSkill}
                  options={this.state.skills}
                  name="skills"
                  multiple
                  selection
                  required
                  value={this.state.formEntries.skills}
                  placeholder="Select Skills"
                />
              </Grid.Column>
            </Grid.Row>
            <Form.Group>
              <Form.Button fluid basic onClick={this.clearForm}>
                Cancel
              </Form.Button>
              <Form.Button
                lapel="Submit"
                primary
                fluid
                onClick={this.handlePost}
              >
                Post Opportunity
              </Form.Button>
            </Form.Group>

            <Grid.Row width={16}>
              {this.state.success === true && (
                <Modal
                  open={this.state.open}
                  onClose={this.close}
                  closeIcon
                  basic
                  size="small"
                >
                  <Modal.Header>
                    {" "}
                    Opportunity Submitted successfully
                  </Modal.Header>
                  <Modal.Content>
                    <p>Waiting For approval</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      positive
                      icon="checkmark"
                      labelPosition="right"
                      content="OK"
                      onClick={this.close}
                    />
                  </Modal.Actions>
                </Modal>
              )}
              {this.state.success === false && (
                <Modal
                  basic
                  open={this.state.open}
                  onClose={this.close}
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
                      onClick={this.close}
                    />
                  </Modal.Actions>
                </Modal>
              )}
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default NewOpportunityForm;
