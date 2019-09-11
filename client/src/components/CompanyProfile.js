import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Header,
  Menu,
  Dropdown,
  Card,
  Image,
  Grid,
  Segment
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
      <Menu.Item as={Link} to="/company/manage-opportunities">
        Add Opportunity
      </Menu.Item>
    ),
    value: 4
  }
];

class CompanyProfile extends React.Component {
  state = {
    companyName: "",
    aboutCompany: "",
    opportunityTitle: "",
    contactName: "",
    opportunityDescription: "",
    industry: "",
    contact: "",
    date: "",
    companyId: null
  };

  componentWillMount() {
    const { pathname } = window.location;
    this.setState({
      companyId: pathname && pathname.replace("/company-profile/", "")
    });
  }
  componentDidMount() {
    const { companyId } = this.state; // will get company id from company login
    getCompanyProfile(companyId).then(data => {
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
    return "/company/manage-profile";
  };

  handleClickDelete = () => {
    return "....";
  };

  render() {
    return (
      <Container text style={{ marginTop: "4em" }} border={{}} align="center">
        <Dropdown clearable text="Your Profile" options={options} selection />
        <Card centered style={{ background: "#bce0fd" }}>
          <Card.Content textAlign="center">
            <Image
              size="tiny"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_fNsF06WAgkNbqeLtIKBcnA1zZ_gPPXPmdchvEliAAyxmYVKM4w"
              alt="Company Logo"
            />
            <Header as="h3">{this.state.companyName}</Header>
            <Header as="h3">Location</Header>
          </Card.Content>
        </Card>
        <Grid centered>
          <Segment basic>
            <a href={`mailto: ${this.state.contact}`}>
              <Button primary size="large">
                Contact
              </Button>
            </a>
          </Segment>
        </Grid>
        <Card centered>
          <Card.Content>
            <Card.Header>
              <Header as="h3">About Company</Header>
            </Card.Header>

            <Card.Description>
              <p>{this.state.aboutCompany}</p>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card centered>
          <Card.Header>
            <Segment basic style={{ background: "#f1f9ff" }}>
              <Grid columns={2}>
                <Grid.Column>
                  <Header as="h3">Opportunity Title</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h5">{this.state.opportunityTitle}</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">
                    Contact Name
                    <Header as="h5">{this.state.contactName}</Header>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">
                    Expiring Date
                    <Header as="h6">{this.state.date}</Header>
                  </Header>
                </Grid.Column>
              </Grid>
            </Segment>
          </Card.Header>
          <Card.Description>
            <Segment basic>
              <p>{this.state.opportunityDescription}</p>
            </Segment>
          </Card.Description>
          <Card.Content extra style={{ background: "#bce0fd" }}>
            <Grid columns={2}>
              <Grid.Column>
                <Button onClick={this.handleClickEdit} primary>
                  Edit
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={this.handleClickDelete} secondary>
                  Delete
                </Button>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default CompanyProfile;
