import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map((element, index) => {
          if (element.type === "incomingMessage") {
            return <Message key={index} message={element} />;
          } else if (element.type === "incomingNotification") {
            return <Notification key={index} message={element} />;
          }
        })}
      </main>
    );
  }
}
export default MessageList;
