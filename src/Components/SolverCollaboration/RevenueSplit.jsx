import React, { Component } from "react";
import Navbar from "../Navbar/nav";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
class RevenueSplit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPerson: [],
      //button
      enable: false,
      disable: true,
      tot: 100,
      //drop down percentage
      percentage: [],
      startIndex: 0,
      //selected revenue
      sid: "",
      pid: "",
      members: [],
      selectedPer: [],
      Redirect: false,
      contractNumber: 11,
      //agree
      agreeEnable: false,
    };
    this.agree = this.agree.bind(this);
    // this.perMaintain = this.perMaintain.bind(this);
    this.click = this.click.bind(this);
  }
  async componentDidMount() {
    window.addEventListener("load", this.handleLoad());
  }

  async handleLoad() {
    let mem = this.props.location.state.members;
    mem = mem.toString().substring(0, mem.length - 1);

    await this.setState({
      members: mem.split(","),
      sid: this.props.location.state.sid,
      pid: this.props.location.state.pid,
    });

    for (var j = 0; j < this.state.members.length; j++) {
      await axios
        .get("/api/user-personal-get-view/" + this.state.members[j] + "/")
        .then((response) => {
          this.setState(
            (this.state.selectedPerson = this.state.selectedPerson.concat(
              response.data
            ))
          );
        });

      this.setState(
        (this.state.selectedPer = this.state.selectedPer.concat([0]))
      );
      this.setState(
        (this.state.percentage = this.state.percentage.concat([[0]]))
      );
    }
    this.perMaintain(this.state.startIndex, 100);
    this.click(this.state.startIndex, this.state.enable);
  }

  perMaintain(index, tot) {
    let stop = 6;
    let start = tot - (this.state.selectedPerson.length - (index + 1)) * 10;

    if (index == this.state.percentage.length - 1) {
      stop = start;
    }

    let percentage = [];
    for (var i = start; i >= stop; i = i - 5) {
      percentage.push(i);
    }
    let per = this.state.percentage;
    per[index] = percentage;
    this.setState({ percentage: per });

    let a = document.getElementsByClassName("dropdown-item" + index);
    for (let i = 0; i < a.length; i++) {
      a[i].innerText = this.state.percentage[index][i] + " % - Split \n";
    }
  }

  async handleClick(updateTot, id) {
    document.getElementById(id + "btn").innerText = updateTot + "   % - Split";
    let per1 = this.state.selectedPer;
    per1[id] = updateTot;
    this.setState({ selectedPer: per1 });
    this.setState({ startIndex: id + 1 });
    this.setState({ tot: this.state.tot - updateTot });
    let tot = this.state.tot - updateTot;
    this.perMaintain(id + 1, tot);

    this.click(id, this.state.disable);
    this.click(id + 1, this.state.enable);
  }

  click(index, disable) {
    const bt = document.getElementById(index + "toggle");
    if (bt != null) {
      bt.disabled = disable;
    } else {
      this.setState({ agreeEnable: true });
    }
  }

  reset = () => {
    window.location.reload(true);
  };

  async agree() {
    const post = this.state.selectedPer;
    if (this.state.agreeEnable) {
      await axios
        .post(
          "/contract/CreateSolverContract/" +
            this.state.pid +
            "/" +
            this.state.sid +
            "/"
        )
        .then((response) => {
          if (response.status == 200) {
            this.setState({ contractNumber: response.data.contractNumber });

            for (var j = 0; j < post.length; j++) {
              var x = document.getElementById(j + "btn").innerText;
              x = parseInt(x);
              if (!isNaN(x)) {
                let data = new FormData();

                data.append("username", this.state.selectedPerson[j].username);
                data.append("contract", this.state.contractNumber);
                data.append("revenue", this.state.selectedPer[j]);
                let name = this.state.selectedPerson[j].username;
                const headers = {
                  "Content-Type": "multipart/form-data",
                  // 'Authorization': token
                };
                axios
                  .post("/contract/CreateSolverDescription/", data, {
                    headers: headers,
                  })
                  .then((response) => {
                    if (response.status == 200) {
                      axios
                        .post(
                          "/contract/solverCollaboration/" +
                            this.state.contractNumber +
                            "/" +
                            name +
                            "/"
                        )
                        .then((response) => {
                          this.setState({ Redirect: true });
                        });
                    }
                  });
              }
            }
          }
        });
    } else {
      alert("illegal Split");
    }
  }

  render() {
    //const contractNumber = this.state.contractNumber;
    const selectedPerson = this.state.selectedPerson;
    const startIndex = this.state.startIndex;
    let percentage = this.state.percentage;
    if (percentage.length > 0) {
      percentage = this.state.percentage[startIndex];
    }
    return (
      <div>
        <Navbar />
        <section>
          <div
            className="inner0"
            style={{
              minWidth: "700px",
              padding: "2.3%",
              marginTop: "9%",
              marginLeft: "5.5%",
              width: "90%",
              backgroundColor: "white",
            }}
          >
            <br />
            <h3 style={{ textAlign: "center" }}>Collaboration Contract</h3>
            <hr />
            <br />
            <table
              border="1"
              style={{
                marginLeft: "1%",
                width: "98%",
                textAlign: "center",
                fontStyle: "bold",
              }}
            >
              <thead style={{ backgroundColor: "#323754", color: "white" }}>
                <tr>
                  <th style={{ width: "10px" }}>Profile</th>
                  <th>Name</th>
                  <th>Nationality</th>
                  <th>Phone Number</th>
                  <th>Revenue Split</th>
                </tr>
              </thead>
              <tbody>
                {selectedPerson.map((select, index) => (
                  <tr style={{ fontSize: "20px" }}>
                    <td style={{ width: "150px" }}>
                      <img
                        alt="asd"
                        src={select.img}
                        height="125"
                        width="125"
                        className="profile"
                      />
                    </td>
                    <td style={{ width: "18%", overflow: "hidden" }}>
                      {select.firstname + " " + select.lastname}
                    </td>
                    <td>{select.nationality}</td>
                    <td>{select.phone}</td>
                    <td>
                      <div class="dropdown">
                        <button
                          class="btn "
                          id={index + "btn"}
                          style={{
                            borderRadius: "0%",
                            backgroundColor: "#323754",
                            color: "white",
                          }}
                        >
                          Revenu Split
                        </button>
                        <button
                          class="btn dropdown-toggle"
                          id={index + "toggle"}
                          disabled="true"
                          onClick={this.click}
                          type="button"
                          style={{
                            borderRadius: "0%",
                            backgroundColor: "#323754",
                            color: "white",
                          }}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></button>

                        <div
                          class="dropdown-menu"
                          id={"myDropDown" + index}
                          aria-labelledby="dropdownMenuButton"
                          style={{
                            overflow: "auto",
                            maxHeight: "250px",
                            width: "150px",
                            backgroundColor: "#323754",
                            color: "white",
                          }}
                        >
                          {percentage.map((x) => (
                            <Link
                              class={"dropdown-item" + index}
                              style={{ cursor: "pointer", marginLeft: "20px" }}
                              onClick={() => this.handleClick(x, index)}
                            >
                              {x}&nbsp;%
                              <br />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              onClick={this.agree}
              id="agree"
              style={{
                width: "9%",
                marginTop: "3%",
                marginLeft: "31%",
                backgroundColor: "#323754",
                color: "white",
                padding: "10px",
              }}
            >
              Agree
            </Button>
            <Button
              onClick={this.reset}
              style={{
                width: "9%",
                marginLeft: "25%",
                backgroundColor: "#323754",
                color: "white",
                padding: "10px",
              }}
            >
              Reset
            </Button>
          </div>
        </section>
        {this.state.Redirect && (
          <Redirect
            to={{
              pathname: "/solverCollaborationContract",
              state: { contractNumber: this.state.contractNumber },
            }}
          ></Redirect>
        )}
      </div>
    );
  }
}
export default RevenueSplit;
