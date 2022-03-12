import React from "react";
import ReactDOM from "react-dom";

//style
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Box>
          <Typography color="primary" variant="h2">
            Find Your Perfect Pair-programming Partner
          </Typography>
          <img className="img-main" src="/background.png" />

          {/* <Button variant="contained" color="primary">
          Hello World
        </Button> */}
        </Box>
      </div>
    );
  }
}
