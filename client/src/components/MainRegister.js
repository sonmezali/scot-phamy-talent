import React, { Component } from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
class RegisterPage extends Component {
  render() {
    return (
      <div>
        <Button primary as={Link} to="/applicant-register">
          {" "}
          Applicant Sign Up
        </Button>
        <Button primary as={Link} to="/company-register">
          {" "}
          Company Sign Up
        </Button>
      </div>
    );
  }
}

export default RegisterPage;
