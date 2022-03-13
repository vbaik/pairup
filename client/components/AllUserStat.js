import React from "react";
import { connect } from "react-redux";
import "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

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
} from "@mui/material";

import { fetchAllUsersThunk, fetchPotentialPartnersThunk } from "../store/user";

class AllUserStat extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Doughnut
            data={{
              labels: ["a", "b", "c"],
              datasets: [
                {
                  label: "level",
                  data: [1, 2, 3],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    );
  }
}

const mapState = (state) => {
  return {
    allUsers: state.users,
  };
};

const mapDispatch = (dispatch) => ({
  getAllUsers: () => dispatch(fetchAllUsersThunk()),
});

export default connect(mapState, mapDispatch)(AllUserStat);
