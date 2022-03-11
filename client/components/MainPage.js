import React from "react";

export default class MainPage extends React.Component {
  render() {
    console.log(React.version);
    return (
      <div>
        <h1>Find Your Perfect Pair-programming Partner</h1>
        <img
          className="img-main"
          src="https://tuple.app/pair-programming-guide/assets/pair-programming-illustration.svg"
        />
      </div>
    );
  }
}
