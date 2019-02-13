import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
        <main className="messages">
                
            {this.props.messages.map((element, index) => <Message key = {index} message = {element}/>)}
            
        </main>  
    );
  }
}
export default MessageList;