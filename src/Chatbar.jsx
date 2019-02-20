import React, {Component} from 'react';

class Chatbar extends Component {

  handleInput = (e) => {
    if(e.key === 'Enter'){ 
      this.props.addMessage(this.props.currentUser.name, e.target.value
        )
      e.target.value = '';
    } 
  }
  
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleInput} />
      </footer>
    );
  }
}
export default Chatbar;
