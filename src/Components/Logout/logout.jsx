import React from "react";
import { Redirect } from "react-router";
import "../SignIn/SignIn.css";
import { Spinner } from "react-bootstrap";
import logo1 from "./logo1.png";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.setItem("username", null);
    localStorage.setItem("token", null);
    window.localStorage.setItem("signin", null);
    setTimeout(() => {
      this.setState({ logout: true });
    }, 3000);
    localStorage.clear();
  }

  render() {
    this.logout();
    if (this.state.logout == true) {
      return <Redirect to="/" />;
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
            marginLeft: "5%",
            marginRight: "5",
          }}
        >
          <div
            className="left"
            style={{ backgroundColor: "#323754", width: "30%" }}
          >
            <img
              src={logo1}
              alt="img"
              height="400"
              width="350"
              style={{ marginTop: "12.5%", marginLeft: "3%" }}
            />
          </div>
          <div
            className="right"
            style={{
              backgroundImage: "url('logoutBg.jpg')",
              height: "657px",
              backgroundBlendMode: "screen",
              backgroundColor: "#323754",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginTop: "3%" }}>
              You have successfully logged out
            </h3>

            <Spinner
              animation="grow"
              style={{ marginTop: "20%", color: "light blue" }}
            />
            <div style={{ marginTop: "17%", textAlign: "left" }}>
              <h2>
                <i>Be The Change</i>
              </h2>
              <h4>
                <i>“What is now proved was once only imagined.”</i>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Logout;
