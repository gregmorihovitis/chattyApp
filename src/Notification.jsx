import React, { Component } from "react";

class Notification extends Component {
  render() {
    return (
      <div className="message-content">
        <p>{this.props.message.content}</p>
      </div>
    );
  }
}

export default Notification;
