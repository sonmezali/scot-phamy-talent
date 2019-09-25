import React, { Component } from "react";
import { getAllApplicants } from "../api/applicants";
import { Grid } from "semantic-ui-react";
import ApplicantsCard from "./ApplicantsCard";
import { Link } from "react-router-dom";
class AdminProfiles extends Component {
  state = { applicantsList: [] };
  getAllPendingApplicants = () => {
    getAllApplicants().then(res => {
      console.log(res);
      this.setState({ applicantsList: res });
    });
  };
  componentDidMount() {
    this.getAllPendingApplicants();
  }
  render() {
    console.log(this.state.applicantsList);

    return (
      <Grid stackable>
        <Grid.Row columns={3} stretched>
          {this.state.applicantsList &&
            this.state.applicantsList.map(
              applicant =>
                applicant &&
                applicant.application_status === "pending" && (
                  <Grid.Column
                    key={applicant.applicant_id}
                    as={Link}
                    to={`/applicant-profile/${applicant.applicant_id}`}
                  >
                    <ApplicantsCard {...applicant} adminOptions />
                    <br></br>
                  </Grid.Column>
                )
            )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default AdminProfiles;
