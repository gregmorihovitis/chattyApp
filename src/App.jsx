import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";
import UserCount from "./UserCount.jsx";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      users: 0
    };

    this.setUser = this.setUser.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  //handles incoming messages from server
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001/");

    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);
      console.log(data);

      switch (data.type) {
        case "incomingMessage":
          this.setState({
            messages: this.state.messages.concat(data),
            users: this.state.users
          });
        case "incomingCount":
          this.setState({ users: data.count });
      }
    };
    this.socket.onopen = console.log("Connected to Server");
  }

  //add new message to total
  addMessage(type, username, content) {
    const addMessage = { type: type, username: username, content: content };

    this.socket.send(JSON.stringify(addMessage));
  }

  //change username
  setUser(oldUser, newUser) {
    this.setState({ currentUser: { name: newUser }, users: this.state.users });
    const notification = {
      type: "postNotification",
      content: `${oldUser} has changed their name to ${newUser}`
    };
    this.socket.send(JSON.stringify(notification));
    console.log(oldUser, newUser);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <UserCount userCount={this.state.users} />
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          setUser={this.setUser}
        />
      </div>
    );
  }
}
export default App;
