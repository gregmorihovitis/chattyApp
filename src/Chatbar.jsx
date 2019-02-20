import React, { Component } from "react";

class Chatbar extends Component {
  getName = () => {
    return this.props.currentUser.name
      ? this.props.currentUser.name
      : "Anonymous";
  };

  handleInput = e => {
    let type = "postMessage";
    // return function event(e) {
    if (e.key === "Enter") {
      this.props.addMessage(type, this.props.currentUser.name, e.target.value);
      e.target.value = "";
      // }
    }
  };

  changeUser = e => {
    if (e.key === "Enter") {
      this.props.setUser(this.props.currentUser.name, e.target.value);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={this.changeUser}
          defaultValue={this.props.currentUser.name}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleInput}
        />
      </footer>
    );
  }
}
export default Chatbar;
