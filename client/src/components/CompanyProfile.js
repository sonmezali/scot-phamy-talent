import React from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Button,
  Header,
  Menu,
  Dropdown,
  Image,
  Grid,
  Segment
} from "semantic-ui-react";
import { getCompanyProfile } from "../api/companyProfile";
import { getOpportunitiesByCompanyId } from "../api/opportunities";
import OpportunityCard from "./OpportunityCard";
import { getLoggedInUserData } from "../utils/storage";
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
    userId:
      (window.location.pathname.includes("/company-profile/") &&
        window.location.pathname.replace("/company-profile/", "")) ||
      null,
    companyData: {},
    opportunitiesArray: []
  };

  getOpportunitiesForCompanyProfileByCompanyId = () => {
    const { userId } = this.state; // will get company id from company login
    getOpportunitiesByCompanyId(userId).then(opportunities =>
      this.setState({
        opportunitiesArray: opportunities
      })
    );
  };

  getCompanyProfileData = () => {
    const { userId } = this.state; // will get company id from company login
    getCompanyProfile(userId).then(companyData => {
      this.setState({ companyData: companyData });
    });
  };

  componentDidMount() {
    this.getCompanyProfileData();
    this.getOpportunitiesForCompanyProfileByCompanyId();
  }
  // Handlers
  handleEditOpportunity = () => {
    return "/company/manage-profile";
  };

  handleDeleteOpportunity = () => {
    return "....";
  };

  render() {
    const { companyData, opportunitiesArray, userId } = this.state;
    if (userId === null || !userId) {
      return null;
    }
    return (
      <React.Fragment>
        <Divider horizontal>
          <Menu compact>
            <Dropdown
              clearable
              text="Your Profile"
              options={options}
              selection
            />
          </Menu>
        </Divider>
        <Segment style={{ background: "#bce0fd" }}>
          <Image
            centered
            size="tiny"
            src={companyData.logo_url}
            alt="Company Logo"
          />
          <Header textAlign="center" as="h3">
            {companyData.company_name}
          </Header>
          <Header textAlign="center" as="h3">
            Location: {companyData.location}
          </Header>
        </Segment>

        <Segment centered basic>
          <a href={`mailto: ${companyData.email}`}>
            <Button primary size="large">
              Contact
            </Button>
          </a>
        </Segment>
        <Segment>
          <Header as="h3">About Company</Header>

          <p>{companyData.company_description}</p>
        </Segment>
        <Grid stackable>
          <Grid.Row columns={3} stretched>
            {opportunitiesArray.map(opportunity => (
              <Grid.Column key={opportunity.opportunity_id}>
                <OpportunityCard
                  opportunity={opportunity}
                  options={
                    getLoggedInUserData().user.user_id == this.state.userId
                      ? true
                      : false
                  }
                  handleDeleteOpportunity={this.handleDeleteOpportunity}
                  handleEditOpportunity={this.handleEditOpportunity}
                />

                <br></br>
              </Grid.Column>
            ))}
            <Divider></Divider>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CompanyProfile;
