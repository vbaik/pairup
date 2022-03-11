import React from "react";
import { connect } from "react-redux";
import Partner from "./Partner";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDriver: true,
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
    console.log(this.state.isDriver);
    return (
      <div>
        <h3>Welcome, {username}</h3>
        <p>Would you like to drive or navigate?</p>
        <select
          className="driver-dropdown"
          name="isDriver"
          onChange={this.handleChange}
          value={this.state.isDriver}
        >
          <option value={true}>Select One</option>
          <option value={true}>Drive</option>
          <option value={false}>Navigate</option>
        </select>

        <div>
          <Partner isDriver={this.state.isDriver} />
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
