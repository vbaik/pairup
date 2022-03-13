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
  InputLabel,
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
    super(props);
    this.state = {
      username: props.singleUser.username || "",
      password: "",
      mbtiId: props.singleUser.mbtiId || "",
      level: props.singleUser.level || "Beginner",
      // imageURL: "",
      aboutMe: "",
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
          <Typography color="primary" variant="h5">
            Hi {this.props.singleUser.username}, update your profile here:
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              margin="normal"
              name="username"
              fullWidth
              label="New Username"
              onChange={this.handleChange}
              value={this.state.username}
              autoFocus
            />
            <TextField
              margin="normal"
              name="password"
              fullWidth
              label="New Password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputLabel id="mbti-dropdown">Update Your MBTI:</InputLabel>
              <Select
                labelId="mbti-dropdown"
                value={this.state.mbtiId}
                label="MBTI"
                onChange={this.handleChange}
                name="mbtiId"
                sx={{ width: "130px" }}
              >
                {mbtiArr.map((mbti, idx) => this.createMbtiMenu(idx, mbti))}
              </Select>

              <InputLabel id="level-dropdown">Update Your Level:</InputLabel>
              <Select
                labelId="level-dropdown"
                value={this.state.level}
                label="Level"
                onChange={this.handleChange}
                name="level"
                sx={{ width: "130px" }}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Experienced">Experienced</MenuItem>
              </Select>
            </Box>

            <TextField
              margin="normal"
              name="aboutMe"
              multiline
              fullWidth
              label="Update your bio here"
              onChange={this.handleChange}
              value={this.state.aboutMe}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button type="submit" variant="contained" sx={{ flexGrow: 2 }}>
                SAVE
              </Button>
              <Link to="/home">
                <Button color="secondary" sx={{ flexGrow: 1 }}>
                  CANCEL
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("mapState state >>>> ", state);
  return {
    singleUser: state.auth,
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
