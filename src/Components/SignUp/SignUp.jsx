import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import { SocialIcon } from "react-social-icons";
import "./SignUp.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo1 from "./logo1.png";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password1: "",
      username: "",
      password2: "",
      loggedIn: false,
      hasAgreed: true,
      error: "",
      signup: "false",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ error: "" });
    let target = e.target;
    let value = target.value;
    let name = target.name;

    // if(name=='password1'){
    //   this.setState({password2:value})
    // }

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = {};

    for (let entry of formData.entries()) {
      user[entry[0]] = entry[1];
    }

    let value = this.state.hasAgreed;

    if (value) {
      axios
        .post("/users/v1/rest-auth/registration/", this.state)
        .then((response) => {
          if (response.status == 201) {
            this.setState({ loggedIn: true, signup: true });
            localStorage.setItem("token", response.data.key);
            localStorage.setItem("username", response.data.user);
            localStorage.setItem("email", this.state.email);
            localStorage.setItem("signin", "false");
          }
        })

        .catch((error) => {
          this.setState({ status: 400, error: "error occurred" });
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/update",
            state: { sign: this.state.signup },
          }}
        ></Redirect>
      );
    }
    return (
      <div
        style={{
          padding: "5%",
          backgroundImage: "url('login.jpg')",
          height: "657px",
          backgroundBlendMode: "screen",
          backgroundColor: "gray",
        }}
      >
        <div
          className="split"
          style={{
            height: "500px",
            overflow: "hidden",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
          <div
            className="left"
            style={{ backgroundColor: "#323754", width: "50%" }}
          >
            <Link to="/" className="homelink">
              <i
                class="fa fa-home"
                style={{
                  position: "absolute",
                  fontSize: "33px",
                  marginTop: "1.5%",
                  marginLeft: "-12%",
                  color: "#d5dbdb",
                }}
              ></i>
            </Link>
            <img
              src={logo1}
              alt="logo"
              height="400"
              width="350"
              style={{ marginTop: "12.5%", marginLeft: "5%" }}
            />
          </div>
          <div className="right" style={{ backgroundColor: "white" }}>
            <div className="PageSwitcher">
              <NavLink
                to="/signin"
                activeClassName="PageSwitcher__Item--Active"
                className="PageSwitcher__Item"
                style={{
                  backgroundColor: "#d5dbdb",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                activeClassName="PageSwitcher__Item--Active"
                className="PageSwitcher__Item"
                style={{
                  backgroundColor: "#323754",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </NavLink>
            </div>

            <div className="FormCenter">
              <form
                onSubmit={this.handleSubmit}
                className="FormFields"
                style={{ marginTop: "-5%", marginLeft: "1%" }}
              >
                <div class="row">
                  <div className="FormField" class="col">
                    <label className="FormField__Label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="FormField__Input"
                      class="form-control"
                      style={{ backgroundColor: "#d5dbdb" }}
                      placeholder="Enter your full name"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="FormField" class="col">
                    <label className="FormField__Label" htmlFor="email">
                      E-Mail Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="FormField__Input"
                      class="form-control"
                      style={{ backgroundColor: "#d5dbdb" }}
                      placeholder="Enter your email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <div class="row" style={{ marginTop: "10px" }}>
                  <div className="FormField" class="col">
                    <label className="FormField__Label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password1"
                      className="FormField__Input"
                      class="form-control"
                      style={{ backgroundColor: "#d5dbdb" }}
                      placeholder="Enter your password"
                      name="password1"
                      value={this.state.password1}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="FormField" class="col">
                    <label
                      className="FormField__Label"
                      htmlFor="confirmpassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="password2"
                      className="FormField__Input"
                      class="form-control"
                      style={{ backgroundColor: "#d5dbdb" }}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="FormField">
                  <label className="FormField__CheckboxLabel">
                    <input
                      className="FormField__Checkbox"
                      type="checkbox"
                      name="hasAgreed"
                      value={this.state.hasAgreed}
                      onChange={this.handleChange}
                    />{" "}
                    I agree to all statements in{" "}
                    <Link className="FormField__TermsLink">
                      Terms of Service
                    </Link>
                  </label>
                </div>

                <small id="" class="form-text text-danger">
                  {this.state.error}
                </small>
                <div className="FormField" style={{ marginTop: "-6%" }}>
                  <center>
                    <button
                      className="FormField__Button mr-20"
                      style={{ backgroundColor: "#323754", outline: "none" }}
                    >
                      Sign Up
                    </button>
                  </center>
                </div>

                <div className="space" style={{ marginTop: "-3%" }}>
                  <center>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <SocialIcon url="https://twitter.com" fgColor="white" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <SocialIcon url="http://linkedin.com" fgColor="white" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <SocialIcon url="https://facebook.com" fgColor="white" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
