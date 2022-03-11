import React from "react";
import { connect } from "react-redux";
import { fetchAllUsersThunk, fetchPotentialPartnersThunk } from "../store/user";

class Partner extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllPotentialPartners();
  }

  render() {
    console.log("this is props for Partners Comp >>> ", this.props);
    const potentialPartners = this.props.potentialPartners;
    return (
      <div>
        <h3>Your awesome matching partner(s): </h3>
        <div>
          {potentialPartners.map((partner) => (
            <div key={partner.id}>
              <h4>{partner.username}</h4>
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
