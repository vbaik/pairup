import React from "react";
import { connect } from "react-redux";
import Partner from "./Partner";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coderType: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { username } = this.props;
    return (
      <div>
        <h3>Welcome, {username}</h3>
        <p>Would you like to drive or navigate?</p>
        <select
          className="driver-dropdown"
          name="coderType"
          onChange={this.handleChange}
          value={this.state.coderType}
        >
          <option value="">Select Here:</option>
          <option value="Driver">Drive</option>
          <option value="Navigator">Navigate</option>
        </select>

        <div>
          <Partner coderType={this.state.coderType} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
