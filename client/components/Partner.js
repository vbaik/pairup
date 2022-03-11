import React from "react";
import { connect } from "react-redux";
import { fetchAllUsersThunk, fetchLoggedInUserThunk } from "../store/user";

class Partner extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllPotentialPartners();
  }

  render() {
    console.log("this is props>>> ", this.props);
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
  };
};

const mapDispatch = (dispatch) => ({
  getAllPotentialPartners: () => dispatch(fetchAllUsersThunk()),
});

export default connect(mapState, mapDispatch)(Partner);
