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
import { opportunityType } from "../../utils/constants";
import { getSkills } from "../../api/skills";
import { getCities } from "../../api/cities";
import { updateOpportunity } from "../../api/opportunities";
import moment from "moment";

class EditOpportunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunityId: this.props.opportunityId,
      formEntries: {
        name: this.props.opportunity.opportunity_title,
        description: this.props.opportunity.description,
        contactPerson: this.props.opportunity.contact_person,
        telephone: this.props.opportunity.telephone,
        email: this.props.opportunity.email,
        city: this.props.opportunity.cityid,
        date: this.props.opportunity.date,
        type: this.props.opportunity.type,
        skills: this.props.opportunity.skillsId
      },
      successServerStatus: false,
      openSubmitStatusMsg: false,
      skillsData: [],
      citiesData: []
    };
  }

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

  handleSelectOppType = (e, data) => {
    const selectedOpp = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, type: selectedOpp }
    });
  };
  handleCloseFail = () => this.setState({ openSubmitStatusMsg: false });
  handleCloseSuccess = () => {
    this.setState({ openSubmitStatusMsg: false });
    return window.location.reload();
  };
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      formEntries: {
        ...this.state.formEntries,
        skills: selectedSkill
      }
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      formEntries: {
        ...this.state.formEntries,
        city: selectedCity
      }
    });
  };
  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.formEntries;
      newEntries[property] = value;
      return { formEntries: newEntries };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    updateOpportunity(this.state.opportunityId, this.state.formEntries).then(
      res => {
        this.setState({ successServerStatus: res.success });
        if (this.state.successServerStatus) {
          this.setState({ openSubmitStatusMsg: true });
        } else {
          return this.setState({
            successServerStatus: false,
            openSubmitStatusMsg: true
          });
        }
      }
    );
  };

  render() {
    const {
      formEntries: {
        name,
        description,
        contactPerson,
        telephone,
        email,
        city,
        date,
        type,
        skills
      },
      successServerStatus,
      openSubmitStatusMsg,
      skillsData,
      citiesData
    } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleSelectCity,
      handleSelectOppType,
      handleSelectSkill,
      clearForm
    } = this;
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Grid centered stackable columns={1}>
            <Grid.Row mobile={16} tablet={8} computer={4}>
              <Grid.Column width={15}>
                <Header as="h1" textAlign="center">
                  {" "}
                  Edit Opportunity
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
                    options={citiesData}
                    onChange={handleSelectCity}
                  />

                  <Form.Field
                    control={Input}
                    label="Expiry Date"
                    type="date"
                    placeholder="Expiry date"
                    iconPosition="left"
                    required
                    search
                    value={moment(date).format("YYYY-MM-DD")}
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
                </Form.Group>
                <Form.Dropdown
                  label="Skills"
                  onChange={handleSelectSkill}
                  options={skillsData}
                  name="skills"
                  multiple
                  selection
                  required
                  value={skills}
                  placeholder="Select Skills"
                />
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
          </Grid>
        </Form>
        {successServerStatus && (
          <Modal
            open={openSubmitStatusMsg}
            onClose={this.handleCloseSuccess}
            closeIcon
            basic
            size="small"
          >
            <Modal.Header> Application Edited successfully</Modal.Header>
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
            open={this.state.openSubmitStatusMsg}
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
      </div>
    );
  }
}

export default EditOpportunity;
