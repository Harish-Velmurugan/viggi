import React from "react";
import { Component } from "react";
import "./wallet.css";
import axios from "axios";
import Navbar from "../Navbar/nav";
import { Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import logo1 from "./logo1.png";

class Wallet extends Component {
  constructor(props) {
    super(props);

    let user = localStorage.getItem("email");
    this.state = {
      username: user,
      password: "",
      loggedIn: false,
      status: 0,
      show: false,
      onShow: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({ show: false });
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/auth/", this.state)

      .then((response) => {
        this.setState({ status: response.status });

        if (response.status == 200) {
          this.setState({ loggedIn: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ status: 400 });
        if (this.state.status == 400) {
          this.setState({ show: true });
        }
      });
  }

  render() {
    if (this.state.loggedIn == true)
      return <Redirect push to="/Walletdashboard" />;
    if (this.state.onShow == true) return <Redirect push to="/dashboard" />;
    if (this.state.username == null) return <Redirect to="/signin" />;
    return (
      <div>
        <Navbar />
        {/* <div className="border-wallet">
          <div className="wallet">
            <div className="Title-wallet">
              <h1>Wallet</h1>
            </div>

            <label>
              <p type="text" class="username-wallet">
                {" "}
                {this.state.username}{" "}
              </p>
            </label>

            <label>
              <input
                class="password-wallet"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>

            <div>
              <button class="button-w" onClick={this.handleSubmit}>
                Login
              </button>
            </div>
          </div>
          {this.state.show && (
            <div className="red-alert-w">
              <h5>Invalid Credentials! Please Check! </h5>
            </div>
          )}
        </div> */}
        <Modal centered show={!this.state.onShow}>
          <Modal.Body>
            <img
              src={logo1}
              height="100px"
              width="100px"
              style={{ borderRadius: "50%", marginLeft: "38%" }}
            />
            <label className="username-wallet">
              <p type="text">
                <i class="fa fa-user" style={{ fontSize: "17px" }}></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.state.username}
              </p>
            </label>

            <label class="username-wallet">
              <i class="fa fa-key" style={{ fontSize: "17px" }}></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                style={{ border: "none", outline: "none" }}
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>

            <div>
              <button class="button-w" onClick={this.handleSubmit}>
                Login
              </button>
              <button
                class="button-w"
                onClick={() => this.setState({ onShow: true })}
              >
                Close
              </button>
            </div>
            {this.state.show && (
              <div className="red-alert-w">
                <h5>Invalid Credentials! Please Check! </h5>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Wallet;
