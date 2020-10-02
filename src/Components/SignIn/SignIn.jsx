import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import axios from "axios";
import Axios from "axios";
import "./SignIn.css";
import { Redirect } from "react-router-dom";
import logo1 from "./logo1.png";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      status: 0,
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ error: "" });
    let target = e.target;
    let value = target.value;
    let name = target.name;

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

    axios
      .post("/users/v1/rest-auth/login/", this.state)

      .then((response) => {
        this.setState({ status: response.status });

        if (response.status == 200) {
          this.setState({ loggedIn: true });
          localStorage.setItem("token", response.data.key);
          localStorage.setItem("username", response.data.user);
          localStorage.setItem("email", this.state.email);
          window.localStorage.setItem("signin", "true");

          const url = "/";
          const method = "GET";
          Axios.request({
            baseURL: "/wallet/walletdetails/" + this.state.email,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + response.data.key,
            },
            url,
            method,
          })
            .then((response) => {
              localStorage.setItem("un", response.data.username);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);

        this.setState({ status: 400, error: "Invaild Login Credentials" });
      });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      //
      //<SocialIcon url="https://www.google.com" fgColor="white"/>
      //<div className="login1" style={{marginTop:"-75px"}}><center>OR  CONNECT  WITH</center></div>
      <div className="split">
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
            alt=""
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
                backgroundColor: "#323754",
                color: "white",
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
                backgroundColor: "#d5dbdb",
                color: "black",
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
              style={{ marginTop: "-6%", marginLeft: "13%" }}
            >
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">
                  E-Mail Address
                </label>

                <div class="input-group-prepend">
                  <div
                    class="input-group-text"
                    style={{
                      background: "#323754",
                      color: "white",
                      width: "40px",
                    }}
                  >
                    <i class="fa fa-user" style={{ fontSize: "17px" }}></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="FormField__Input"
                    class="form-control"
                    style={{ width: "75%", backgroundColor: "#d5dbdb" }}
                    placeholder="Enter your email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Password
                </label>

                <div class="input-group-prepend">
                  <div
                    class="input-group-text"
                    style={{
                      background: "#323754",
                      color: "white",
                      width: "40px",
                    }}
                  >
                    <i class="fa fa-key" style={{ fontSize: "17px" }}></i>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="FormField__Input"
                    class="form-control"
                    placeholder="Enter your password"
                    style={{ width: "75%", backgroundColor: "#d5dbdb" }}
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <small id="" className="form-text text-danger">
                    {this.state.error}
                  </small>
                </div>

                <div className="gap">
                  <div
                    className="FormField"
                    style={{ overflow: "hidden" }}
                    class="row"
                  >
                    <div class="col">
                      <button
                        className="FormField__Button mr-20"
                        style={{
                          backgroundColor: "#323754",
                          outline: "none",
                        }}
                      >
                        Sign In
                      </button>
                      &emsp;&emsp;&emsp;&emsp;
                    </div>
                    <div class="col">
                      <a
                        href="/forgotpassword"
                        className="FormField__Link"
                        style={{ position: "absolute", marginTop: "50px" }}
                      >
                        Forgot Password?{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space" style={{ marginTop: "-30px" }}>
                <center>
                  <SocialIcon url="https://twitter.com/" fgColor="white" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <SocialIcon url="http://linkedin.com/" fgColor="white" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <SocialIcon url="https://facebook.com" fgColor="white" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
