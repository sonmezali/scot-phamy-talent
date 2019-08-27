import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Header,
  Divider,
  Menu,
  Dropdown
} from "semantic-ui-react";
import { getCompanyProfile } from "../api/companyProfile";
const options = [
  {
    key: 1,
    text: (
      <Menu.Item as={Link} to="/company/manage-profile">
        Edit Profile
      </Menu.Item>
    ),
    value: 1
  },
  {
    key: 2,
    text: (
      <Menu.Item as={Link} to="/company/manage-profile">
        Delete Profile
      </Menu.Item>
    ),
    value: 2
  },
  {
    key: 3,
    text: (
      <Menu.Item as={Link} to="/company/manage-profile">
        Change Password
      </Menu.Item>
    ),
    value: 3
  },

  {
    key: 4,
    text: (
      <Menu.Item as={Link} to="/company/manage-profile">
        Add Opportunity
      </Menu.Item>
    ),
    value: 4
  }
];

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      aboutCompany: "",
      opportunityTitle: "",
      contactName: "",
      opportunityDescription: "",
      industry: "",
      contact: "",
      date: ""
    };
  }

  componentDidMount() {
    const companyId = 1; // will get company id from company login
    getCompanyProfile(companyId).then(data => {
      console.log("company_name", data);
      // console.log("this is data", data)
      this.setState({
        companyName: data.company_name,
        aboutCompany: data.company_description,
        industry: data.industry,
        opportunityTitle: data.opportunity_title,
        contactName: data.contact_person,
        date: data.date,
        opportunityDescription: data.opportunity_description,
        contact: data.email
      });
    });
  }

  handleClickEdit = () => {
    console.log("something");
    return "/company/managa-profile";
  };

  handleClickDelete = () => {
    return "....";
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        <Dropdown clearable text="Your Profile" options={options} selection />

        <Header as="h1">{this.state.companyName}</Header>
        <Divider></Divider>

        <a href={`mailto: ${this.state.contact}`}>
          <Button primary>Contact</Button>
        </a>
        <Header as="h2">{this.state.contact}</Header>

        <Divider></Divider>
        <h5>About Company</h5>
        <Header as="h3">{this.state.aboutCompany}</Header>

        <Header as="h4">{this.state.opportunityTitle}</Header>
        <Header as="h5">{this.state.contactName}</Header>
        <Header as="h6">{this.state.date}</Header>
        <Header as="h7">{this.state.opportunityDescription}</Header>
        <Divider></Divider>
        <Button onClick={this.handleClickEdit} primary>
          Edit
        </Button>
        <Button onClick={this.handleClickDelete} secondary>
          Delete
        </Button>
      </Container>
    );
  }
}

export default CompanyProfile;
