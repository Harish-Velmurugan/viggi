import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SocialIcon } from "react-social-icons";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
//import { Link } from 'react-router-dom';
import ForgotPassword from "../Forget/ForgotPassword";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      status: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type == "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loggedIn: true });

    axios
      .post("/users/v1/rest-auth/login/", this.state)

      .then((response) => {
        this.setState({ status: response.status });

        if (response.status == 200) {
          this.setState({ loggedIn: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ status: 400 });
      });
  }

  render() {
    return (
      <Router basename="/signup-signin-ui/">
        <div className="FormCenter">
          <form
            onSubmit={this.handleSubmit}
            className="FormFields"
            onSubmit={this.handleSubmit}
          >
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="FormField__Input"
                placeholder="Enter your email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="gap">
              <div className="FormField">
                <button className="FormField__Button mr-20">Sign In</button>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <NavLink to="/forgot" className="FormField__Link">
                  Forgot Password?{" "}
                </NavLink>
              </div>
            </div>

            {this.state.status == 200 ? (
              <Route
                path="/privacy-policy"
                component={() => {
                  window.location.href = "https://www.google.com";
                  return null;
                }}
              />
            ) : this.state.status == 400 ? (
              <div className="msg">Invalid Login Credentials</div>
            ) : (
              <div className="msg"></div>
            )}

            <div className="login1">
              <center>OR CONNECT WITH</center>
            </div>

            <div className="space">
              <center>
                <SocialIcon
                  url="https://twitter.com/jaketrent"
                  fgColor="white"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <SocialIcon
                  url="http://linkedin.com/in/jaketrent"
                  fgColor="white"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <SocialIcon url="https://facebook.com" fgColor="white" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <SocialIcon url="https://www.google.com" fgColor="white" />
              </center>
            </div>
          </form>
        </div>
      </Router>
    );
  }
}

export default SignInForm;
