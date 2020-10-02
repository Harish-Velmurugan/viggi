import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./ForgotPassword.css";
import Axios from "axios";
import logo1 from "./logo1.png";
import lock from "./lock.png";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      returnLogin: false,
      msg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    Axios.post("")
      .then(
        this.setState({
          msg:
            "Reset password using the link sent to mail, redirecting to Login !",
        })
      )
      .catch((err) => {
        console.log(err);
      });

    //this should be last line
    setTimeout(() => {
      this.setState({ returnLogin: true });
    }, 3000);
  }

  render() {
    if (this.state.returnLogin == true) {
      return <Redirect to="/signin" />;
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
            {/* <div className="PageSwitcher">
                <NavLink to="/signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In
                </NavLink>
                <NavLink to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                </div> */}
            <center>
              <div
                style={{
                  width: "480px",
                  marginTop: "25px",
                  marginBottom: "40px",
                }}
              >
                <img alt="lock" src={lock} height="60px" width="90px" />
                {/* <i class="material-icons" style={{fontSize:"50px",color:"#323754"}}>lock</i> */}
                <h5 style={{ textAlign: "center", color: "black" }}>
                  Forgot password ?
                </h5>
                <h6 style={{ color: "gray", fontSize: ".9em" }}>
                  We just need your registered email id to reset your password
                </h6>
              </div>
            </center>
            {/*field*/}
            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields">
                <div
                  className="FormField"
                  style={{ marginTop: "-6%", marginLeft: "13%" }}
                >
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
                      required
                    />
                  </div>
                </div>
                <div className="FormField">
                  <div
                    style={{
                      color: "gray",
                      fontSize: ".9em",
                      marginLeft: "12%",
                    }}
                  >
                    (Instructions for resetting password will be sent to your
                    email.)
                  </div>
                </div>
                <center>
                  <div className="FormField">
                    <button
                      className="FormField__Button mr-20"
                      style={{ backgroundColor: "#323754", outline: "none" }}
                    >
                      Reset password
                    </button>
                  </div>
                </center>
              </form>
              <span className="text-success">{this.state.msg}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
