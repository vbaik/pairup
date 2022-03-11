import React from "react";
import { connect } from "react-redux";
import { fetchAllUsersThunk, fetchPotentialPartnersThunk } from "../store/user";

class Partner extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    console.log("this is props for Partners Comp >>> ", this.props);
    return (
      <div>
        <h3>The best matching partner is</h3>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log(">>>>> ", state);
  return {
    allUsers: state.users,
    loggedInUserInfo: state.auth,
    // potentialPartners: state.users,
  };
};

const mapDispatch = (dispatch) => ({
  //   getAllPotentialPartners: () => dispatch(fetchPotentialPartnersThunk()),
  getAllUsers: () => dispatch(fetchAllUsersThunk()),
});

export default connect(mapState, mapDispatch)(Partner);
