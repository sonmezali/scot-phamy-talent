import React from "react";
import {
  Button,
  Header,
  Segment,
  Image,
  Grid,
  Divider
} from "semantic-ui-react";
import { getLoggedInUserData } from "../../utils/storage";
import OpportunityCard from "../Opportunities/OpportunityCard";

export default ({
  companyData,
  opportunitiesArray,
  userId,
  handleEditOpportunity,
  confirmDeleteOpportunity
}) => {
  return (
    <React.Fragment>
      <Segment style={{ background: "#bce0fd" }}>
        <Image
          centered
          size="tiny"
          src={
            companyData && companyData.logo_url
              ? companyData.logo_url
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
          alt="Company Logo"
        />
        <Header textAlign="center" as="h3">
          {companyData && companyData.company_name}
        </Header>
        <Header textAlign="center" as="h3">
          Location: {companyData && companyData.location}
        </Header>
      </Segment>
      <Segment centered basic>
        <a href={`mailto: ${companyData && companyData.email}`}>
          <Button primary size="large">
            Contact
          </Button>
        </a>
      </Segment>
      <Segment>
        <Header as="h3">About Company</Header>

        <p>{companyData && companyData.company_description}</p>
      </Segment>
      <Grid stackable>
        <Grid.Row columns={3} stretched>
          {opportunitiesArray &&
            opportunitiesArray.map(opportunity => (
              <Grid.Column key={opportunity.opportunity_id}>
                <OpportunityCard
                  date
                  contactPerson
                  opportunity={opportunity}
                  cardButtons={
                    Number(getLoggedInUserData().user.user_id) ===
                    Number(userId)
                      ? true
                      : false
                  }
                  handleEditOpportunity={handleEditOpportunity}
                  ConfirmDelete={confirmDeleteOpportunity}
                />

                <br></br>
              </Grid.Column>
            ))}
          <Divider></Divider>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};
