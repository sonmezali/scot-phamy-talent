import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { signApi } from "../api/auth";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };

  // handleSubmit = event => {
  //   event.preventDefault();

  //   if (!this.state.email) {
  //     return this.setState({ error: "Email is required" });
  //   }
  //   if (!this.state.password) {
  //     return this.setState({ error: "Password is required" });
  //   }

  //   return this.setState({ error: "" });
  // };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePassChange = event => {
    this.setState({ password: event.target.value });
  };

  singIn = () => {
    signApi(this.state.email, this.state.password)
      .then(data => {
        const token = data.token;
        console.log(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.location.reload(); //refresh the page for token
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };

  render() {
    const token = localStorage.getItem("token");
    if (token) {
      return <div>You are Log in. WELCOME!</div>;
    } else
      return (
        <Grid centered columns={4}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Login into your account
            </Header>
            <Segment>
              <Form onSubmit={this.handleSubmit} size="large">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onSubmit={this.handleSubmit}
                  onChange={this.handlePassChange}
                />

                <Button
                  onClick={this.singIn}
                  value={this.state.error}
                  color="blue"
                  fluid
                  size="large"
                >
                  Sign in
                </Button>
                {this.state.error ? <div>Wrong Info. Try Again</div> : null}
              </Form>
            </Segment>
            <Message iconPosition="center">
              <a href="#">Forgot Password?</a>
            </Message>
            <Message>
              New User? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      );
  }
}
