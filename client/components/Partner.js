import React from "react";
import { connect } from "react-redux";
import { fetchAllUsersThunk, fetchPotentialPartnersThunk } from "../store/user";

class Partner extends React.Component {
  constructor() {
    super();
    this.calculateCompatibility = this.calculateCompatibility.bind(this);
  }
  componentDidMount() {
    this.props.getAllPotentialPartners();
  }

  calculateCompatibility(partner) {
    // this.setState({ isDriver: this.props.isDriver });
    if (this.props.coderType === "Driver") {
      if (this.props.loggedInUserInfo.level === "Beginner") {
        switch (partner.level) {
          case "Beginner":
            return 0.5;
          case "Intermediate":
            return 0.99;
          case "Experienced":
            return 0.8;
        }
      }
      if (this.props.loggedInUserInfo.level === "Intermediate") {
        switch (partner.level) {
          case "Beginner":
            return 0.2;
          case "Intermediate":
            return 0.8;
          case "Experienced":
            return 0.99;
        }
      }
      if (this.props.loggedInUserInfo.level === "Experienced") {
        switch (partner.level) {
          case "Beginner":
            return 0.1;
          case "Intermediate":
            return 0.5;
          case "Experienced":
            return 0.99;
        }
      }
    } else if (this.props.coderType === "Navigator") {
      if (this.props.loggedInUserInfo.level === "Beginner") {
        switch (partner.level) {
          case "Beginner":
            return 0.5;
          case "Intermediate":
            return 0.2;
          case "Experienced":
            return 0.1;
        }
      }
      if (this.props.loggedInUserInfo.level === "Intermediate") {
        switch (partner.level) {
          case "Beginner":
            return 0.99;
          case "Intermediate":
            return 0.8;
          case "Experienced":
            return 0.5;
        }
      }
      if (this.props.loggedInUserInfo.level === "Experienced") {
        switch (partner.level) {
          case "Beginner":
            return 0.8;
          case "Intermediate":
            return 0.99;
          case "Experienced":
            return 0.99;
        }
      }
    }
  }

  render() {
    const potentialPartners = this.props.potentialPartners;
    return (
      <div>
        <h3>Your awesome matching partner(s): </h3>
        <div>
          {potentialPartners.map((partner) => (
            <div key={partner.id}>
              <h4>{partner.username}</h4>
              <ul>{partner.level}</ul>
              <ul>Compatibility {this.calculateCompatibility(partner)}</ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    loggedInUserInfo: state.auth,
    potentialPartners: state.users,
  };
};

const mapDispatch = (dispatch) => ({
  getAllPotentialPartners: () => dispatch(fetchPotentialPartnersThunk()),
});

export default connect(mapState, mapDispatch)(Partner);
