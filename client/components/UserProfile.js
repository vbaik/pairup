import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { me } from "../store";
import { updateUserThunk, getSingleUserThunk } from "../store/singleUser";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      level: "",
      imageURL: "",
      aboutMe: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.loadInitialData();
  }

  //change handler:
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //submit handler:
  handleSubmit(event) {
    event.preventDefault();
    console.log("submitted >>>>>", this.state);
    this.props.updateUser(this.props.match.params.id, { ...this.state });
  }

  render() {
    console.log(">>>>>>>", this.state);
    return (
      <div>
        <form onSubmit={this.handleChange}>
          <label>Username: </label>
          <input
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />

          <div className="submit-cancel-btn">
            <button className="btn-submit" type="submit">
              SAVE
            </button>
            <Link to="/home">
              <button className="btn-cancel">CANCEL</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleUser: state.singleUser,
});

const mapDispatch = (dispatch) => ({
  getSingleUser: (id) => dispatch(getSingleUserThunk(id)),
  loadInitialData() {
    dispatch(me());
  },
  updateUser: (id, user) => dispatch(updateUserThunk(id, user)),
});

export default connect(mapState, mapDispatch)(UserProfile);
