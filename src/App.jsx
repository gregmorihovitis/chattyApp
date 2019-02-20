import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001/");

    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);
      console.log(data);
      this.setState({ messages: this.state.messages.concat(data) });
    };
    this.socket.onopen = console.log("Connected to Server");

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  addMessage(username, content) {
    // const oldMessages = this.state.messages;
    const addMessage = { username: username, content: content };
    // const newMessage = [...oldMessages, addMessage];

    this.socket.send(JSON.stringify(addMessage));

    // console.log('new message');
    // this.setState({ messages: newMessage });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}
export default App;
