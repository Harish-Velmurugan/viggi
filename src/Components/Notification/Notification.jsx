import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/nav";
import Axios from "axios";
import axios from "axios";
import "./notification.css";
import { Badge } from "react-bootstrap";
import recommendation from "./recommendation.svg";
import Result from "../Survey/Result";
// import { Icon, InlineIcon } from '@iconify/react';
// import bullhornIcon from '@iconify/icons-mdi/bullhorn';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {
        all_list: [],
      },
      days: "", //declare the state varialble
      id: "",
      count: [],
      redirect: "",
      initial: "expert",
      budget: 0,
      nid: "",
      choice: "",
      accept:false,
      acpt:null,
      reqid:null,
      ven:"data"
    };
    this.handleChange = this.handleChange.bind(this); //bind
    this.update = this.update.bind(this);
    this.viewReq = this.viewReq.bind(this);
    this.QuoteAccept = this.QuoteAccept.bind(this);
    this.singleAccept = this.singleAccept.bind(this);
  }

  update(id) {
    Axios.post(
      "/note/mark_as_read/" + localStorage.getItem("username") + "/" + id + "/"
    );
    Axios.get(
      "/api/notifyCountGet/" + localStorage.getItem("username") + "/"
    ).then((res) => {
      this.setState({ count: res.data.notifyCount });
      var a = res.data.notifyCount - 1;
      Axios.post(
        "/api/notifyCount/" + localStorage.getItem("username") + "/" + a + "/"
      );
    });
  }

  viewReq(id) {
    Axios.post(
      "/dashboard/removeRequested/" +
        id +
        "/" +
        localStorage.getItem("username") +
        "/"
    ).then((res) => {
      console.log(res.data);
    });
  }

  addMember = (solId, uid, nid) => {
    Axios.post("/sol/addMembers/" + solId + "/" + uid + "/" + nid + "/")
      .then((response) => {})
      .catch((error) => {
        console.log("error");
      });
  };

  rejectMember = (solId, uid, nid) => {
    Axios.post("/sol/rejectMembers/" + solId + "/" + uid + "/" + nid + "/")
      .then((response) => {})
      .catch((error) => {
        console.log("error");
      });
  };

  expertAccept = (nid) => {
    Axios.post("/api/expertAccept/" + nid + "/")
      .then((response) => {})
      .catch((error) => {
        console.log("error");
      });
  };

  expertPayProblem = (nid, ch, amt = 0) => {
    let budget = 0;
    const url = "/";
    const method = "GET";
    if (ch == "problem") {
      budget = 50;
    } else if (ch == "solution") {
      budget = 50;
    } else if (ch == "wicked") {
      budget = 100;
    } else if (ch == "data") {
      budget = amt;
    }
    Axios.request({
      baseURL: "/wallet/walletdetails/" + localStorage.getItem("email"),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.state.token,
      },
      url,
      method,
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ balance: response.data.cash });
          if (this.state.balance < budget * 0.3)
            this.setState({ showerror: true });
          else
            this.setState({
              redirect: "wallet",
              nid: nid,
              choice: ch,
              budget: budget,
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  expertPay = (nid, ch, amt = 0) => {
    let budget = "";
    if (ch == "problem") {
      budget = 50;
    } else if (ch == "solution") {
      budget = 50;
    } else if (ch == "wicked") {
      budget = 100;
    } else if (ch == "data") {
      budget = amt;
    }
    this.setState({ redirect: "bid", nid: nid, choice: ch, budget: budget });
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      choice: true,
    });
    localStorage.setItem("payment", this.state.budget);
    localStorage.setItem("state", this.state);
  }

  handleChange(event) {
    this.setState({ days: event.target.value });
  }

  onSubmit(pid) {
    Axios.post(
      "/dashboard/extendTimeAccepted/" +
        this.state.notification.all_list[pid].data.exreq.problemId +
        "/" +
        this.state.days +
        "/" +
        this.state.notification.all_list[pid].id +
        "/"
    ).then((res) => {
      if (res.status == 200) {
        document.getElementById(pid + "a1").disabled = "true";
        document.getElementById(pid + "a2").disabled = "true";
      }
    });
  }

  rejectRequest(pid) {
    Axios.post(
      "/dashboard/extendTimeRejected/" +
        this.state.notification.all_list[pid].data.exreq.problemId +
        "/" +
        this.state.notification.all_list[pid].data.exreq.username +
        "/" +
        this.state.notification.all_list[pid].id +
        "/"
    ).then((res) => {
      if (res.status == 200) {
        document.getElementById(pid + "a1").disabled = "true";
        document.getElementById(pid + "a2").disabled = "true";
      }
    });
  }

  async QuoteAccept(rid, name) {
    let data = new FormData();
    data.append("reqID", rid);
    data.append("user", name);
    const headers = {
      "Content-Type": "multipart/form-data",
      // 'Authorization': token
    };
    await axios
      .post("/helper/dpagreed/" + rid + "/", data, {
        headers: headers,
      })
      .then((response) => this.setState({accept:true,reqid:rid}));

      //this.setState({accept:false})
  }
 

  async singleAccept(rid){
    axios.get("/helper/singleaccept/"+rid+"/")
    .then((response) => {
      this.setState({ acpt: response.data });
      console.log(response.data)
    })

   }

  componentDidMount() {
    // const token=localStorage.getItem("token")
    const token1 = localStorage.getItem("username");

    Axios.get("/note/all_list/" + token1 + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.setState({ notification: response.data });
        //   this.setState({bookmark:response.data[1]})
        //   this.setState({result:this.state.bookmark[0]['problems_interested']})
      })
      .catch((error) => {
        console.log(error);
      });

    
  }

  render() {
    console.log(this.state.notification,this.state.acpt);
    if (this.state.redirect == "wallet") {
      return (
        <Redirect
          push
          to={{ pathname: "/walletpay", state: { main: this.state } }}
        />
      );
    }
    if (this.state.redirect == "bid") {
      return (
        <Redirect push to={{ pathname: "/bid", state: { main: this.state } }} />
      );
    }

    return (
      <div>
        <div>
          <div>
            <Navbar />
          </div>
        </div>

        <div>
          {/* <div className="container"> */}
          {/* <div className="row"> */}
          <div>
            <div>
              <div className="form-row">
                <div className="form-group col-md-10">
                  <div className="container-fluid">
                    <div className="m-5 p-4" style={{ width: "100%" }}>
                      <div className>
                        <h5
                          className="border-bottom p-2"
                          style={{ fontSize: "18px" }}
                        >
                          <strong>Your Notifications</strong>
                        </h5>
                        {/* <Result /> */}
                      </div>
                      {/* <div className="mt-4">
                                        <ul className="nav nav-tabs bg-light" role="tablist" style={{fontSize: '15px'}}>
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#profile">Latest</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#company">Earlier</a>
                                            </li>
                                        </ul>
                                    </div> */}
                      <div className="tab-content">
                        <div id="profile" className="container tab-pane active">
                          <br />
                          {this.state.notification.all_list.map(
                            (notification, index) =>
                              (() => {
                                // expired request -- dashboard

                                if (
                                  notification.verb ==
                                  "You got a request to solve a problem"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                            {/* <img class="rounded-circle" alt="100x100" src="https://placehold.it/100X100/000fff/ " data-holder-rendered="true"/> */}
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.verb}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.verb}
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <div className="float-right">
                                              <Link
                                                to={{
                                                  pathname: "/problemdetails",
                                                  state: {
                                                    pid:
                                                      notification.data.problem
                                                        .problemId,
                                                  },
                                                }}
                                              >
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    notification.unread
                                                      ? this.update(
                                                          notification.id
                                                        )
                                                      : console.log("read");
                                                    this.viewReq(
                                                      notification.data.problem
                                                        .problemId
                                                    );
                                                  }}
                                                  class="btn btn-primary"
                                                >
                                                  View Problem
                                                </button>
                                              </Link>
                                            </div>
                                            <h6>
                                              Title:&nbsp;
                                              {
                                                notification.data.problem
                                                  .description
                                              }
                                            </h6>
                                            <h6>
                                              You are one of the top solver in
                                              this domain so you have been
                                              requested to solve this problem.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // winning solutions and collaboration(more sln) -- smartcontract
                                else if (
                                  notification.verb ==
                                  "solution won and collaborated"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            {notification.unread ? (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname: "/solverContract",
                                                  state: this.state.notification
                                                    .all_list[index].data
                                                    .contract.contractNumber,
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Congratulations! Your
                                                    solution is selected for
                                                    collaboration.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname: "/solverContract",
                                                  state: this.state.notification
                                                    .all_list[index].data
                                                    .contract.contractNumber,
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Congratulations! Your
                                                    solution is selected for
                                                    collaboration.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            )}
                                            <br />
                                            <h6>
                                              Your solution is selected for
                                              collaboration with others. View to
                                              know the revenue split and problem
                                              details
                                            </h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // contract tc solver solver -- smartcontract
                                else if (
                                  notification.verb ==
                                  "solver solver collaborated"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            {notification.unread ? (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname:
                                                    "/solverCollaborationContract",
                                                  state: {
                                                    contractNumber: this.state
                                                      .notification.all_list[
                                                      index
                                                    ].data.contract
                                                      .contractNumber,
                                                  },
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Congratulations! Your
                                                    contract for collaborating a
                                                    solution is ready.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname:
                                                    "/solverCollaborationContract",
                                                  state: {
                                                    contractNumber: this.state
                                                      .notification.all_list[
                                                      index
                                                    ].data.contract
                                                      .contractNumber,
                                                  },
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Congratulations! Your
                                                    contract for collaborating a
                                                    solution is ready.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            )}
                                            <br />
                                            <h6>
                                              Your contract is ready for
                                              collaboration with others. View to
                                              know the revenue split and
                                              solution details
                                            </h6>
                                            <Link
                                              to={{
                                                pathname:
                                                  "/solverCollaborationContract",
                                                state: {
                                                  contractNumber: this.state
                                                    .notification.all_list[
                                                    index
                                                  ].data.contract
                                                    .contractNumber,
                                                },
                                              }}
                                            >
                                              <Badge
                                                style={{
                                                  backgroundColor: "#323754",
                                                  color: "white",
                                                }}
                                              >
                                                View Contract
                                              </Badge>
                                            </Link>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // solver solver agree tc -- smartcontract
                                else if (
                                  notification.verb ==
                                  "solver solver split accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            {notification.unread ? (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname:
                                                    "/solverCollaborationContract",
                                                  state: {
                                                    contractNumber: this.state
                                                      .notification.all_list[
                                                      index
                                                    ].data.contract
                                                      .contractNumber,
                                                  },
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Your Team Member has
                                                    accepted their revenue
                                                    split.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname:
                                                    "/solverCollaborationContract",
                                                  state: {
                                                    contractNumber: this.state
                                                      .notification.all_list[
                                                      index
                                                    ].data.contract
                                                      .contractNumber,
                                                  },
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Your Team Member has
                                                    accepted their revenue
                                                    split.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            )}
                                            <br />
                                            <h6>
                                              Your Team Member has accepted
                                              their revenue split. View to know
                                              the revenue split and solution
                                              details
                                            </h6>
                                            <Link
                                              to={{
                                                pathname:
                                                  "/solverCollaborationContract",
                                                state: {
                                                  contractNumber: this.state
                                                    .notification.all_list[
                                                    index
                                                  ].data.contract
                                                    .contractNumber,
                                                },
                                              }}
                                            >
                                              <Badge
                                                style={{
                                                  backgroundColor: "#323754",
                                                  color: "white",
                                                }}
                                              >
                                                View Contract
                                              </Badge>
                                            </Link>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // winning solution accepted (one soln) -- smartcontract
                                else if (
                                  notification.verb ==
                                  "solution won and accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            {notification.unread ? (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname: "/solcontract",
                                                  state: this.state.notification
                                                    .all_list[index].data
                                                    .contract.contractNumber,
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Congratulations! Your
                                                    solution is accepted.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname: "/solcontract",
                                                  state: this.state.notification
                                                    .all_list[index].data
                                                    .contract.contractNumber,
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Congratulations! Your
                                                    solution is accepted.
                                                  </strong>
                                                </h5>
                                              </Link>
                                            )}
                                            <br />
                                            <h6>Accepted</h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //problem deadline crossed-choose winner
                                else if (
                                  notification.verb ==
                                  "problem deadline crossed-choose winner"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{
                                                fontsize: "36px",
                                                backgroundColor: "red",
                                              }}
                                            ></i>
                                          </div>
                                          <div
                                            className="pt-2 pl-2 flex-grow-1"
                                            onClick={() => {
                                              notification.unread
                                                ? this.update(notification.id)
                                                : console.log("read");
                                            }}
                                          >
                                            {notification.unread ? (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  "
                                                </strong>
                                              </h5>
                                            ) : (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  "
                                                </strong>
                                              </h5>
                                            )}
                                            <br />
                                            <h6>
                                              Choose the winner.If
                                              not it will be moved to expired
                                              problem and you cannot handle the
                                              solution anymore if you have more
                                              than five solutions
                                            </h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //one day more-choose winner
                                else if (
                                  notification.verb ==
                                  "one day more-choose winner"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{
                                                fontsize: "36px",
                                                backgroundColor: "red",
                                              }}
                                            ></i>
                                          </div>
                                          <div
                                            className="pt-2 pl-2 flex-grow-1"
                                            onClick={() => {
                                              notification.unread
                                                ? this.update(notification.id)
                                                : console.log("read");
                                            }}
                                          >
                                            {notification.unread ? (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  ".You have only one day left
                                                  to choose the winner.
                                                </strong>
                                              </h5>
                                            ) : (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  ".You have only one day left
                                                  to choose the winner.
                                                </strong>
                                              </h5>
                                            )}
                                            <br />
                                            <h6>
                                              Choose the winner within the last
                                              day.If not it will be moved to
                                              expired problem and you cannot
                                              handle the solution anymore if you
                                              have more than five solutions
                                            </h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }




                                //topsolver problem deadline crossed-choose winner
                                else if (
                                  notification.verb ==
                                  "topsolver problem deadline crossed-choose winner"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{
                                                fontsize: "36px",
                                                backgroundColor: "red",
                                              }}
                                            ></i>
                                          </div>
                                          <div
                                            className="pt-2 pl-2 flex-grow-1"
                                            onClick={() => {
                                              notification.unread
                                                ? this.update(notification.id)
                                                : console.log("read");
                                            }}
                                          >
                                            {notification.unread ? (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  "(Top Solver requested).
                                                </strong>
                                              </h5>
                                            ) : (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  "(Top Solver requested).
                                                </strong>
                                              </h5>
                                            )}
                                            <br />
                                            <h6>
                                              Choose the winner.If
                                             not you cannot handle the problem or solutions anymore.
                                            </h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //topsolverone day more-choose winner
                                else if (
                                  notification.verb ==
                                  "topsolverone day more-choose winner"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{
                                                fontsize: "36px",
                                                backgroundColor: "red",
                                              }}
                                            ></i>
                                          </div>
                                          <div
                                            className="pt-2 pl-2 flex-grow-1"
                                            onClick={() => {
                                              notification.unread
                                                ? this.update(notification.id)
                                                : console.log("read");
                                            }}
                                          >
                                            {notification.unread ? (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  ".You have only one day left
                                                  to choose the winner(Top Solver requested).
                                                </strong>
                                              </h5>
                                            ) : (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "red" }}
                                                >
                                                  Deadline has crossed for your
                                                  problem title "
                                                  {notification.data.data.title}
                                                  ".You have only one day left
                                                  to choose the winner(Top Solver requested).
                                                </strong>
                                              </h5>
                                            )}
                                            <br />
                                            <h6>
                                              Choose the winner within the last
                                              day.If not you cannot handle the solutions anymore.
                                            </h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //Top Solver Accepted
                                else if (
                                  notification.verb ==
                                  "Top Solver Accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{
                                                fontsize: "36px",
                                                
                                              }}
                                            ></i>
                                          </div>
                                          <div
                                            className="pt-2 pl-2 flex-grow-1"
                                            onClick={() => {
                                              notification.unread
                                                ? this.update(notification.id)
                                                : console.log("read");
                                            }}
                                          >
                                            {notification.unread ? (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "blue" }}
                                                >
                                                  Top solver accepted - {notification.data.data.title}
                                                </strong>
                                              </h5>
                                            ) : (
                                              <h5 className="mb-0">
                                                <strong
                                                  style={{ color: "black" }}
                                                >
                                                  Top solver accepted - {notification.data.data.title}
                                                </strong>
                                              </h5>
                                            )}
                                            <br />
                                            <h6>
                                            {notification.data.name.name} has accepted your request to solve the problem {notification.data.data.title}
                                            </h6>
                                            <br></br>
                                            {/* <div className="float-right"></div> */}
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }  









                                // seeker solver tc agree (solver) (one soln)--smartcontract
                                else if (
                                  notification.verb == "solution accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <Link to={{}}>
                                              <h5 className="mb-0">
                                                {notification.unread}?
                                                <strong
                                                  style={{ color: "blue" }}
                                                >
                                                  {
                                                    this.state.notification
                                                      .all_list[index].actor
                                                  }{" "}
                                                  have accepted to collaborate
                                                </strong>
                                                :
                                                <strong
                                                  style={{ color: "black" }}
                                                >
                                                  {
                                                    this.state.notification
                                                      .all_list[index].actor
                                                  }{" "}
                                                  have accepted to collaborate
                                                </strong>
                                              </h5>
                                              {notification.unread ? (
                                                <span class="dot float-right "></span>
                                              ) : (
                                                ""
                                              )}
                                            </Link>
                                            <br />
                                            <h6>
                                              {
                                                this.state.notification
                                                  .all_list[index].actor
                                              }{" "}
                                              card-header bg-warning text-whitee
                                              for your problem under split of
                                              &nbsp;
                                              {
                                                this.state.notification
                                                  .all_list[index].data.desc
                                                  .revenue
                                              }
                                              &nbsp;%
                                            </h6>
                                            <Link
                                              to={{
                                                pathname: "/seekerContract",
                                                state: this.state.notification
                                                  .all_list[index].data.contract
                                                  .contractNumber,
                                              }}
                                            >
                                              <Badge
                                                style={{
                                                  backgroundColor: "#323754",
                                                  color: "white",
                                                }}
                                              >
                                                View Seeker Contract
                                              </Badge>
                                            </Link>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                //changes made

                                // seeker solver tc agree (solver) (many soln)--smartcontract
                                else if (
                                  notification.verb ==
                                  "solver solution accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <h5 className="mb-0">
                                              {notification.unread ? (
                                                <strong
                                                  style={{ color: "blue" }}
                                                >
                                                  {
                                                    this.state.notification
                                                      .all_list[index].actor
                                                  }{" "}
                                                  have accepted{" "}
                                                </strong>
                                              ) : (
                                                <strong
                                                  style={{ color: "black" }}
                                                >
                                                  {
                                                    this.state.notification
                                                      .all_list[index].actor
                                                  }{" "}
                                                  have accepted
                                                </strong>
                                              )}
                                            </h5>
                                            <br />
                                            <h6>
                                              {
                                                this.state.notification
                                                  .all_list[index].actor
                                              }{" "}
                                              have accepted to split of &nbsp;
                                              {
                                                this.state.notification
                                                  .all_list[index].data.desc
                                                  .revenue
                                              }
                                              &nbsp;%
                                            </h6>

                                            <Link
                                              to={{
                                                pathname: "/contract",
                                                state: {
                                                  contractNumber: this.state
                                                    .notification.all_list[
                                                    index
                                                  ].data.contract
                                                    .contractNumber,
                                                  solId: this.state.notification
                                                    .all_list[index].data.desc
                                                    .solution,
                                                },
                                              }}
                                            >
                                              <Badge
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                style={{
                                                  backgroundColor: "#323754",
                                                  color: "white",
                                                }}
                                              >
                                                View Seeker Contract
                                              </Badge>
                                            </Link>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                //survey result
                                else if (
                                  notification.verb == "survey complete"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            {/* <span class="iconify" data-icon="mdi-bullhorn" data-inline="false" style={{fontsize:'',color:'red'}}></span> */}
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            {notification.unread ? (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname: "/Result",
                                                  state: this.state.notification
                                                    .all_list[index].data.survey
                                                    .surveyID,
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Your Survey Result is ready
                                                    !!{" "}
                                                  </strong>
                                                </h5>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                                to={{
                                                  pathname: "/Result",
                                                  state: this.state.notification
                                                    .all_list[index].data.survey
                                                    .surveyID,
                                                }}
                                              >
                                                <h5 className="mb-0">
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Your Survey result is ready
                                                    !!
                                                  </strong>
                                                </h5>
                                              </Link>
                                            )}
                                            <br />
                                            <h6>
                                              Your Survey result is ready !!
                                              Click here to view the results..
                                              <Badge>
                                                <Link
                                                  to={{
                                                    pathname: "/Result",
                                                    state: this.state
                                                      .notification.all_list[
                                                      index
                                                    ].data.survey.surveyID,
                                                  }}
                                                >
                                                  View More
                                                </Link>
                                              </Badge>
                                            </h6>
                                            <br></br>
                                            <div className="float-right"></div>
                                            {/* <h6>{notification.data.problem.description}</h6> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // prblm extend day request -- dashboard
                                else if (
                                  notification.verb ==
                                  "request to extend deadline"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.verb}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.verb}
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right">
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                                data-toggle="modal"
                                                data-target={"#exampleModalCenter".concat(
                                                  index
                                                )}
                                              >
                                                View details
                                              </button>
                                              <div
                                                class="modal fade"
                                                id={"exampleModalCenter".concat(
                                                  index
                                                )}
                                                tabindex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-hidden="true"
                                              >
                                                <div
                                                  class="modal-dialog modal-dialog-centered"
                                                  role="document"
                                                >
                                                  <div class="modal-content">
                                                    <div class="modal-header">
                                                      <h5
                                                        class="modal-title"
                                                        id="exampleModalLongTitle"
                                                      >
                                                        Request for extending
                                                        the number of days.
                                                      </h5>
                                                      <button
                                                        type="button"
                                                        class="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                      >
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>
                                                      </button>
                                                    </div>
                                                    <div class="modal-body">
                                                      <h5
                                                        style={{
                                                          fontSize: "12pt",
                                                        }}
                                                      >
                                                        <strong>
                                                          Problem title:
                                                        </strong>
                                                        &nbsp;
                                                        {
                                                          notification.data.obj
                                                            .title
                                                        }
                                                      </h5>
                                                      <div>
                                                        <h5
                                                          style={{
                                                            fontSize: "12pt",
                                                          }}
                                                        >
                                                          <strong>
                                                            No. of days
                                                            required:
                                                          </strong>
                                                          &nbsp;
                                                          {
                                                            notification.data
                                                              .exreq.days
                                                          }
                                                        </h5>
                                                        <h5
                                                          style={{
                                                            fontSize: "12pt",
                                                          }}
                                                        >
                                                          <strong>
                                                            Reason for the
                                                            request:
                                                          </strong>
                                                        </h5>
                                                        <p>
                                                          {
                                                            notification.data
                                                              .exreq.reason
                                                          }
                                                        </p>
                                                        <hr></hr>
                                                        <h5
                                                          style={{
                                                            fontSize: "12pt",
                                                          }}
                                                        >
                                                          <strong>
                                                            No.of days willing
                                                            to provide:&nbsp;
                                                          </strong>
                                                          <input
                                                            type="number"
                                                            id="days"
                                                            min="1"
                                                            max="100"
                                                            onChange={
                                                              this.handleChange
                                                            }
                                                            value={
                                                              this.state.days
                                                            }
                                                          ></input>
                                                          &nbsp;days
                                                        </h5>
                                                      </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                      <button
                                                        type="button"
                                                        class="btn btn-secondary"
                                                        data-dismiss="modal"
                                                      >
                                                        Close
                                                      </button>
                                                      <button
                                                        type="button"
                                                        class="btn btn-danger"
                                                        id={index + "a2"}
                                                        onClick={() => {
                                                          this.rejectRequest(
                                                            index
                                                          );
                                                        }}
                                                      >
                                                        Reject
                                                      </button>
                                                      <button
                                                        type="button"
                                                        class="btn btn-success"
                                                        id={index + "a1"}
                                                        onClick={() => {
                                                          this.onSubmit(index);
                                                        }}
                                                      >
                                                        Extend
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <h6>
                                              The solver has requested to extend
                                              the days...Click to view the
                                              details.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // seeker accepted to extend days -- dashboard
                                else if (
                                  notification.verb ==
                                  "Your involved problem has been extended"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-check"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.verb}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.verb}
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.problem.title}
                                            </h6>
                                            <h6>
                                              The seeker has accepted your
                                              request to extend the days...
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // seeker rejected deadline request solver side notifiaction -- dashboard
                                else if (
                                  notification.verb ==
                                  "deadline extend request rejected"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    has rejected your request to
                                                    extend deadline
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    has rejected your request to
                                                    extend deadline
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.problem.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // deadline request accepted (seeker side) -- dashboard
                                else if (
                                  notification.verb ==
                                  "deadline request accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You has accepted the request
                                                    to extend deadline
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You has accepted the request
                                                    to extend deadline
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.obj.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // deadline request rejected (seeker side) -- dashboard
                                else if (
                                  notification.verb ==
                                  "deadline request rejected"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You has rejected the request
                                                    to extend deadline
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You has rejected the request
                                                    to extend deadline
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.obj.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // solver solver request -- dashboard
                                else if (
                                  notification.verb ==
                                  "solver request for collabration"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.rejectMember(
                                                    notification.data.sol
                                                      .solutionId,
                                                    notification.data.user
                                                      .username,
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-danger"
                                              >
                                                Reject
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.addMember(
                                                    notification.data.sol
                                                      .solutionId,
                                                    notification.data.user
                                                      .username,
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Accept
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a
                                                    collaboration request
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a
                                                    collaboration request
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // leader accepted as member -- solutions
                                else if (
                                  notification.verb == "added as member"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-user-plus"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    has accepted your
                                                    collaboration request
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    has accepted your
                                                    collaboration request
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // leader verb change after accepted -- solution
                                else if (
                                  notification.verb ==
                                  "you accepted this request"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-user-plus"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You accepted{" "}
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    request for collaboration
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You accepted{" "}
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    request for collaboration
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // leader verb change after rejected -- solution
                                else if (
                                  notification.verb ==
                                  "you rejected this request"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-user-plus"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You rejected{" "}
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    request for collaboration
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You rejected{" "}
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    request for collaboration
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // leader rejected collaboration -- solutions
                                else if (
                                  notification.verb ==
                                  "collaboration requested rejected"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    has rejected your
                                                    collaboration request
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    has rejected your
                                                    collaboration request
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //rp return for participating solution -- solutions
                                else if (
                                  notification.verb ==
                                  "You gained reputation points for participation"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You gained reputation points
                                                    for participating in{" "}
                                                    {
                                                      notification.data.prblm
                                                        .title
                                                    }
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You gained reputation points
                                                    for participating in{" "}
                                                    {
                                                      notification.data.prblm
                                                        .title
                                                    }
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //rp return for winning a solution -- solutions
                                else if (
                                  notification.verb ==
                                  "You gained reputation points for winning a solution"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You gained reputation points
                                                    for winning a solution in{" "}
                                                    {
                                                      notification.data.prblm
                                                        .title
                                                    }
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You gained reputation points
                                                    for winning a solution in{" "}
                                                    {
                                                      notification.data.prblm
                                                        .title
                                                    }
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //rp return for bidding a solution (won) -- solutions
                                else if (
                                  notification.verb ==
                                  "your bidded solution won"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You gained reputation points
                                                    for voting a solution in{" "}
                                                    {
                                                      notification.data.sol
                                                        .title
                                                    }
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You gained reputation points
                                                    for voting a solution in{" "}
                                                    {
                                                      notification.data.sol
                                                        .title
                                                    }
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //rp return for bidding a solution (won) -- solutions
                                else if (
                                  notification.verb ==
                                  "your bidded solution lost"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You lose reputation points
                                                    for voting a solution in{" "}
                                                    {
                                                      notification.data.sol
                                                        .title
                                                    }
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You lose reputation points
                                                    for voting a solution in{" "}
                                                    {
                                                      notification.data.sol
                                                        .title
                                                    }
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.sol.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //request for lor
                                else if (
                                  notification.verb == "request for lor"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <img src={recommendation} />
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Request for Letter of
                                                    Recommendation
                                                    {}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Request for Letter of
                                                    Recommendation
                                                    {}
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              <Link
                                                to={{
                                                  pathname: "lor/",
                                                  state: {
                                                    obj: notification.data.obj,
                                                    problem:
                                                      notification.data.problem,
                                                    sol: notification.data.sol,
                                                    reason:
                                                      notification.data.reason,
                                                    seeker:
                                                      notification.data.seeker,
                                                    nid: notification.id,
                                                    sender:
                                                      notification.actor_object_id,
                                                  },
                                                }}
                                              >
                                                {console.log(
                                                  notification.data.sol
                                                )}

                                                {notification.data.reason
                                                  .status == "null" ? (
                                                  <button
                                                    className="btn btn-primary float-right"
                                                    onClick={() => {
                                                      notification.unread
                                                        ? this.update(
                                                            notification.id
                                                          )
                                                        : console.log("read");
                                                    }}
                                                  >
                                                    &nbsp;View&nbsp;
                                                  </button>
                                                ) : (
                                                  ""
                                                )}
                                                {notification.data.reason
                                                  .status == "accepted" ? (
                                                  <button
                                                    className="btn btn-success float-right"
                                                    disabled="True"
                                                  >
                                                    &nbsp;Accepted&nbsp;
                                                  </button>
                                                ) : (
                                                  ""
                                                )}

                                                {notification.data.reason
                                                  .status == "rejected" ? (
                                                  <button
                                                    className="btn btn-danger float-right"
                                                    disabled="True"
                                                  >
                                                    &nbsp;Rejected&nbsp;
                                                  </button>
                                                ) : (
                                                  ""
                                                )}
                                              </Link>
                                              <strong>
                                                {notification.data.obj.name}
                                              </strong>{" "}
                                              has requested for Letter of
                                              Recommendation,who was one of the
                                              solver in your problem"
                                              <strong>
                                                {notification.data.obj.title}"
                                              </strong>
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //lor Accepted
                                else if (notification.verb == "lor Accepted") {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <img src={recommendation} />
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Request for Letter of
                                                    Recommendation "Accepted"
                                                    {}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Request for Letter of
                                                    Recommendation "Accepted"
                                                    {}
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              <Link
                                                to={{
                                                  pathname: "/viewlor",
                                                  state: {
                                                    obj: notification.data.obj,
                                                  },
                                                }}
                                              >
                                                {console.log(
                                                  notification.data.sol
                                                )}

                                                <button
                                                  className="btn btn-primary float-right"
                                                  onClick={() => {
                                                    notification.unread
                                                      ? this.update(
                                                          notification.id
                                                        )
                                                      : console.log("read");
                                                  }}
                                                >
                                                  &nbsp;View&nbsp;
                                                </button>
                                              </Link>
                                              Your request for lor(
                                              {
                                                notification.data.obj
                                                  .projectTitle
                                              }
                                              ) has been accepted and you can
                                              view or download here.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //lor Rejected
                                else if (notification.verb == "lor Rejected") {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <img src={recommendation} />
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5
                                                className="mb-0"
                                                onClick={() => {
                                                  notification.unread
                                                    ? this.update(
                                                        notification.id
                                                      )
                                                    : console.log("read");
                                                }}
                                              >
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Request for Letter of
                                                    Recommendation "Rejected"
                                                    {}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Request for Letter of
                                                    Recommendation "Rejected"
                                                    {}
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Your request for lor(
                                              {
                                                notification.data.obj
                                                  .projectTitle
                                              }
                                              ) has been rejected.
                                            </h6>
                                            <p>
                                              <strong>REASON:</strong>
                                              {
                                                notification.data.obj
                                                  .rejectReason
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // rp return if member voted after collaboration -- solutions
                                else if (
                                  notification.verb == "bidded rp returned"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-window-close"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Your bid amount{" "}
                                                    {
                                                      notification.data.solution
                                                        .bidreturn
                                                    }{" "}
                                                    has been returned
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Your bid amount{" "}
                                                    {
                                                      notification.data.solution
                                                        .bidreturn
                                                    }{" "}
                                                    has been returned
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.solution.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //expert- frame request -- updateapi
                                else if (
                                  notification.verb ==
                                  "You got a request for framing a problem"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.rejectMember(
                                                    notification.data.sol
                                                      .solutionId,
                                                    notification.data.user
                                                      .username,
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-danger"
                                              >
                                                Reject
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertAccept(
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Accept
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a request for
                                                    Problem Framing
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a request for
                                                    Problem Framing
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {notification.data.request.bucket}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //expert- wicked request -- updateapi
                                else if (
                                  notification.verb ==
                                  "You got a request for solving wicked problems"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.rejectMember(
                                                    notification.data.sol
                                                      .solutionId,
                                                    notification.data.user
                                                      .username,
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-danger"
                                              >
                                                Reject
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertAccept(
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Accept
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a request to
                                                    solve a wicked problem
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a request to
                                                    solve a wicked problem
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {
                                                notification.data.request
                                                  .buckets
                                              }
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //expert- solution decompose request -- updateapi
                                else if (
                                  notification.verb ==
                                  "You got a request for decomposing solutions"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.rejectMember(
                                                    notification.data.sol
                                                      .solutionId,
                                                    notification.data.user
                                                      .username,
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-danger"
                                              >
                                                Reject
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertAccept(
                                                    notification.id
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Accept
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a request for
                                                    Solution Decomposition
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have sent you a request for
                                                    Solution Composition
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Problem:&nbsp;
                                              {notification.data.problem.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // expert- frame accepted -- updateapi
                                else if (
                                  notification.verb ==
                                  "accepted framing problem request"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertPayProblem(
                                                    notification.id,
                                                    "problem"
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Pay with wallet
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertPay(
                                                    notification.id,
                                                    "problem"
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Pay directly
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for framing problem.
                                                    Complete your payment
                                                    process to make a discussion
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for framing problem.
                                                    Complete your payment
                                                    process to make a discussion
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {notification.data.request.bucket}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // expert- wicked accepted -- updateapi
                                else if (
                                  notification.verb ==
                                  "accepted solving wicked problem"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertPayProblem(
                                                    notification.id,
                                                    "wicked"
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Pay with wallet
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertPay(
                                                    notification.id,
                                                    "wicked"
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Pay directly
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for solving wicked problem.
                                                    Complete your payment
                                                    process to make a discussion
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for solving wicked problem.
                                                    Complete your payment
                                                    process to make a discussion
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {
                                                notification.data.request
                                                  .buckets
                                              }
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // expert- solution decomposing accepted -- updateapi
                                else if (
                                  notification.verb ==
                                  "accepted decomposing solution request"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertPayProblem(
                                                    notification.id,
                                                    "solution"
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Pay with wallet
                                              </button>
                                              &nbsp;&nbsp;
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  this.expertPay(
                                                    notification.id,
                                                    "solution"
                                                  );
                                                }}
                                                class="btn btn-success"
                                                id="a1"
                                              >
                                                Pay directly
                                              </button>
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for solution decomposition.
                                                    Complete your payment
                                                    process to make a discussion
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for solution decomposing.
                                                    Complete your payment
                                                    process to make a discussion
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Problem:&nbsp;
                                              {notification.data.problem.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // expert- solution pay -- updateapi
                                else if (
                                  notification.verb ==
                                  "chat room created for solution decomposition"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    created a chatroom for
                                                    discussion
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    created a chatroom for
                                                    discussion
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Problem:&nbsp;
                                              {notification.data.problem.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // expert- frame accepted -- updateapi
                                else if (
                                  notification.verb ==
                                  "chat room created for problem framing"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    created a chatroom for
                                                    discussion
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    created a chatroom for
                                                    discussion
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {notification.data.request.bucket}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //1-appointed as pilot builder
                                else if (
                                  notification.verb ==
                                  "appointed as pilotbuilder"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    You have been appointed as
                                                    Pilot Builder
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    You have been appointed as
                                                    Pilot Builder
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Since your solution(
                                              {notification.data.obj.title}) is
                                              selected as winning solution and
                                              its going to be implemented you
                                              have been appointed as pilot
                                              builder for your solution &nbsp; "
                                              {notification.data.obj.title}"
                                              <br />
                                              (Once the contract is completed by
                                              the seeker you can start your work
                                              in prototype and testing panel)
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //2-prototype and test started
                                else if (
                                  notification.verb ==
                                  "prototype and test started"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Prototyping and Testing
                                                    Started
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Prototyping and Testing
                                                    Started
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              The contract is
                                              completed,prototyping and testing
                                              has started for the solution
                                              &nbsp;"
                                              {notification.data.obj.value}".
                                              Submit the planning in prototype
                                              and testing panel.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //3-pilotbuilder completed planning
                                else if (
                                  notification.verb ==
                                  "pilotbuilder completed planning"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Pilotbuilder completed
                                                    planning phase
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Pilotbuilder completed
                                                    planning phase
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Pilotbuilder has submitted the
                                              planning for the solution "
                                              {notification.data.obj.title}".
                                              Accept or reject the planning in
                                              prototype and testing panel.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //4-planning Phase Accepted
                                else if (
                                  notification.verb == "planning Phase Accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Pilot Implementer has
                                                    accepted your planning phase
                                                    submission.
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Pilot Implementer has
                                                    accepted your planning phase
                                                    submission.
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Pilot Implementer has accepted
                                              your plannig in prototyping and
                                              testing for the solution "
                                              {notification.data.obj.value}".
                                              (You can submit your prototype
                                              now)
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //5-pilotbuilder completed prototypeSubmission
                                else if (
                                  notification.verb ==
                                  "pilotbuilder completed prototypeSubmission"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Pilot Builder has submitted
                                                    prototype.
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Pilot Builder has submitted
                                                    prototype.
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Pilot builder has submitted
                                              prototype for the solution your
                                              plannig in prototyping and testing
                                              for the solution "
                                              {notification.data.obj.title}".
                                              (Accept the submission in
                                              prototype and testing panel for
                                              starting implementation)
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //6-prototype Phase Accepted
                                else if (
                                  notification.verb ==
                                  "prototype Phase Accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Pilot Implementer has
                                                    accepted prototype
                                                    submission
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Pilot Implementer has
                                                    accepted prototype
                                                    submission
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Pilot implementer has accepted
                                              your prototype for the solution "
                                              {notification.data.obj.value}"
                                              prototyping and testing
                                              (Implementation phase has been
                                              started).
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //7-prototype testing implementation completed
                                else if (
                                  notification.verb ==
                                  "prototype testing implementation completed"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Implementation phase has
                                                    been completed succesfully!
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Implementation phase has
                                                    been completed succesfully!
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Implementation is completed for
                                              the solution"
                                              {notification.data.data.value}" in
                                              prototype and testing.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //7-planning Phase Rejected
                                else if (
                                  notification.verb == "planning Phase Rejected"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Pilot Implementer has
                                                    rejected your planning phase
                                                    submission.
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Pilot Implementer has
                                                    rejected your planning phase
                                                    submission.
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              Pilot Implementer has rejected
                                              your plannig in prototyping and
                                              testing for the solution "
                                              {notification.data.obj.value}".
                                              (Prototyping and testing for this
                                              solution will not be proceed then)
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                //7-prototype chatroom created
                                else if (
                                  notification.verb ==
                                  "prototype chatroom created"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        onClick={() => {
                                          notification.unread
                                            ? this.update(notification.id)
                                            : console.log("read");
                                        }}
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Prototyping and testing -
                                                    Chatroom created
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Prototyping and testing -
                                                    Chatroom created
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            <div className="float-right"></div>
                                            <h6>
                                              The solution "
                                              {notification.data.obj.value}" is
                                              going to be implemented.So you
                                              have been included in the
                                              discussion for prototyping and
                                              testing for this solution.
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // expert- frame accepted -- updateapi
                                else if (
                                  notification.verb ==
                                  "chat room created for solving wicked problem"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    created a chatroom for
                                                    discussion
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    created a chatroom for
                                                    discussion
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {
                                                notification.data.request
                                                  .buckets
                                              }
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                //problem framed by experts -- solutions
                                else if (
                                  notification.verb == "problem is framed"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <Link
                                                    to={{
                                                      pathname: "/viewTemplate",
                                                      state:
                                                        notification.data.prblm,
                                                      nid: notification.id,
                                                    }}
                                                  >
                                                    <strong
                                                      style={{ color: "blue" }}
                                                    >
                                                      {notification.data.user
                                                        .firstname +
                                                        " " +
                                                        notification.data.user
                                                          .lastname}{" "}
                                                      framed your problem. Click
                                                      view the template.
                                                    </strong>
                                                  </Link>
                                                ) : (
                                                  <Link
                                                    to={{
                                                      pathname: "/viewTemplate",
                                                      state:
                                                        notification.data.prblm,
                                                      nid: notification.id,
                                                    }}
                                                  >
                                                    <strong
                                                      style={{ color: "black" }}
                                                    >
                                                      {notification.data.user
                                                        .firstname +
                                                        " " +
                                                        notification.data.user
                                                          .lastname}{" "}
                                                      framed your problem. Click
                                                      view the template.
                                                    </strong>{" "}
                                                  </Link>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Bucket:&nbsp;
                                              {notification.data.prblm.bucket}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                } else if (
                                  notification.verb ==
                                  "data provider req accepted"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <div className="float-right">
                                              &nbsp;&nbsp;
                                              {notification.data.req.vendor ==
                                                "data" && (
                                                <>
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      this.expertPayProblem(
                                                        notification.id,
                                                        "data",
                                                        notification.data.req
                                                          .budget
                                                      );
                                                    }}
                                                    class="btn btn-success"
                                                    id="a1"
                                                  >
                                                    Pay with wallet
                                                  </button>
                                                  &nbsp;&nbsp;
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      this.expertPay(
                                                        notification.id,
                                                        "data",
                                                        notification.data.req
                                                          .budget
                                                      );
                                                    }}
                                                    class="btn btn-success"
                                                    id="a1"
                                                  >
                                                    Pay directly
                                                  </button>
                                                </>
                                              )}
                                            </div>
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    {notification.data.req
                                                      .vendor == "data" ? (
                                                      <>
                                                        {notification.data.user
                                                          .firstname +
                                                          " " +
                                                          notification.data.user
                                                            .lastname}{" "}
                                                        have accepted your
                                                        request for providing
                                                        data. Make a payment to
                                                        view their attachments
                                                      </>
                                                    ) : (
                                                      <>
                                                        {notification.data.user
                                                          .firstname +
                                                          " " +
                                                          notification.data.user
                                                            .lastname}{" "}
                                                        have accepted your
                                                        quotation for vending
                                                        Technology.
                                                      </>
                                                    )}
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    {notification.data.user
                                                      .firstname +
                                                      " " +
                                                      notification.data.user
                                                        .lastname}{" "}
                                                    have accepted your request
                                                    for providing data. Make a
                                                    payment to view their
                                                    attachments
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.req.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                } else if (
                                  notification.verb == "dp attached doc"
                                ) {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-handshake"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <Link to="/dashboard/helpers">
                                                    <strong
                                                      style={{ color: "blue" }}
                                                    >
                                                      {notification.data.user
                                                        .firstname +
                                                        " " +
                                                        notification.data.user
                                                          .lastname}{" "}
                                                      have attached a
                                                      document.click to view
                                                      their attachments
                                                    </strong>
                                                  </Link>
                                                ) : (
                                                  <Link to="/dashboard/helpers">
                                                    <strong
                                                      style={{ color: "black" }}
                                                    >
                                                      {notification.data.user
                                                        .firstname +
                                                        " " +
                                                        notification.data.user
                                                          .lastname}{" "}
                                                      have attached a
                                                      document.click to view
                                                      their attachments
                                                    </strong>
                                                  </Link>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>

                                            <h6>
                                              Title:&nbsp;
                                              {notification.data.req.title}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                //TEch provider quote
                                else if (notification.verb == "quote") {
                                  return (
                                    <div>
                                      <div
                                        className="border-bottom"
                                        key={index}
                                        style={{ height: "130px" }}
                                      >
                                        <div className="d-flex">
                                          <div className="p-1">
                                            <i
                                              class="fa fa-bullhorn"
                                              style={{ fontsize: "36px" }}
                                            ></i>
                                          </div>
                                          <div className="pt-2 pl-2 flex-grow-1">
                                            <a href>
                                              <h5 className="mb-0">
                                                {notification.unread ? (
                                                  <strong
                                                    style={{ color: "blue" }}
                                                  >
                                                    Technology Vendor Quotation
                                                  </strong>
                                                ) : (
                                                  <strong
                                                    style={{ color: "black" }}
                                                  >
                                                    Technology Vendor Quotation
                                                  </strong>
                                                )}
                                              </h5>
                                            </a>
                                            <br></br>
                                            {/* <div className="float-right">
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                                data-toggle="modal"
                                                data-target={"#exampleModalCenter".concat(
                                                  index
                                                )}
                                                onClick={() => this.singleAccept(notification.data.req.reqID)}
                                              >
                                                View details
                                              </button>
                                              <div
                                                class="modal fade"
                                                id={"exampleModalCenter".concat(
                                                  index
                                                )}
                                                tabindex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-hidden="true"
                                              >
                                                <div
                                                  class="modal-dialog modal-dialog-centered"
                                                  role="document"
                                                >
                                                  <div class="modal-content">
                                                    <div class="modal-header">
                                                      <h5
                                                        class="modal-title"
                                                        id="exampleModalLongTitle"
                                                      >
                                                        Technology Vendor
                                                        Quotation
                                                      </h5>
                                                      <button
                                                        type="button"
                                                        class="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                      >
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>
                                                      </button>
                                                    </div>
                                                    <div class="modal-body">
                                                      <table
                                                        style={{
                                                          padding: "5%",
                                                          width: "100%",
                                                        }}
                                                      >
                                                        <tr>
                                                          <td>Title</td>
                                                          <td>
                                                            <input
                                                              required
                                                              type="text"
                                                              className="form-control"
                                                              id="10"
                                                              value={
                                                                notification
                                                                  .data.req
                                                                  .title
                                                              }
                                                              name="name"
                                                              disabled
                                                              maxLength="50"
                                                              style={{
                                                                width: "85%",
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <br />
                                                        <tr>
                                                          <td>Vendor</td>
                                                          <td>
                                                            <input
                                                              required
                                                              type="text"
                                                              className="form-control"
                                                              id="10"
                                                              value={
                                                                notification
                                                                  .data.user
                                                                  .firstname +
                                                                " " +
                                                                notification
                                                                  .data.user
                                                                  .lastname
                                                              }
                                                              name="name"
                                                              disabled
                                                              maxLength="50"
                                                              style={{
                                                                width: "85%",
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                        <br />
                                                        <tr>
                                                          <td>Budget</td>
                                                          <td>
                                                            <input
                                                              required
                                                              type="text"
                                                              className="form-control"
                                                              id="10"
                                                              value={
                                                                notification
                                                                  .data.dp.quote
                                                              }
                                                              name="name"
                                                              disabled
                                                              maxLength="50"
                                                              style={{
                                                                width: "85%",
                                                              }}
                                                            />
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </div>
                                                    <div class="modal-footer">
                                                      {this.state.accept && this.state.reqid == notification.data.dp.reqID? (
                                                        <>
                                                          <button
                                                    type="button"
                                                    onClick={() => {
                                                      this.expertPayProblem(
                                                        notification.id,
                                                        "data",
                                                        notification.data.dp
                                                          .quote
                                                      );
                                                    }}
                                                    class="btn btn-success"
                                                    id="a1"
                                                  >
                                                    Pay with wallet
                                                  </button>
                                                  &nbsp;&nbsp;
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      this.expertPay(
                                                        notification.id,
                                                        "data",
                                                        notification.data.dp
                                                          .quote
                                                      );
                                                    }}
                                                    class="btn btn-success"
                                                    id="a1"
                                                  >
                                                    Pay directly
                                                  </button>

                                                        </>
                                                      ) : (
                                                        <>
                                                        <button
                                                            type="button"
                                                            class="btn btn-secondary"
                                                            data-dismiss="modal"
                                                          >
                                                            Close
                                                          </button>

                                                          <button
                                                            type="button"
                                                            class="btn btn-success"
                                                            id={index + "a1"}
                                                            disabled = {this.state.acpt}
                                                            onClick={() => {
                                                              this.QuoteAccept(
                                                                notification
                                                                  .data.dp
                                                                  .reqID,
                                                                notification
                                                                  .data.dp.name
                                                              );
                                                            }}
                                                          >
                                                            Accept
                                                          </button>
                                                                                                                  </>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div> */}
                                            <h6>
                                              The Technology Vendor have
                                              accepted to provide you the
                                              technolgy for a quoted
                                              budget....
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }

                                // ends

                                // else{
                                //     return(
                                //         <div>
                                //             <h5>No notifications to show...</h5>
                                //         </div>
                                //     )
                                // }

                                //changes end
                              })()
                          )}
                        </div>

                        <div id="company" className="container tab-pane fade">
                          <br />
                          {/* <div className="border-bottom" style={{height: '100px'}}>
                                            <div className="d-flex">
                                                <div className="p-1">
                                                <img src="c3.jpg" className="img-thumbnail float-right" alt="Cinque Terre" width="70px" height="100px" />
                                                </div>
                                                <div className="pt-2 pl-2 flex-grow-1">
                                                <a href><h5 className="mb-0"><strong>Nasa</strong></h5></a>
                                                <p style={{fontSize: '14px'}} className="mb-0"><i className="fa fa-map-marker" style={{padding: '0px'}} />&nbsp;Washington, D.C., United States</p><div style={{fontSize: '14px', color: '#9ca3a8'}}>Followers : 1.4M</div><p />
                                                </div>
                                            </div>
                                            </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>

            {/* <div className="col-4 mt-xl-5">
                    <br></br>
                    <h5>Quote's of the week</h5><br></br>
                    <div className="card text-center" style={{width: '20rem'}}>
                        <div className="card-body">
                        <p className="card-text">"When a team outgrows individual performance and learns team confidence, excellence becomes a reality."</p>
                        <p className="card-text">-Joe Paterno</p>
                        </div>
                    </div><br></br>
                    <div className="card text-center" style={{width: '20rem'}}>
                        <div className="card-body">
                        
                        <p className="card-text">"A strong team can take any crazy vision and turn it into reality."</p>
                        <p className="card-text">-John Carmack</p>
                        </div>
                    </div><br></br>
                    <div className="card text-center" style={{width: '20rem'}}>
                        <div className="card-body">
                        
                        <p className="card-text">"he greater the loyalty of a group toward the group, the greater is the motivation among the members to achieve the goals of the group, and the greater the probability that the group will achieve its goals."</p>
                        <p className="card-text">-Rensis Likert</p>
                        </div>
                    </div><br></br>
                </div> */}
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default Notification;
