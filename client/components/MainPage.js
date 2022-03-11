import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";

export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Find Your Perfect Pair-programming Partner</h1>
        <img className="img-main" src="/background.png" />

        {/* <Button variant="contained" color="primary">
          Hello World
        </Button> */}
      </div>
    );
  }
}
