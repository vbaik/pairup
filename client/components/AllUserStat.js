import React from "react";
import { connect } from "react-redux";
import "chart.js/auto";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";

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

import { fetchUserStatsThunk } from "../store/user";

class AllUserStat extends React.Component {
  componentDidMount() {
    this.props.userStats();
  }

  render() {
    const coderLevelStats = this.props.coderLevelStats || [];
    const usersMbtiStats = this.props.userMbtiStats || [];
    const coderLevelData = [];
    const usersMbtiData = [];
    const randomColors4Level = [];
    const randomColors4Mbti = [];

    const generateColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      return `rgb(${r},${g},${b},0.4)`;
    };

    coderLevelStats.forEach((level) => {
      coderLevelData.push(Object.values(level).join());
      randomColors4Level.push(generateColor());
    });
    const levelLabel = [];
    coderLevelStats.forEach((level) => {
      levelLabel.push(Object.keys(level).join());
    });
    usersMbtiStats.forEach((mbti) => {
      usersMbtiData.push(Object.values(mbti).join());
      randomColors4Mbti.push(generateColor());
    });
    const mbtiLabel = [];
    usersMbtiStats.forEach((mbti) => {
      mbtiLabel.push(Object.keys(mbti).join());
    });

    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4"> Coding Level Distribution: </Typography>
          <PolarArea
            options={{
              animation: {
                delay: 1000,
                duration: 1500,
              },
            }}
            data={{
              labels: levelLabel,
              datasets: [
                {
                  label: "level",
                  data: coderLevelData,
                  backgroundColor: randomColors4Level,
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4"> MBTI Distribution: </Typography>
          <Doughnut
            options={{
              animation: {
                delay: 1000,
                duration: 1500,
              },
            }}
            data={{
              labels: mbtiLabel,
              datasets: [
                {
                  label: "mbti",
                  data: usersMbtiData,
                  backgroundColor: randomColors4Mbti,
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapState = (state) => {
  return {
    coderLevelStats: state.users.coderLevelStats,
    userMbtiStats: state.users.userMbtiStats,
  };
};

const mapDispatch = (dispatch) => ({
  userStats: () => dispatch(fetchUserStatsThunk()),
});

export default connect(mapState, mapDispatch)(AllUserStat);
