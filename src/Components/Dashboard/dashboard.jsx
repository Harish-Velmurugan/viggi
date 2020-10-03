import React, { useContext } from "react";
import Navbar from "../Navbar/nav";
import { Redirect, Link } from "react-router-dom";
import "./styles.css";
import Wallet from "../Wallet/wallet";
import Hidden from "@material-ui/core/Hidden";
import { DetailsContext } from "../../context/DetailsContext";
import designer from "./designer.png";
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("username");

    var loggedIn = true;
    if (token == "null" || token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
      userMode: localStorage.getItem("mode"),
    };
  }

  // async componentDidMount(){
  //   await axios
  //   .get("/api/getmode/"+localStorage.getItem("username")+"/")
  //   .then(response =>
  //   this.setState({userMode:response.data.user})
  //   )

  // }
  render() {
    console.log(this.state.userMode);
    if (!localStorage.getItem("username")) {
      return <Redirect to="/" />;
    }
    console.log(this.state.userMode);

    return (
      <div className="wrapper">
        <Navbar />
        {this.props.location.state != undefined &&
          this.props.location.state.Wallet == true && <wallet />}
        <Hidden only="xs">
          <div className="sidebar">
            {this.state.userMode == "user" ||
            this.state.userMode == "company" ? (
              <ul style={{ marginTop: "40px" }}>
                <li>
                  <Link to="/dashboard/ProblemInvolved">
                    <i class="fas fa-address-book"></i>INVOLVED PROBLEMS
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/ProblemPosted">
                    <i className="fas fa-user" />
                    POSTED PROBLEMS
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/postproblem">
                    <i className="fas fa-address-card" />
                    POST A PROBLEM
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/ExpiredProblem">
                    <i className="fas fa-project-diagram" />
                    EXPIRED PROBLEMS
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/expertpanel">
                    <i className="fas fa-star" />
                    EXPERT PANEL
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/solPrototypeDb">
                    <img
                      src={designer}
                      className="svg mr-2"
                      height="18px"
                      width="18px"
                    />
                    PROTOTYPE & TEST
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/Trending">
                    <i className="fas fa-line-chart" />
                    TRENDING
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/problemRefining">
                    <i className="fas fa-tools" />
                    PROBLEM REFINING
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/helpers">
                    <i class="fas fa-hands-helping"></i>
                    HELPERS
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/community">
                    <i className="fas fa-tools" />
                    Community
                  </Link>
                </li>
                {/* <li><a href="#"><i className="fas fa-blog" />Blogs</a></li>
                    <li><a href="#"><i className="fas fa-address-book" />Contact</a></li>
                    <li><a href="#"><i className="fas fa-map-pin" />Map</a></li> */}
              </ul>
            ) : (
              <ul style={{ marginTop: "40px" }}>
                <li>
                  <Link to="/dashboard/DataProviderProblemInvolved">
                    <i class="fas fa-address-book"></i>INVOLVED PROBLEMS
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/Trending">
                    <i className="fas fa-line-chart" />
                    TRENDING
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </Hidden>
      </div>
    );
  }
}

export default Dashboard;
