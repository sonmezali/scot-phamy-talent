import React, { Component } from "react";
import { getAllApplicants } from "../api/applicants";
import { Grid, Modal, Button } from "semantic-ui-react";
import ApplicantsCard from "./ApplicantsCard";
import { approveApplicantProfile } from "../api/adminProfile";

class AdminProfiles extends Component {
  state = { applicantsList: [], approveMessage: false, openMessage: false };
  getAllPendingApplicants = () => {
    getAllApplicants().then(res => {
      this.setState({ applicantsList: res });
    });
  };
  componentDidMount() {
    this.getAllPendingApplicants();
  }
  handleApprove = id => {
    approveApplicantProfile(id).then(
      res =>
        res.success &&
        this.setState({ approveMessage: res.success, openMessage: true })
    );
  };
  handleCloseFail = () => this.setState({ openMessage: false });
  handleCloseSuccess = () => {
    this.setState({ openMessage: false });
    window.location.reload();
  };
  render() {
    return (
      <Grid stackable>
        <Grid.Row columns={3} stretched>
          {this.state.applicantsList &&
            this.state.applicantsList.map(
              applicant =>
                applicant &&
                applicant.application_status === "pending" && (
                  <Grid.Column key={applicant.applicant_id}>
                    <ApplicantsCard
                      {...applicant}
                      adminOptions
                      handleApprove={() =>
                        this.handleApprove(applicant.applicant_id)
                      }
                    />
                    <br></br>
                  </Grid.Column>
                )
            )}
        </Grid.Row>
        {this.state.approveMessage === true && (
          <Modal
            open={this.state.openMessage}
            onClose={this.handleCloseSuccess}
            closeIcon
            basic
            size="small"
          >
            <Modal.Header> Approved successfully</Modal.Header>
            <Modal.Actions>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="OK"
                onClick={this.handleCloseSuccess}
              />
            </Modal.Actions>
          </Modal>
        )}
        {this.state.approveMessage === false && (
          <Modal
            basic
            open={this.state.openMessage}
            onClose={this.handleCloseFail}
            closeIcon
          >
            <Modal.Header> Something went Wrong</Modal.Header>
            <Modal.Actions>
              <Button
                negative
                icon="checkmark"
                labelPosition="right"
                content="OK"
                onClick={this.handleCloseFail}
              />
            </Modal.Actions>
          </Modal>
        )}
      </Grid>
    );
  }
}

export default AdminProfiles;
