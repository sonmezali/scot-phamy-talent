import React, { Component } from "react";
import {
  Form,
  Grid,
  Header,
  Input,
  TextArea,
  Modal,
  Button
} from "semantic-ui-react";
import { getCities } from "../../api/cities";
import { updateCompanyProfile } from "../../api/companyProfile";

class EditCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editCompanyProfile: {
        name: this.props.companyData.company_name,
        description: this.props.companyData.company_description,
        logo_url: this.props.companyData.logo_url,
        city: this.props.companyData.cityid
      },
      citiesData: [],
      successServerStatus: false,
      openSubmitStatusMsg: false
    };
  }

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

  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      editCompanyProfile: {
        ...this.state.editCompanyProfile,
        city: selectedCity
      }
    });
  };
  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.editCompanyProfile;
      newEntries[property] = value;
      return { editCompanyProfile: newEntries };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    updateCompanyProfile(
      this.props.companyData.company_id,
      this.state.editCompanyProfile
    ).then(res => {
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
  };
  handleCloseFail = () => this.setState({ openSubmitStatusMsg: false });
  handleCloseSuccess = () => {
    this.setState({ openSubmitStatusMsg: false });
    return window.location.reload();
  };
  render() {
    console.log(this.props.companyData.company_id);
    const {
      editCompanyProfile: { name, description, logo_url, city },
      citiesData,
      successServerStatus,
      openSubmitStatusMsg
    } = this.state;
    const {
      handleChange,
      handleSelectCity,
      handleCloseSuccess,
      handleCloseFail
    } = this;
    console.log(this.state.editCompanyProfile);
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Grid centered stackable columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" textAlign="center">
                  Create New Company
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  label="Company Name"
                  control={Input}
                  value={name}
                  placeholder="Company Name"
                  required
                  name="name"
                  onChange={handleChange}
                >
                  <input />
                </Form.Field>
                <Form.Field
                  label="Company Description"
                  control={TextArea}
                  placeholder="Company Description"
                  name="description"
                  value={description}
                  required
                  onChange={handleChange}
                />
                <Form.Select
                  label="Location"
                  name="city"
                  placeholder="Select city"
                  search
                  selection
                  value={city}
                  options={citiesData}
                  onChange={handleSelectCity}
                />
                <Form.Field
                  label="Logo URL"
                  control={Input}
                  type="text"
                  placeholder="Enter your Company logo URL"
                  name="logo_url"
                  value={logo_url}
                  onChange={handleChange}
                ></Form.Field>
                <Form.Button fluid lapel="Submit" primary>
                  Save Changes
                </Form.Button>{" "}
                <Form.Button
                  fluid
                  lapel="Submit"
                  basic
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {successServerStatus && (
            <Modal
              open={openSubmitStatusMsg}
              onClose={handleCloseSuccess}
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
                  onClick={handleCloseSuccess}
                />
              </Modal.Actions>
            </Modal>
          )}
          {!successServerStatus && (
            <Modal
              basic
              open={openSubmitStatusMsg}
              onClose={handleCloseFail}
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
                  onClick={handleCloseFail}
                />
              </Modal.Actions>
            </Modal>
          )}
        </Form>
      </React.Fragment>
    );
  }
}

export default EditCompanyProfile;
