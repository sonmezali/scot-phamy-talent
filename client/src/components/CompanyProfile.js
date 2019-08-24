import React from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Grid,
  List,
  Column,
  Button,
  Header,
  Image,
  Segment,
  Divider
} from "semantic-ui-react";


class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunityTitle: "",
      contactName: "",
      location: "",
      industry: [],
      expiringDate: ""
    };
  }

  handleClickEdit = () => {};

  handleClickDelete = () => {};

  render() {
    return (
      
      <div class="ui segment">
        <Container>
          <Container text style={{ marginTop: "5em" }} border={{}}>
            <Image src="data:image/png;base64,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" size="small" circular background="grey"
     alignItems="center"/>
     <Divider horizontal>
           <h1>Company Name</h1>
           <h2>Location</h2>
           </Divider>
           
           <Divider horizontal>
           <h3>Contact</h3>
           </Divider>
     <div>
           <h4>About Company</h4>
           <p> Global leader in financial services, offering solutions
               to the world's most important corporations, governments and 
               institutions in more than 100 countries. 
               We also lead volunteer service activities for employees in 
               local communities by utilizing our many resources, 
               including those that stem from access to capital, 
               economies of scale, global reach and expertise.
           </p>
     </div>
     <Divider horizontal>
              <Header as="h4">Profile</Header>
            </Divider>
            <Grid>
              <Grid.Column width={3}>
                <h4>Opportunity Title:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <p>{this.state.opportunityTitle}</p>
                </Segment>
              </Grid.Column>
            </Grid>

            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>Contact Name:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <p>{this.state.contactName}</p>
                </Segment>
              </Grid.Column>
            </Grid>
            <Divider />

            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>location:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <p>{this.state.location}</p>
                </Segment>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>Industry:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <ul>
                    {this.state.industry.map(element => (
                      <li>{element}</li>
                    ))}
                  </ul>
                </Segment>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>Expiring Date:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>{this.state.expiringDate}</Segment>
              </Grid.Column>
              <p>
                 Excepteur sint occaecat cupidatat non proident,
                 sunt in culpa qui officia deserunt mollit anim.
              </p>
            </Grid>
          </Container>
          <Container style={{ align: "right", margin: "50px" }}>
            <Button onClick={this.handleClickEdit} primary>
              Edit Profile
            </Button>
            <Button onClick={this.handleClickDelete} secondary>
              Delete Profile
            </Button>
          </Container>
        </Container>
      </div>
    );
  }
}

export default CompanyProfile;