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
  Select,
} from "@mui/material";

const mbtiArr = [
  "ISFJ",
  "ESFJ",
  "ISTJ",
  "ISFP",
  "ESTJ",
  "ESFP",
  "ENFP",
  "ISTP",
  "INFP",
  "ESTP",
  "INTP",
  "ENTP",
  "ENFJ",
  "INTJ",
  "ENTJ",
  "INFJ",
];

class UserProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.singleUser.username || "",
      password: props.singleUser.password || "",
      mbtiId: props.singleUser.mbtiId || "",
      level: props.singleUser.level || "Beginner",
      // imageURL: "",
      // aboutMe: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createMbtiMenu = this.createMbtiMenu.bind(this);
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

  createMbtiMenu(i, mbtiName) {
    return (
      <MenuItem key={i} value={i + 1}>
        {mbtiName}
      </MenuItem>
    );
  }

  render() {
    console.log("this. state >>>>>>>", this.state);
    return (
      <div>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <TextField
              margin="normal"
              name="username"
              label="New Username"
              onChange={this.handleChange}
              value={this.state.username}
              autoFocus
            />
            <TextField
              margin="normal"
              name="password"
              label="New Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Typography>Update MBTI: </Typography>
            {/* <TextField
              name="mbtiId"
              onChange={this.handleChange}
              value={this.state.mbtiId}
            /> */}
            <Select
              value={this.state.mbtiId}
              label="Update Your MBTI"
              onChange={this.handleChange}
              name="mbtiId"
            >
              {mbtiArr.map((mbti, idx) => this.createMbtiMenu(idx, mbti))}
            </Select>

            <div className="submit-cancel-btn">
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                SAVE
              </Button>
              <Link to="/home">
                <Button>CANCEL</Button>
              </Link>
            </div>
          </form>
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
