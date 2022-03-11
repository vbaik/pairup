import React from "react";
import { connect } from "react-redux";

class Partner extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(">>>>> ", this.props.isDriver);
    return (
      <div>
        <h3>The best matching partner is</h3>
      </div>
    );
  }
}

export default Partner;
