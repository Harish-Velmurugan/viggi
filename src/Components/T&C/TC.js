import React from "react";
import "../T&C/TC.css";

import axios from "axios";
import Conditions from "../T&C/conditions";

import { Link } from "react-router-dom";

export default class TC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agree: false,
      //sol_ID:
    };
    this.handleSol = this.handleSol.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    console.log(this.props.solnID.solId);
  }

  async handleSol() {
    let name = localStorage.getItem("username");
    if (!this.state.agree) {
      await axios
        .post("/contract/agree/" + name + "/" + this.props.contractNumber + "/")
        .then((response) => {
          if (response.status == 200) {
            this.setState({ agree: true });
            document.getElementById("solbutton").disabled = "true";
          }
        });
    }
  }
  async handleSeek() {
    //let contractNumber = this.state.contractNumber;
    let ID = this.props.solnID.solId + ",";
    axios
      .post("/contract/seekerAgree/" + this.props.contractNumber + "/")
      .then((response) => {
        if (response.status == 200) {
          axios
            .post(
              "/sol/solverParticipationRp/" +
                this.props.contractNumber +
                "/" +
                ID +
                "/"
            )
            .then((response) => {});
        }
      });

    axios
      .post("/prototypetest/startProcess/" + this.props.solnID.solId + "/")
      .then((res) => {
        console.log(res.data);
      });
      
  }
  render() {
    return (
      <div>
        <h4
          style={{
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          Terms and Conditions
        </h4>
        <hr />
        <div style={{ fontSize: "17px" }}>
          <Conditions />
          <br />
          <br />
        </div>
        <div style={{ textAlign: "center" }}>
          {!this.props.check ? (
            <center>
              <h6 style={{ color: "green", marginBottom: "3%" }}>
                You have successfully completed this contract
              </h6>
            </center>
          ) : this.props.solverView ? (
            <div>
              <button
                style={{
                  marginLeft: "20%",
                  backgroundColor: "green",
                  color: "#ffffff",
                }}
                type="button"
                id="solbutton"
                class="btn"
                onClick={this.handleSol}
              >
                SOLVER AGREE
              </button>

              <button type="button" class="btn btn-secondary" disabled="true">
                SEEKER AGREE
              </button>
            </div>
          ) : (
            <div>
              {this.props.agree ? (
                <div>
                  <h6
                    style={{
                      color: "green",
                      marginLeft: "20%",
                      width: "15%",
                      minWidth: "50px",
                    }}
                  >
                    Solver Agreed..
                  </h6>
                  <Link to="/dashboard/">
                    <button
                      style={{
                        float: "right",
                        marginRight: "20%",
                        marginTop: "-40px",
                        backgroundColor: "green",
                        color: "#ffffff",
                        width: "15%",
                        minWidth: "90px",
                      }}
                      type="button"
                      class="btn"
                      onClick={this.handleSeek}
                    >
                      SEEKER AGREE
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    style={{
                      marginRight: "40%",
                      backgroundColor: "green",
                      color: "#ffffff",
                      width: "15%",
                      minWidth: "90px",
                    }}
                    type="button"
                    class="btn btn-secondary"
                  >
                    SOLVER AGREE
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#aba9a9",
                      color: "#ffffff",
                      width: "15%",
                      minWidth: "90px",
                    }}
                    class="btn"
                    disabled="true"
                  >
                    SEEKER AGREE
                  </button>
                  <br />
                  <h6 style={{ color: "red", marginLeft: "55%" }}>
                    Wait Until Solver Agree..
                  </h6>
                </div>
              )}
            </div>
          )}

          <br />
          <br />
          <br />
        </div>
        {/* <div style={{textAlign:"center"}}> 
                <button type="button" class="btn btn-success">SUBMIT</button>
            </div> */}
        <br />
        <br />
        {/* <div style={{ marginRight: "2%", textAlign: "right" }}>
          <button type="button" class="btn btn-secondary">
            PRINT AGREEMENT
          </button>
        </div> */}
        <div></div>
      </div>
    );
  }
}
