import React from "react";
import { Component } from "react";
import "./forgotPassword.css";
import Popup from "reactjs-popup";
import success from "./success.png";

import { Redirect } from "react-router-dom";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      status: "",
      username: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var url =
      "/wallet/walletforgotpassword/" +
      this.state.username +
      "/" +
      this.state.email +
      "/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + this.state.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ status: "Completed" });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSuccess() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/wallet" />;
    }
    if (this.state.status == "Completed") {
      return (
        <div>
          <Popup
            modal
            closeOnDocumentClick
            onClose={this.handleSuccess}
            open={true}
          >
            <img src={success} className="success" alt="success " />
            <div className="arrange-details">
              <br></br>
              <p>The Password has been sent to your Email!</p>
              <br></br>
              <p>Please Check your Inbox!</p>
            </div>
          </Popup>
        </div>
      );
    }

    return (
      <div className="page-forgotPassword">
        <div className="forgotPassword">
          <br></br>
          <h2>Reset your Password</h2>
          <br></br>
          <label>
            <input
              type="text"
              class="username"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <form className="form-forgot">
            <label for="email">
              <input
                type="email"
                id="email"
                class="username"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <br></br>
            <input
              className="button-f"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
