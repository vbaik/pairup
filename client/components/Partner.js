import React from "react";
import { connect } from "react-redux";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

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

class Partner extends React.Component {
  constructor() {
    super();
    this.calculateCompatibility = this.calculateCompatibility.bind(this);
  }
  componentDidMount() {
    this.props.getAllPotentialPartners();
  }

  calculateCompatibility(partner) {
    // this.setState({ isDriver: this.props.isDriver });
    if (this.props.coderType === "Driver") {
      if (this.props.loggedInUserInfo.level === "Beginner") {
        switch (partner.level) {
          case "Beginner":
            return 0.5;
          case "Intermediate":
            return 0.99;
          case "Experienced":
            return 0.8;
        }
      }
      if (this.props.loggedInUserInfo.level === "Intermediate") {
        switch (partner.level) {
          case "Beginner":
            return 0.2;
          case "Intermediate":
            return 0.8;
          case "Experienced":
            return 0.99;
        }
      }
      if (this.props.loggedInUserInfo.level === "Experienced") {
        switch (partner.level) {
          case "Beginner":
            return 0.1;
          case "Intermediate":
            return 0.5;
          case "Experienced":
            return 0.99;
        }
      }
    } else if (this.props.coderType === "Navigator") {
      if (this.props.loggedInUserInfo.level === "Beginner") {
        switch (partner.level) {
          case "Beginner":
            return 0.5;
          case "Intermediate":
            return 0.2;
          case "Experienced":
            return 0.1;
        }
      }
      if (this.props.loggedInUserInfo.level === "Intermediate") {
        switch (partner.level) {
          case "Beginner":
            return 0.99;
          case "Intermediate":
            return 0.8;
          case "Experienced":
            return 0.5;
        }
      }
      if (this.props.loggedInUserInfo.level === "Experienced") {
        switch (partner.level) {
          case "Beginner":
            return 0.8;
          case "Intermediate":
            return 0.99;
          case "Experienced":
            return 0.99;
        }
      }
    }
  }

  render() {
    const potentialPartners = this.props.potentialPartners;
    if (this.props.coderType !== "") {
      return (
        <div>
          <Typography>Your awesome matching partner(s): </Typography>
          <div>
            {potentialPartners.map((partner) => (
              <Box key={partner.id}>
                <Grid container spacing={3}>
                  <Grid item xs={1}>
                    <Avatar alt="Remy Sharp" src={partner.imageURL} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography color="primary">{partner.username}</Typography>
                    <Typography>Level: {partner.level}</Typography>
                  </Grid>
                  {/* <ul>Compatibility {this.calculateCompatibility(partner)}</ul> */}
                  <Grid item xs={8}>
                    <Bar
                      data={{
                        labels: ["Compatibility"],
                        datasets: [
                          {
                            label: "Compatibility",
                            data: [this.calculateCompatibility(partner)],
                            backgroundColor: [
                              "rgba(54, 162, 235, 0.2)",
                              "rgba(255, 99, 132, 0.2)",
                            ],
                          },
                        ],
                      }}
                      height={10}
                      width={100}
                      options={{
                        indexAxis: "y",
                        scales: {
                          x: {
                            max: 1,
                            min: 0,
                            ticks: {
                              stepSize: 1,
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
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
