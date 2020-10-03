import { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./notification.css";
import axios from "axios";
import logo1 from "./navLogo.png";
import logo2 from "./navVignatree.png";
import search from "./search.svg";
import Wallet from "../Wallet/wallet";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      count: "",
      count1: [],
      img: "",
      rp: "",
      userMode: localStorage.getItem("mode"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.notifyCount = this.notifyCount.bind(this);
  }
  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  componentDidMount() {
    this.notify();
    this.interval = setInterval(this.notify, 30000);
    Axios.get(
      `/users/v1/users/profile/${localStorage.getItem("username")}/`
    ).then((response) => {
      console.log(response);
      var dat2 = response.data[2];
      this.setState({
        img: dat2[0].img,
        rp: response.data[5][0].rp,
      });
    });
  }
  notify = () => {
    var a = localStorage.getItem("username");
    axios.get("/note/unread_count/" + a + "/").then((res) => {
      this.setState({ count: res.data.unread_count });
    });
    axios.get("/api/notifyCountGet/" + a + "/").then((res) => {
      this.setState({ count1: res.data.notifyCount });
    });
  };

  notifyCount() {
    var a = localStorage.getItem("username");
    var b = this.state.count;
    axios.post("/api/notifyCount/" + a + "/" + b + "/").then((res) => {});
  }
  render() {
    //var c=this.state.count;

    return localStorage.getItem("signin") == "true" ? (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top p-1 mynav"
          style={{ backgroundColor: "#323754" }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link
              className="navbar-brand"
              to="/dashboard"
              style={{ fontWeight: 600, fontSize: "18px" }}
            >
              <img
                src={logo1}
                width="36"
                height="36"
                alt=""
                style={{ marginLeft: "20%" }}
              />
              <img
                alt="asd"
                src={logo2}
                width="96"
                height="36"
                style={{ marginLeft: "10%", marginRight: "20px" }}
              />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <ul
              className="navbar-nav mr-auto mt-2 mt-lg-0"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {this.state.userMode == "user" ||
              this.state.userMode == "company" ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <Link
                      to="/dashboard/ProblemInvolved"
                      className="nav-link dropdown-toggle"
                      id="dropdownMenuButton1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      DASHBOARD
                    </Link>

                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                      style={{ backgroundColor: "#323754" }}
                    >
                      <Link
                        to="/dashboard/ProblemInvolved"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        INVOLVED PROBLEMS
                      </Link>

                      <Link
                        to="/dashboard/ProblemPosted"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        POSTED PROBLEMS
                      </Link>
                      <Link
                        to="/dashboard/postproblem"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        POST A PROBLEM
                      </Link>
                      <Link
                        to="/dashboard/ExpiredProblem"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        EXPIRED PROBLEMS
                      </Link>
                      <Link
                        to="/dashboard/expertpanel"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        EXPERT PANEL
                      </Link>

                      <Link
                        to="/dashboard/solPrototypeDb"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        PROTOTYPE & TEST
                      </Link>
                      <Link
                        to="/dashboard/Trending"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        TRENDING
                      </Link>
                      <Link
                        to="/dashboard/problemRefining"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        PROBLEM REFINING
                      </Link>
                      <Link
                        to="/dashboard/helpers"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        HELPERS
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <div className="dropdown">
                    <Link
                      to="/dashboard/ProblemInvolved"
                      className="nav-link dropdown-toggle"
                      id="dropdownMenuButton1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      DASHBOARD
                    </Link>

                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                      style={{ backgroundColor: "#323754" }}
                    >
                      <Link
                        to="/dashboard/DataProviderProblemInvolved"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        INVOLVED PROBLEMS
                      </Link>
                      <Link
                        to="/dashboard/Trending"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        TRENDING
                      </Link>
                    </div>
                  </div>
                </li>
              )}
              &nbsp;&nbsp;
              {this.state.userMode == "user" ||
              this.state.userMode == "company" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                      FEED
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link className="nav-link" to="/forum">
                      FORUM
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link className="nav-link" to="/wiki">
                      WIKI
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/DataProviderFeed">
                    FEED
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/solver">
                  LEADERBOARD
                </Link>
              </li>
              &nbsp;&nbsp;
              {/*               
              <li className="nav-item">
                <Link to="/myprofile" className="nav-link">MY PROFILE</Link>
              </li>&nbsp;&nbsp;
              <li className="nav-item">
              <Link to="/wallet" className="nav-link">WALLET</Link>
              </li> */}
            </ul>
            <Link
              to={{
                pathname: "/chat",
                state: { id: "2", title: "Vaccine", img: "" },
              }}
            >
              <span
                class="material-icons"
                style={{ fontsize: "60px", color: "white" }}
              >
                chat
              </span>
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="nav-link notification" to="/notify">
              <span>
                <i
                  class="material-icons"
                  onClick={this.notifyCount}
                  style={{ fontsize: "60px", color: "white" }}
                >
                  notifications
                </i>
              </span>

              {this.state.count == this.state.count1 ||
              this.state.count == 0 ? (
                ""
              ) : (
                <span className="badge">
                  {this.state.count - this.state.count1}
                </span>
              )}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="dropdown">
              <Link
                class="dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                  textDecoration: "none",
                  color: "transparent",
                  marginRight: "10pt",
                }}
              >
                <img
                  src={this.state.img}
                  width="40pt"
                  height="40pt"
                  alt="avatar"
                  style={{ borderRadius: "50%" }}
                ></img>
              </Link>

              <div class="dropdown-menu" style={{ backgroundColor: "#323754" }}>
                <Link className="bg-primary text-white dropdown-item">
                  <strong>{"RP :  " + this.state.rp}</strong>
                </Link>
                <Link
                  to="/myprofile"
                  className="dropdown-item"
                  style={{ color: "white" }}
                >
                  MY PROFILE
                </Link>
                <Link
                  to={{ pathname: "/wallet", state: { Wallet: true } }}
                  className="dropdown-item"
                  style={{ color: "white" }}
                >
                  WALLET
                </Link>
                <Link
                  class="dropdown-item"
                  to={{ pathname: "/update", state: { sign: "false" } }}
                  style={{ color: "white" }}
                >
                  UPDATE PROFILE
                </Link>
                <div
                  class="dropdown-divider"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                ></div>
                <Link
                  class="dropdown-item"
                  to="/logout"
                  style={{ color: "white" }}
                >
                  LOGOUT
                </Link>
              </div>
            </div>
            <form
              className="form-inline ml-1 my-2 my-lg-0 row"
              style={{ marginRight: "15pt" }}
            >
              <input
                className="form-control col"
                name="query"
                onChange={this.handleChange}
                value={this.state.query}
                type="search"
                id="search"
                placeholder="Search"
                style={{
                  borderRight: "0px",
                  borderRadius: "20px 0px 0px 20px",
                  paddingLeft: "1rem",
                }}
              />
              <Link
                to={{ pathname: "/search", state: { query: this.state.query } }}
              >
                {/* <Badge variant="dark" >Search</Badge> */}
                <img
                  alt="asd"
                  src={search}
                  className="col"
                  style={{
                    backgroundColor: "#d5dbdb",
                    padding: "7px",
                    borderRadius: "0px 20px 20px 0px",
                  }}
                />
              </Link>
            </form>
            {/* auto complete */}
            <div id="match-list"></div>
            {/* ends here */}
          </div>
        </nav>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default Navbar;
