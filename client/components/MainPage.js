import React from "react";
import ReactDOM from "react-dom";

// //style
// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
// // import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
import {
  IconButton,
  Collapse,
  Box,
  Typography,
  Grid,
  Link,
} from "@mui/material";
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
      <Grid container>
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
              <span className="main-title-span">Pair-programming </span>Partner
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          {" "}
          <Box backgroundColor="#dcf8f5">
            <Typography
              variant="h3"
              sx={{ margin: "100px" }}
              textAlign="center"
              lineHeight="2"
            >
              based on your
              <span className="main-title-span"> coding experience </span>
              level
              <br /> & <br /> your{" "}
              <span className="main-title-span"> MBTI personality </span>type.
            </Typography>
          </Box>
          <AllUserStat />
          <Typography
            variant="h4"
            sx={{ margin: "100px" }}
            textAlign="center"
            lineHeight="3"
          >
            You don't know what your MBTI type is? <br /> Don't worry! <br />{" "}
            Take this
            <a
              href="https://www.16personalities.com/free-personality-test"
              target="_blank"
            >
              <span className="main-title-span"> quick test </span>{" "}
            </a>
            and you are good to go!
          </Typography>
          <Typography
            variant="h3"
            textAlign="center"
            lineHeight="1.7"
            color="primary"
          >
            Are you ready?
          </Typography>
          <Typography
            variant="h4"
            textAlign="center"
            lineHeight="2"
            marginBottom="100px"
          >
            Then <Link href="/signup"> SIGN UP</Link> to find your <br />
            perfect pair-programming partner!
          </Typography>
        </Grid>
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
