import React, { Component } from "react";

class InitializeChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("username"),
    };
  }
  componentDidMount = () => {
    window.addEventListener("load", this.handleLoad());
  };

  handleLoad = () => {
    this.props.handleLogin(this.state.username);
  };

  usernameChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <div className="login">
        <form
          onClick={() => this.props.handleLogin(this.state.username)}
          className="form"
        >
          {/* <input 
                     type="text"
                     onChange={this.usernameChangeHandler}
                     value={this.state.username}
                     placeholder="Username"
                     required /> 
                     */}
          <button className="submit" type="submit">
            Chat
          </button>
        </form>
      </div>
    );
  }
}

export default InitializeChatComponent;
