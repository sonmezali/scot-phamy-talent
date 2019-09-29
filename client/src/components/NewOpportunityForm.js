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
  Divider,
  Message
} from "semantic-ui-react";
import validateCreateOpportunityForm from "../utils/cerateOpportunityValidation";
import { getCities } from "../api/cities";
import { getSkills } from "../api/skills";
import { createNewOpportunity } from "../api/opportunities";
import { opportunityType } from "../utils/constants";
import { getCompanyIdForCompanyRegister } from "../api/companies";
import { getLoggedInUserData } from "../utils/storage";

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
      type: null,
      skills: [],
      company_id: null
    },
    cities: [],
    skillsArray: [],
    success: "",
    open: false,
    formErrors: {}
  };
  close = () => this.setState({ open: false });
  //Getting data
  getCompanyId = () => {
    const id = getLoggedInUserData().user.user_id;
    getCompanyIdForCompanyRegister(id).then(res => {
      console.log(res);
      const companyId = res[0].company_id;
      console.log(companyId);
      this.setState({
        formEntries: { company_id: companyId }
      });
    });
  };
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skillsArray: response.map(skill => ({
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
    this.getCompanyId();
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
    const { type, skills, city } = this.state.formEntries;
    const form = { type, skills, city };
    const result = validateCreateOpportunityForm(form);
    const { valid } = result;

    if (valid) {
      createNewOpportunity(this.state.formEntries).then(res => {
        this.setState({ success: res.success });
        if (this.state.success) {
          this.setState({ open: true });
          this.clearForm();
        } else {
          return this.setState({ open: true, success: false });
        }
      });
    } else {
      return this.setState({ formErrors: result });
    }
  };
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
        ...this.state.formEntries,
        name: "",
        description: "",
        contactPerson: "",
        telephone: "",
        email: "",
        city: null,
        date: "",
        type: "",
        skills: []
      }
    });
  };

  render() {
    console.log(this.state.formEntries.company_id);
    const {
      name,
      description,
      contactPerson,
      telephone,
      email,
      city,
      date,
      type,
      skills
    } = this.state.formEntries;
    const { cities, skillsArray, success, open, formErrors } = this.state;
    const {
      handleChange,
      close,
      handlePost,
      handleSelectCity,
      handleSelectOppType,
      handleSelectSkill,
      clearForm
    } = this;
    return (
      <div style={{ margin: "10px" }}>
        <Form onSubmit={handlePost}>
          <Grid centered stackable columns={1}>
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
                  value={name}
                  name="name"
                  onChange={handleChange}
                >
                  <input />
                  <Icon name="pencil alternate" />
                </Form.Field>
                <Form.Field
                  label="Description"
                  control={TextArea}
                  placeholder="opportunity Details"
                  name="description"
                  value={description}
                  required
                  onChange={handleChange}
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
                    value={contactPerson}
                    required
                    onChange={handleChange}
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
                    value={telephone}
                    required
                    onChange={handleChange}
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
                    value={email}
                    required
                    onChange={handleChange}
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
                    value={city}
                    options={cities}
                    onChange={handleSelectCity}
                  />
                  {formErrors.validateSelectCity === false ? (
                    <Message negative>
                      Please Select This Opportunity Location
                    </Message>
                  ) : null}
                  <Form.Field
                    control={Input}
                    label="Expiry Date"
                    type="date"
                    placeholder="Expiry date"
                    iconPosition="left"
                    required
                    search
                    value={date}
                    name="date"
                    onChange={handleChange}
                  >
                    <Icon name="calendar alternate" />
                    <input />
                  </Form.Field>
                  <Form.Dropdown
                    label="Opportunity Type"
                    options={opportunityType}
                    search
                    selection
                    value={type}
                    required
                    placeholder="Select Opportunity Type"
                    onChange={handleSelectOppType}
                  />
                  {formErrors.validateSelectSkills === false ? (
                    <Message negative>
                      Please Select The Type Of Opportunity
                    </Message>
                  ) : null}
                </Form.Group>
                <Form.Dropdown
                  label="Skills"
                  onChange={handleSelectSkill}
                  options={skillsArray}
                  name="skills"
                  multiple
                  selection
                  required
                  value={skills}
                  placeholder="Select Skills"
                />
                {formErrors.validateSelectType === false ? (
                  <Message negative>
                    Please Select Skills Needed for This Opportunity at Least
                    One skill
                  </Message>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Form.Group>
              <Form.Button fluid basic onClick={clearForm}>
                Cancel
              </Form.Button>
              <Form.Button lapel="Submit" primary fluid>
                Post Opportunity
              </Form.Button>
            </Form.Group>

            <Grid.Row width={16}>
              {success === true && (
                <Modal open={open} onClose={close} closeIcon basic size="small">
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
                      onClick={close}
                    />
                  </Modal.Actions>
                </Modal>
              )}
              {success === false && (
                <Modal basic open={open} onClose={close} closeIcon>
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
                      onClick={close}
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
