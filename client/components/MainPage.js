import React from "react";
import ReactDOM from "react-dom";

// //style
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// // import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
import { IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as Scroll } from "react-scroll";

// import bkgImg from "../../public/background.png";

// // const styles = {
// //   paperContainer: {
//     backgroundImage: `url(${bkgImg})`,
// //   },
// // };

export default class MainPage extends React.Component {
  render() {
    return (
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
        {/* <div className="break" /> */}
        <Scroll to="place-to-visit" smooth={true}>
          <IconButton sx={{ alignSelf: "flex-start" }}>
            <KeyboardArrowDownIcon
              sx={{ color: "#fe6d73", fontSize: "6rem" }}
            />
          </IconButton>
        </Scroll>
      </Box>
    );
  }
}
// <Paper style={styles.paperContainer}>
//   {/* <Typography color="primary" variant="h2"> */}
//   Find Your Perfect Pair-programming Partner
//   {/* </Typography> */}
// </Paper>
// );
