import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Header,
  Divider,
  Menu,
  Dropdown,
 
} from "semantic-ui-react";
import { getCompanyProfile } from "../api/companyProfile";
const options = [
  { key: 1, text: <Menu.Item as={Link} to="/company/manage-profile">
  Edit Profile
</Menu.Item> , value: 1 },
  { key: 2, text: <Menu.Item as={Link} to="/company/manage-profile">
Delete Profile
</Menu.Item>, value: 2 },
  { key: 3, text: <Menu.Item as={Link} to="/company/manage-profile">
  Change Password
</Menu.Item>, value: 3 },

{ key: 4, text: <Menu.Item as={Link} to="/company/manage-profile">
Add Opportunity
</Menu.Item>, value: 4 },


]


class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      description: "",
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
    console.log("company_name", data)
    // console.log("this is data", data)
      this.setState({
        companyName: data.name,
        city: data.city,
        description: data.discription
        
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
          <Dropdown clearable text="Your Profile" options={options} selection />
          <Divider horizontal>
              <Header as="h1">{this.state.companyName}</Header>
              <Header as="h2">{this.state.city}</Header>
           </Divider>
           
           <Divider horizontal>
          <segment><a href={`mailto: ${this.state.email}`}>
               <Button primary>Contact</Button>
             </a></segment>

           </Divider>
     
           <Header as="h3">{this.state.description}</Header>
              
          </Container>
          <Container style={{ align: "right", margin: "50px" }}>
            <Button onClick={this.handleClickEdit} primary>
              Edit 
            </Button>
            <Button onClick={this.handleClickDelete} secondary>
              Delete 
            </Button>
          </Container>
        </Container>
      </div>
    );
  }
}

export default CompanyProfile;