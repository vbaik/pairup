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
  Select,
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
        <Box
          display="flex"
          justifyContent="center"
          direction="column"
          alignItems="center"
          flexDirection="column"
        >
          <Typography color="primary" variant="h4" lineHeight="3">
            Welcome, {username}!
          </Typography>
          <Typography variant="h6" marginBottom="30px">
            Would you like to drive or navigate?
          </Typography>

          <Select
            name="coderType"
            onChange={this.handleChange}
            value={this.state.coderType}
            sx={{ width: "150px", height: "35px" }}
          >
            <MenuItem disabled value="">
              Select Here:
            </MenuItem>
            <MenuItem value="Driver">Drive</MenuItem>
            <MenuItem value="Navigator">Navigate</MenuItem>
          </Select>
        </Box>

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
