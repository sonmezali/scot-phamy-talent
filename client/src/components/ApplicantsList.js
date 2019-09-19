import React, { Component } from "react";
import getAllApplicants from "../api/applicants";
import ApplicantsCard from "./ApplicantsCard";

export default class ApplicantsList extends React.Component {
  state = {
    applicantsList: []
  };

  componentDidMount() {
    getAllApplicants().then(res => {
      this.setState({
        applicantsList: res
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.applicantsList.map(applicant => (
          <ApplicantsCard {...applicant} key={applicant.applicant_id} />
        ))}
      </div>
    );
  }
}
