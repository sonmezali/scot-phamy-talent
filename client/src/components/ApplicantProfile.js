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

class ApplicantProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      skills: [],
      city: ""
    };
  }

  componentDidMount() {
    fetch()
      .then(res => res.json())
      .then(data =>
        this.setState({
          name: data.name,
          email: data.email,
          skills: data.skills,
          city: data.skils
        })
      );
  }

  handleClickEdit = () => {};

  handleClickDelete = () => {};

  render() {
    return (
      <div class="ui segment">
        <Container>
          <Container text style={{ marginTop: "5em" }} border={{}}>
            <Divider horizontal>
              <Header as="h4">Profile</Header>
            </Divider>

            <Grid>
              <Grid.Column width={3}>
                <h4>Name:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <p>{this.state.name}</p>
                </Segment>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>E Mail:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <p>{this.state.email}</p>
                </Segment>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>Skills:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>
                  <ul>
                    {this.state.skills.map(element => (
                      <li>{element}</li>
                    ))}
                  </ul>
                </Segment>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Column width={3}>
                <h4>City:</h4>
              </Grid.Column>

              <Grid.Column width={9}>
                <Segment secondary>{this.state.city}</Segment>
              </Grid.Column>
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

export default ApplicantProfile;
