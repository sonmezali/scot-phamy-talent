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
import { getCompanyProfile } from "../api/companyProfile";


class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunityTitle: "",
      contactName: "",
      location: "",
      industry: [],
      email: "",
      expiringDate: ""
    };
  }


componentDidMount() {
  const companyId= 1 // will get company id from company login
   getCompanyProfile(companyId) .then(data =>{
    console.log("this is data", data)
      this.setState({
        
        opportunityTitle: data.opportunityTitle,
        contactName: data.name,
        location: data.location,
        industry: data.industry,
        expiryDate: data.expiringDate
      })}
    );
}

  handleClickEdit = () => {

    console.log("something")
    return "/company/managa-profile"
  };

  handleClickDelete = () => {

    return "...."
  };

  render() {
    return (
      
      <div class="ui segment">
        <Container>
          <Container text style={{ marginTop: "5em" }} border={{}}>
          <Divider horizontal>
          <h2>Company Logo</h2>
           <h1>Company Name</h1>
           <h2>Location</h2>
           </Divider>
           
           <Divider horizontal>
          <segment><a href={`mailto: ${this.state.email}`}>
               <Button primary>Contact</Button>
             </a></segment>

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
                <Segment secondary> {this.state.industry}</Segment>
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