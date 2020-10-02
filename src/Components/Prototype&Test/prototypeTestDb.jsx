import { Modal } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import A from "./a.jpg";
import "./prototypeTestDb.css";

class prototypeTestDb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Builder: [],
      BuilderSolDetail: [],
      Implementer: [],
      ImplementerSolDetail: [],
    };

    this.next = this.next.bind(this);
  }
  next() {
    // window.location = "/dashboard/solPrototypeInitial";
  }

  componentDidMount() {
    axios
      .get(
        "/prototypetest/prototypetestBuilder/" +
          localStorage.getItem("username") +
          "/"
      )
      .then((res) => {
        this.setState({ BuilderSolDetail: res.data[1] });
        this.setState({ Builder: res.data[0] });
      });

    axios
      .get(
        "/prototypetest/prototypetestImplementer/" +
          localStorage.getItem("username") +
          "/"
      )
      .then((res) => {
        this.setState({ ImplementerSolDetail: res.data[1] });
        this.setState({ Implementer: res.data[0] });
      });
  }

  render() {
    return (
      <div className="main_content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            marginLeft: "5%",
            marginRight: "7%",
            backgroundColor: "#323754",
          }}
          class="mb-4"
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>As Pilot Builder</h3>
        </div>

        <div
          style={{
            // display: "flex",
            // justifyContent: "center",
            float: "left",

            backgroundColor: "#ffffff",
          }}
        ></div>

        <div
          class="ui special cards box3"
          style={{ display: "inline-block", transition: "1s" }}
        >
          {console.log(this.state.Builder)}
          {this.state.Builder.map((Builder, i) => (
            <div class="card" onClick={() => this.next()}>
              <div class="blurring dimmable image">
                <img
                  src={this.state.BuilderSolDetail[i].image}
                  height="50px"
                  width="50px"
                />
              </div>
              <div class="content">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/dashboard/solPrototypeInitial",
                    state: { query: Builder.id },
                  }}
                >
                  <a class="header">{this.state.BuilderSolDetail[i].title}</a>
                </Link>
                <div class="meta">
                  {/* <span class="date">Created in Sep 2014</span> */}
                </div>
              </div>
              <div class="extra content">
                {/* <i class="users icon"></i> */}
                Stage
                <p
                  class="float-right"
                  style={{
                    color: "#008080",
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                >
                  {(() => {
                    switch (Builder.step) {
                      case 0:
                        return "Planning";
                      case 1:
                        return "Prototype Submmission";
                      case 2:
                        return "Implementation";
                      case 3:
                        return "Completed";
                      default:
                        return "Rejected";
                    }
                  })()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <br />
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "center",

            marginLeft: "5%",
            marginRight: "7%",
            backgroundColor: "#323754",
          }}
          class="mb-4"
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            As Pilot Implementer
          </h3>
        </div>

        <div
          style={{
            // display: "flex",
            // justifyContent: "center",
            float: "left",

            backgroundColor: "#ffffff",
          }}
        ></div>

        <div
          class="ui special cards box3"
          style={{ display: "inline-block", transition: "0.5s" }}
        >
          {this.state.Implementer.map((Implementer, i) => (
            <div class="card" onClick={() => this.next()}>
              <div class="blurring dimmable image">
                {/* <div class="ui dimmer">
        <div class="content">
          <div class="center">
            <div class="ui inverted button">Add Friend</div>
          </div>
        </div>
      </div> */}
                <img
                  src={this.state.ImplementerSolDetail[i].image}
                  height="50px"
                  width="50px"
                />
              </div>
              <div class="content">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/dashboard/solPrototypeImplementor",
                    state: { query: Implementer.id },
                  }}
                >
                  <a class="header">
                    {this.state.ImplementerSolDetail[i].title}
                  </a>
                </Link>
                <div class="meta">
                  <span class="date"></span>
                </div>
              </div>
              <div class="extra content">
                {/* <i class="users icon"></i> */}
                Stage
                <p
                  class="float-right"
                  style={{
                    color: "#008080",
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                >
                  {(() => {
                    switch (Implementer.step) {
                      case 0:
                        return "Planning";
                      case 1:
                        return "Prototype Submmission";
                      case 2:
                        return "Implementation";
                      case 3:
                        return "Completed";
                      default:
                        return "Rejected";
                    }
                  })()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
    );
  }
}
export default prototypeTestDb;
