import React, { Component } from "react";

class UserCount extends Component {
  render() {
    return (
      <div className="user-count">Users Online: {this.props.userCount}</div>
    );
  }
}
export default UserCount;
