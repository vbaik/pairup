import React from "react";
import { connect } from "react-redux";
import Partner from "./Partner";

//+++ style +++
import {
  Typography,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coderType: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { username } = this.props;
    return (
      <Box>
        <Typography color="primary" variant="h4">
          Welcome, {username}!
        </Typography>
        <Typography variant="h6">
          Would you like to drive or navigate?
        </Typography>

        <select
          className="driver-dropdown"
          name="coderType"
          onChange={this.handleChange}
          value={this.state.coderType}
        >
          <option value="" disabled>
            Select Here:
          </option>
          <option value="Driver">Drive</option>
          <option value="Navigator">Navigate</option>
        </select>

        <div>
          <Partner coderType={this.state.coderType} />
        </div>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
