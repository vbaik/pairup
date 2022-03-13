import React from "react";
import ReactDOM from "react-dom";

// //style
// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
// // import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
import { IconButton, Collapse, Box, Typography, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as Scroll } from "react-scroll";

import AllUserStat from "./AllUserStat";

// import bkgImg from "../../public/background.png";

// // const styles = {
// //   paperContainer: {
//     backgroundImage: `url(${bkgImg})`,
// //   },
// // };

export default class MainPage extends React.Component {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            style={{
              backgroundImage: `url(/background.png)`,
              backgroundSize: "cover",
              minHeight: "100vh",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Nunito",
            }}
          >
            <Typography variant="h2">
              Find Your Perfect <br />{" "}
              <span className="main-title-span">Pair-programming </span>Partner.
            </Typography>
            {/* <IconButton sx={{ alignSelf: "flex-start" }}>
              <KeyboardArrowDownIcon
                sx={{ color: "#fe6d73", fontSize: "6rem" }}
              />
            </IconButton> */}
          </Box>
        </Grid>

        <AllUserStat />
      </Grid>
    );
  }
}
// <Paper style={styles.paperContainer}>
//   {/* <Typography color="primary" variant="h2"> */}
//   Find Your Perfect Pair-programming Partner
//   {/* </Typography> */}
// </Paper>
// );
