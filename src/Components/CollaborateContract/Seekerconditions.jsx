import React, { Component } from "react";
import Navbar from "../Navbar/nav";
import { Button } from "react-bootstrap";

import PopUp from "./PopUp";
import Conditions from "../T&C/conditions";
import axios from "axios";

class SeekerCondition extends Component {
  // const [modalShow, setModalShow] = React.useState(false);
  // const [flag] = React.useState(false);
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      setModalShow: false,
      flag: false,
      final: false,
      // contractNumber : 1,
      contractNumber: props.location.state,
      pblm: "",
      solnId: "",
      solnId1: "",
      agreed: false,
    };
  }

  componentDidMount() {
    window.addEventListener("load", this.handleLoad());
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad());
  }

  async handleLoad() {
    await axios
      .get(`/contract/view-description/${this.props.location.state}/`)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ pblm: response.data[3] });

          let sol1 = [];
          let temp = true;
          for (var i = 0; i < response.data[1].length; i++) {
            var sol = this.state.solnId + response.data[1][i].solution + ",";
            sol1[i] = response.data[1][i].solution;
            this.setState({ solnId: sol });

            this.setState({ solnId1: sol1 });

            if (!response.data[1][i].agreed) {
              temp = false;
              break;
            }
          }
          if (temp) {
            this.setState({ flag: true });
          }
          this.setState({ agreed: response.data[0].agreed });
        }
      });
  }

  handleClick = () => {
    let contractNumber = this.state.contractNumber;
    var sol1 = this.state.solnId1;

    console.log(sol1.length);

    axios
      .post("/contract/seekerAgree/" + contractNumber + "/")
      .then((response) => {
        if (response.status == 200) {
          this.setState({ final: true });
          axios
            .post(
              "/sol/solverParticipationRp/" +
                contractNumber +
                "/" +
                this.state.solnId +
                "/"
            )
            .then((response) => {
              if (response.status == 200) {
                // payment call using response
              }
            });

          for (var i = 0; i < this.state.solnId1.length; i++) {
            axios
              .post(
                "/prototypetest/startProcess/" + this.state.solnId1[i] + "/"
              )
              .then((res) => {
                console.log(res.data);
              });
          }
        }
      });
  };
  click() {}
  render() {
    return (
      <div>
        <Navbar />
        <div
          className="inner0"
          style={{
            minWidth: "320px",
            padding: "2.7%",
            marginTop: "10%",
            marginLeft: "6%",
            width: "89%",
            backgroundColor: "white",
          }}
        >
          <br />
          <h3 style={{ textAlign: "center" }}>
            Collaboration Seeker Smart Contract
          </h3>
          <hr />
          <br />

          <div>
            <h1 className="contract-watermark">Vignatree</h1>
            <div
              style={{
                backgroundColor: "#323754",
                color: "white",
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              <h4 style={{ textAlign: "center" }}>Terms and Conditions</h4>
            </div>
            <br />
            <Conditions />
            {/* <Conditions pblm={this.state.pblm}/> */}
          </div>
          <hr />

          {this.state.agreed ? (
            <center>
              <h6 style={{ color: "green", marginBottom: "3%" }}>
                You have successfully completed this contract
              </h6>
            </center>
          ) : this.state.flag ? (
            <div>
              <h6>
                <input
                  type="checkbox"
                  checked="true"
                  readonly
                  style={{ marginLeft: "5%" }}
                />{" "}
                &nbsp;&nbsp;&nbsp; I accept the above mentioned terms and
                conditions as a seeker.
              </h6>
              <br />
              <br />
              <center>
                <button
                  style={{
                    backgroundColor: "#323754",
                    color: "white",
                    padding: "10px",
                    width: "100px",
                  }}
                  onClick={this.handleClick}
                >
                  Submit
                </button>
              </center>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h6 style={{ color: "red", marginBottom: "3%" }}>
                You can agree only if all the participants have agreed to
                collaborate
              </h6>
              <Button
                disabled="true"
                style={{
                  backgroundColor: "#323754",
                  color: "white",
                  padding: "10px",
                }}
              >
                Wait to Submit
              </Button>
            </div>
          )}

          {this.state.final && (
            <PopUp
              title={"Successful Collaboration"}
              desc={
                "Your collaboration is successful and you owned the rights of the solutions you have selected"
              }
              redir={"/dashboard"}
              show={() => this.setState({ modalShow: false })}
              onHide={() => this.setState({ setModalShow: false })}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SeekerCondition;
