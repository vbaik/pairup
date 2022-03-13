import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { me } from "../store";
import { updateUserThunk, getSingleUserThunk } from "../store/singleUser";

//+++ style +++
import {
  Typography,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Button,
  Grid,
  Avatar,
  TextField,
} from "@mui/material";

class UserProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.singleUser.username || "",
      password: props.singleUser.password || "",
      mbtiId: "",
      // level: "",
      // imageURL: "",
      // aboutMe: "",
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
    this.props.updateUser({ ...this.state });
  }

  render() {
    console.log("this. state >>>>>>>", this.state);
    return (
      <div>
        <Box onSubmit={this.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            lable="Update Username: "
            onChange={this.handleChange}
            value={this.state.username}
            autoFocus
          />
          <TextField
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Typography>Current MBTI: </Typography>
          <TextField
            name="mbtiId"
            onChange={this.handleChange}
            value={this.state.mbtiId}
          />

          <div className="submit-cancel-btn">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              SAVE
            </Button>
            <Link to="/home">
              <Button>CANCEL</Button>
            </Link>
          </div>
        </Box>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("mapState state >>>> ", state);
  return {
    singleUser: state.singleUser,
  };
};

const mapDispatch = (dispatch) => ({
  //   getSingleUser: (id) => dispatch(getSingleUserThunk(id)),
  loadInitialData() {
    dispatch(me());
  },
  updateUser: (id, user) => dispatch(updateUserThunk(id, user)),
});

export default connect(mapState, mapDispatch)(UserProfile);
