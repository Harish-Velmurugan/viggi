import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../Navbar/nav";

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      problemId: props.location.state.problemId,
      selectedID: props.location.state.selectedID,
      //personal details
      Personal: [],
      // selected solution details
      selectedPerson: [],
      //button
      enable: false,
      disable: true,
      tot: 100,
      //drop down percentage
      percentage: [],
      startIndex: 0,
      //selected revenue
      selectedPer: [],
      Redirect: false,
      contractNumber: 0,
      //agree
      agreeEnable: false,
      pBuilder: "",
      sid: "",
    };

    this.agree = this.agree.bind(this);
    this.agree1 = this.agree1.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("load", this.handleLoad());
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad());
  }

  handleChange(e, i, j) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
    this.setState({ pBuilder: i });
    this.setState({ sid: this.state.selectedID[j].solutionId });
    console.log(this.state.selectedID[j].solutionId);
  }

  async handleLoad() {
    await axios
      .get("/api/user-personal-view/")
      .then((response) => {
        this.setState(
          (this.state.Personal = this.state.Personal.concat(response.data))
        );

        for (var i = 0; i < this.state.selectedID.length; i++) {
          for (var j = 0; j < this.state.Personal.length; j++) {
            if (
              this.state.Personal[j].username ==
              this.state.selectedID[i].username
            ) {
              this.setState(
                (this.state.selectedPerson = this.state.selectedPerson.concat(
                  this.state.Personal[j]
                ))
              );
              this.setState(
                (this.state.selectedPer = this.state.selectedPer.concat([0]))
              );
              this.setState(
                (this.state.percentage = this.state.percentage.concat([[0]]))
              );
            }
          }
        }

        this.perMaintain(this.state.startIndex, 100);
        this.click(this.state.startIndex, this.state.enable);
      })
      .catch((error) => {
        console.log(error);
      });
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
    let per = this.state.selectedPer;
    per[id] = updateTot;
    this.setState({ selectedPer: per });
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

  async agree1() {
    let mem = [];
    // console.log(this.state.selectedPer[0]);
    for (var i = 0; i < this.state.selectedPerson.length; i++) {
      mem += this.state.selectedPerson[i].username + ",";
    }
    mem += localStorage.getItem("username") + ",";
    console.log(mem);

    let formdata = new FormData();
    formdata.append("solutionId", this.state.sid);
    formdata.append("pBuilder", Number(this.state.pBuilder));
    formdata.append("pImplementer", Number(localStorage.getItem("username")));
    formdata.append("members", mem);

    console.log("res.data");

    const post = this.state.selectedPer;
    if (this.state.agreeEnable) {
      await axios
        .post("/contract/create-contract/" + this.state.problemId + "/")
        .then((response) => {
          if (response.status == 200) {
            this.setState({ contractNumber: response.data.contractNumber });

            //  for(var i=0 ;i<post.length; i++){
            //     let temp = []
            //     temp.push(this.state.contractNumber)
            //     temp.push(this.state.selectedPerson[i].username)
            //     temp.push(this.state.selectedPerson[i].id)
            //     temp.push(this.state.selectedPer[i])
            //     this.setState(this.state.Post = this.state.Post.concat([temp]))
            // }
            for (let j = 0; j < post.length; j++) {
              let x = document.getElementById(j + "btn").innerText;
              x = parseInt(x);
              if (isNaN(x)) {
                alert("Revenue Split is not crct ...");
                break;
              }
            }
            for (let j = 0; j < post.length; j++) {
              let x = document.getElementById(j + "btn").innerText;
              x = parseInt(x);
              if (!isNaN(x)) {
                let data = new FormData();

                data.append("username", this.state.selectedPerson[j].username);
                data.append("contract", this.state.contractNumber);
                data.append("solution", this.state.selectedID[j].solutionId);
                data.append("revenue", this.state.selectedPer[j]);
                let name = this.state.selectedPerson[j].username;
                const headers = {
                  "Content-Type": "multipart/form-data",
                  // 'Authorization': token
                };
                axios
                  .post("/contract/create-description/", data, {
                    headers: headers,
                  })
                  .then((response) => {
                    if (response.status == 200) {
                      axios
                        .post(
                          "/contract/seekerCollaboration/" +
                            this.state.contractNumber +
                            "/" +
                            name +
                            "/"
                        )
                        .then((response) => {
                          this.setState({ Redirect: true });
                        });

                      //prototype&Test
                      axios
                        .post("/prototypetest/createPrototype/", formdata)
                        .then((res) => {
                          console.log(res.data);
                        });
                    }
                  });
              }
            }
          }
        });
    } else {
      //     <PopUp
      //     title={"Illegal Revenue Split"}
      //     desc={"Your revenue split is incorrect. Please give split to all solvers collaborating"}
      //     redir={"/"}
      //     show={modalShow}
      //     onHide={() => setModalShow(false)}
      //   />
      alert("illegal Split");
    }
  }
  async agree() {
    //const [modalShow, setModalShow] = React.useState(false);
    const post = this.state.selectedPer;
    if (this.state.agreeEnable) {
      await axios
        .post("/contract/create-contract/" + this.state.problemId + "/")
        .then((response) => {
          if (response.status == 200) {
            this.setState({ contractNumber: response.data.contractNumber });

            //  for(var i=0 ;i<post.length; i++){
            //     let temp = []
            //     temp.push(this.state.contractNumber)
            //     temp.push(this.state.selectedPerson[i].username)
            //     temp.push(this.state.selectedPerson[i].id)
            //     temp.push(this.state.selectedPer[i])
            //     this.setState(this.state.Post = this.state.Post.concat([temp]))
            // }
            for (let j = 0; j < post.length; j++) {
              let x = document.getElementById(j + "btn").innerText;
              x = parseInt(x);
              if (isNaN(x)) {
                alert("Revenue Split is not crct ...");
                break;
              }
            }
            for (let j = 0; j < post.length; j++) {
              let x = document.getElementById(j + "btn").innerText;
              x = parseInt(x);
              if (!isNaN(x)) {
                let data = new FormData();

                data.append("username", this.state.selectedPerson[j].username);
                data.append("contract", this.state.contractNumber);
                data.append("solution", this.state.selectedID[j].solutionId);
                data.append("revenue", this.state.selectedPer[j]);
                let name = this.state.selectedPerson[j].username;
                const headers = {
                  "Content-Type": "multipart/form-data",
                  // 'Authorization': token
                };
                axios
                  .post("/contract/create-description/", data, {
                    headers: headers,
                  })
                  .then((response) => {
                    if (response.status == 200) {
                      axios
                        .post(
                          "/contract/seekerCollaboration/" +
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
      //     <PopUp
      //     title={"Illegal Revenue Split"}
      //     desc={"Your revenue split is incorrect. Please give split to all solvers collaborating"}
      //     redir={"/"}
      //     show={modalShow}
      //     onHide={() => setModalShow(false)}
      //   />
      alert("illegal Split");
    }
  }
  handleModal(e) {
    this.setState({ show: !this.state.show });
    // axios
    //   .get("/prototypetest/solverName/" + this.props.user.solutionId + "/")
    //   .then((res) => {
    //     this.setState({
    //       currentSolUser: res.data.value,
    //     });
    //   });
    console.log("-------");
  }

  render() {
    //const contractNumber = this.state.contractNumber
    const selectedPerson = this.state.selectedPerson;
    console.log(selectedPerson);
    const startIndex = this.state.startIndex;
    let percentage = this.state.percentage;
    if (percentage.length > 0) {
      percentage = this.state.percentage[startIndex];
    }
    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Header className="">
            <Modal.Title className="mx-auto">
              Implementing this solution?
            </Modal.Title>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onClick={() => {
                this.handleModal();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div>
                {" "}
                If you are going to implement this solution select a solver as
                pilor builder(others also will be helping/involved in ideation)
                and continue or 'select no and continue'
                {selectedPerson.map((select, index) => (
                  <div>
                    <label class="form-check-label" for="exampleRadios1">
                      <div>
                        {index +
                          1 +
                          ")" +
                          select.firstname +
                          " " +
                          select.lastname}
                      </div>
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      class="form-check-input"
                      type="radio"
                      name="pBuilder"
                      id="pBuilder"
                      onChange={(e) =>
                        this.handleChange(e, select.username, index)
                      }
                    />
                  </div>
                ))}
              </div>
              <br></br>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary float-right"
              id="send"
              // onClick={() => this.submitsoln(this.props.user)}
              onClick={() => this.agree()}
            >
              {" "}
              No and Accept
            </button>

            <button
              className="btn btn-primary"
              id="send"
              onClick={() => this.agree1()}
              // onClick={() => this.submitsoln1(this.props.user)}
            >
              {" "}
              Yes and Accept
            </button>
          </Modal.Footer>
        </Modal>

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
                        src={select.img}
                        height="125"
                        width="125"
                        className="profile"
                        alt="profile"
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
                          Revenue Split
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
                              href=""
                              style={{
                                cursor: "pointer",
                                marginLeft: "20px",
                                color: "white",
                              }}
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

            <button
              onClick={() => this.handleModal()}
              // onClick={this.agree}
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
            </button>
            <button
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
            </button>
          </div>
        </section>
        {this.state.Redirect && (
          <Redirect
            to={{
              pathname: "/seekerContract",
              state: { contractNumber: this.state.contractNumber },
            }}
          ></Redirect>
        )}
      </div>
    );
  }
}

export default Confirm;
