import React, { Component } from "react";
import { Button, Form, Grid, Header, List, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { signApi } from "../api/auth";
import { getLoggedInUserData, saveLoggedInUserData } from "../utils/storage";
import MatchingApplicantsAndOpportunities from "./MatchingApplicantsAndOppotunities";
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };
  //handlers
  handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    this.setState(function(prevState) {
      const signInEntries = prevState;
      signInEntries[name] = value;
      return { state: signInEntries };
    });
  };
  singIn = () => {
    signApi(this.state.email, this.state.password)
      .then(userData => {
        saveLoggedInUserData(userData);
        document.location.reload();
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };

  render() {
    const { email, password, error } = this.state;
    const { singIn, handleSubmit, handleChange } = this;
    {
      if (
        getLoggedInUserData() &&
        getLoggedInUserData().user.role === "applicant"
      ) {
        return <MatchingApplicantsAndOpportunities />;
      } else {
        return (
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Header as="h2" color="blue" textAlign="center">
                Login to your account
              </Header>
              <Form onSubmit={handleSubmit} size="large">
                <p align="left">Email</p>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />

                <p align="left">Password</p>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                />

                <Button
                  onClick={singIn}
                  value={error}
                  color="blue"
                  fluid
                  size="large"
                >
                  Login
                </Button>
                {error ? <div>Wrong Info. Try Again</div> : null}
              </Form>
              <List divided horizontal>
                <List.Item>
                  <List.Content as={Link} to="/main-register">
                    Create an Account?
                  </List.Content>
                  <List.Content as={Link} to="/reset-password">
                    Forgot your password?
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        );
      }
    }
  }
}
