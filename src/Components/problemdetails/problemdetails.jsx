import { Modal } from "react-bootstrap";
import React from "react";
import Navbar from "../Navbar/nav";
import axios from "axios";
import "./badge.css";
import Comments from "../comments/comments";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

// import 'mdbreact/dist/css/mdb-free.css';
// import "./assets/scss/mdb-free.scss"

class ProblemDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemdetails: [],
      collab: 0,
      sid: "",
      days: "",
      show: false,
      show1: false,
      solutions: [],
      skills: [],
      problemstatus: "",
      deadline: "",
      posteddate: "",
      problemId: this.props.location.state.pid,
    };

    this.fetchTasks = this.fetchTasks.bind(this);
    this.addInterest = this.addInterest.bind(this);
    this.setProblemStatus = this.setProblemStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.collaborate = this.collaborate.bind(this);
  }
  onSubmit1() {
    axios
      .post(
        "/dashboard/requestCollabView/" +
          this.state.collab +
          "/" +
          localStorage.getItem("username") +
          "/"
      )
      .then((res) => {
        if (res.status == 200) {
          document.getElementById(this.state.collab).className =
            "btn btn-secondary fas fa-hands-helping";
          document.getElementById(this.state.collab).innerHTML = "Request Sent";
          this.setState({ show1: !this.state.show1 });
        }
      });
  }
  collaborate(f, bid) {
    if (bid == 0) {
      //let target = f.target;
      document.getElementById(f).className =
        "btn btn-secondary fas fa-hands-helping";
      document.getElementById(f).innerHTML = "Request Sent";

      axios
        .post(
          "/dashboard/requestCollabView/" +
            f +
            "/" +
            localStorage.getItem("username") +
            "/"
        )
        .then((res) => {});
    } else {
      this.setState({ show1: !this.state.show1 });
      this.setState({ collab: f });
    }
  }

  componentWillMount() {
    const problemId = this.props.location.state.pid;
    console.log(localStorage.getItem("username"));
    this.fetchTasks();
    this.setProblemStatus(problemId);
  }

  async fetchTasks() {
    const problemId = this.props.location.state.pid;
    await axios
      .get(`/dashboard/problemDescription/${problemId}/`)
      .then((response) => {
        this.setState({
          problemdetails: response.data[0],
        });
      });
    await axios
      .get(
        `/dashboard/ppo-view/${problemId}/${localStorage.getItem("username")}/`
      )
      .then((response) => {
        this.setState({
          solutions: response.data,
        });
      });

    this.setState({
      skills: this.state.problemdetails.skill.split(","),
      deadline: this.state.problemdetails.deadline.split("", 10),
      posteddate: this.state.problemdetails.posteddate.split("", 10),
    });
  }

  onSubmit(e) {
    if (this.state.days != "" && this.state.days != "0") {
      axios
        .post(
          "/sol/vote/" +
            this.state.sid +
            "/" +
            localStorage.getItem("username") +
            "/" +
            this.state.days +
            "/"
        )
        .then((res) => {
          if (res.status == 200 && res.data.values == "success") {
            document.getElementById(this.state.sid + "bidchange").className =
              "btn btn-secondary fas fa-coins";
            document.getElementById(e + "bet").disabled = "true";
            document.getElementById(this.state.sid + "bidchange").disabled =
              "true";

            this.setState({ days: "" });
          }
          document.getElementById(e + "err").innerHTML = res.data.values;
        });
    } else {
      console.log("error");
      document.getElementById(e + "err").innerHTML = "Fill all the Details";
    }
  }

  handleModal(e) {
    this.setState({ show: !this.state.show });
    this.setState({ sid: e });
  }

  handleModal1(e) {
    this.setState({ show1: !this.state.show1 });
    // this.setState({sid:e})
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
    // document.getElementById(e+'err').innerHTML=''
  }

  async addInterest(id) {
    var url = `/post/bookmarks/${localStorage.getItem("username")}/${id}/`;
    await axios.post(url);
    this.setState({ problemstatus: "True" });
  }

  async setProblemStatus(id) {
    var url = `/post/bookmarkCheck/${localStorage.getItem("username")}/${id}/`;
    var response = await axios.get(url);

    this.setState({ problemstatus: response.data.values });
  }

  render() {
    var problem = this.state.problemdetails;
    var skills = this.state.skills;
    var solutions = this.state.solutions;
    var self = this;

    return (
      <div className="container-fluid">
        <Navbar />

        <div
          className=""
          style={{ width: "75%", marginLeft: "10%", paddingTop: "5%" }}
        >
          <div className="description pt-5 d-flex row justify-content-start pb-3">
            <div className="problemimg p-3 col-sm-12 col-md-3">
              <img
                src={problem.img}
                className="img-thumbnail"
                alt="Responsive"
                width="100%"
              />
            </div>
            <div
              className="details p-3  col-sm-12 col-md-7"
              style={{ width: "100%" }}
            >
              <div className="title">
                <p style={{ fontSize: "20px", fontWeight: 650 }}>
                  {problem.title}
                </p>
              </div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td className="p-1">
                      <div className="reward">
                        <h6 style={{ display: "inline" }}>REWARDS :</h6>
                        <span className="pl-3">{problem.RnD_Budget}</span>
                      </div>
                    </td>
                    <td className="p-1">
                      <div className="deadline">
                        <h6 style={{ display: "inline" }}>DEADLINE :</h6>
                        <span className="pl-3">{this.state.deadline}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1">
                      <div className="activesolvers">
                        <h6 style={{ display: "inline" }}>ACTIVE SOLVERS :</h6>
                        <span className="pl-3">{problem.sol_count}</span>
                      </div>
                    </td>
                    <td className="p-1">
                      <div className="posteddate">
                        <h6 style={{ display: "inline" }}>POSTED DATE :</h6>
                        <span className="pl-3">{this.state.posteddate}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {problem.username == localStorage.getItem("username") ? (
              <button
                className="btn btn-warning align-self-center  col-sm-12 col-md-2"
                style={{ width: "20%" }}
                disabled="True"
              >
                Your Problem
              </button>
            ) : this.state.problemstatus == "False" ? (
              <button
                className="btn btn-primary align-self-center  col-sm-12 col-md-2"
                onClick={() => self.addInterest(problem.problemId)}
              >
                Interested
              </button>
            ) : (
              <button
                className="btn btn-primary align-self-center col-sm-12 col-md-2"
                disabled="True"
              >
                Bookmarked
              </button>
            )}
          </div>
          <div
            className="border border-info p-4 rounded"
            style={{ backgroundColor: "white" }}
          >
            <ul
              className="nav nav-tabs ml-3 pl-2"
              style={{ textAlign: "center" }}
            >
              <li className="nav-item" style={{ width: "50%" }}>
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#problemdescription"
                >
                  Details
                </a>
              </li>
              <li className="nav-item" style={{ width: "50%" }}>
                <a className="nav-link" data-toggle="tab" href="#document">
                  Solutions
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane container active"
                id="problemdescription"
              >
                <div className="skills" style={{ width: "65%" }}>
                  <br />
                  <h5 style={{ fontWeight: "600" }}>Skills required</h5>
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontSize: "13px" }}
                  >
                    <div />
                    <span className="border rounded-circle p-2">
                      {skills[0]}
                    </span>
                    <span className="border rounded-circle p-2">
                      {skills[1]}
                    </span>
                    <span className="border rounded-circle p-2">
                      {skills[2]}
                    </span>
                    <span className="border rounded-circle p-2">
                      {skills[3]}{" "}
                    </span>
                  </div>
                </div>
                <br />
                <h4 style={{ fontWeight: "600" }}>Description</h4>
                <p style={{ fontWeight: 500 }}>{problem.description}</p>
                <a href={problem.files} type="button" className="btn btn-info">
                  Download Docs Attached
                </a>
              </div>
              <div className="tab-pane container fade" id="document">
                <div className="mt-5 row row-cols-1 row-cols-md-2">
                  {solutions.map((solution, index) => (
                    <div className="col-sm-12 col-md-6 mb-4" key={index}>
                      <Modal show={this.state.show1}>
                        <Modal.Header className="float">
                          <Modal.Title className="mx-auto">
                            Confirm Collaboration
                          </Modal.Title>
                          <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            onClick={() => {
                              this.handleModal1();
                            }}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </Modal.Header>

                        <Modal.Body>
                          <div style={{ color: "blue" }} className="mx-auto">
                            <center>
                              {" "}
                              <h5 className="mx-auto">
                                You have already bet this solution,if your
                                request is accepted bidded rp will be returned.
                              </h5>
                              <h5>Do u want to colloborate? </h5>
                            </center>
                          </div>
                          <div className="form-group">
                            <div></div>
                            <br></br>
                          </div>
                        </Modal.Body>

                        <Modal.Footer>
                          <div className="mx-auto"> </div>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              this.onSubmit1(solution.solutionId);
                            }}
                          >
                            {" "}
                            &nbsp;&nbsp;Yes&nbsp;&nbsp;
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.handleModal1();
                            }}
                          >
                            {" "}
                            &nbsp;&nbsp;NO&nbsp;&nbsp;
                          </button>
                        </Modal.Footer>
                      </Modal>

                      <Modal show={this.state.show}>
                        <Modal.Header className="flo">
                          <Modal.Title className="mx-auto">
                            Bet this Solution{" "}
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
                          <div style={{ color: "blue" }}>
                            <h6>
                              NOTE:
                              <p>
                                {" "}
                                1)If this solution wins,you will be rewarded
                                with extra rp and
                              </p>
                            </h6>
                            <p>
                              {" "}
                              2) If this solution lose,a certain amount of
                              betted rp will be retained.
                            </p>
                            <p>
                              3)If you colloborate on this solution and if your
                              request is accepted,bidded rp will will returned.
                            </p>
                          </div>
                          <div className="form-group">
                            <div>
                              <input
                                type="number"
                                placeholder="Enter RP to bet this solution"
                                className="form-control"
                                id="days"
                                required
                                name="days"
                                onChange={this.handleChange}
                              />
                            </div>
                            <br></br>
                          </div>
                        </Modal.Body>

                        <Modal.Footer>
                          <div
                            id={solution.solutionId + "err"}
                            className="mx-auto"
                          ></div>
                          <button
                            className="btn btn-primary"
                            id={solution.solutionId + "bet"}
                            onClick={() => {
                              this.onSubmit(solution.solutionId);
                            }}
                          >
                            {" "}
                            &nbsp;&nbsp;Bet&nbsp;&nbsp;
                          </button>
                        </Modal.Footer>
                      </Modal>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <img
                              className="col-3"
                              alt="asd"
                              src={solution.image}
                              width="100%"
                            />
                            <div className="col-9">
                              <p
                                className="pl-2"
                                style={{ fontSize: "16px", fontWeight: 600 }}
                              >
                                {solution.title}
                              </p>
                              <p className="pl-2">{solution.abstract}</p>
                            </div>
                          </div>
                          <div className="float-right" paddingTop="10rem">
                            {(() => {
                              if (
                                localStorage.getItem("username") ==
                                problem.username
                              ) {
                                return <div> </div>;
                              } else if (
                                localStorage.getItem("username") !=
                                solution.username
                              ) {
                                return (
                                  <div>
                                    {solution.collaboration &&
                                    solution.agreed ? (
                                      solution.waiting_list.includes(
                                        localStorage.getItem("username")
                                      ) ? (
                                        <button
                                          className="btn btn-secondary fas fa-hands-helping "
                                          id="collaborate2"
                                          aria-hidden="true"
                                        >
                                          Request Sent
                                        </button>
                                      ) : solution.members.includes(
                                          localStorage.getItem("username")
                                        ) ? (
                                        <button
                                          className="btn btn-success fas fa-hands-helping"
                                          id="collaborate"
                                          aria-hidden="true"
                                        >
                                          Colloborated
                                        </button>
                                      ) : (
                                        <button
                                          className="btn btn-info fas fa-hands-helping"
                                          value={solution.solutionId}
                                          id={solution.solutionId}
                                          onClick={() => {
                                            this.collaborate(
                                              solution.solutionId,
                                              solution.bidamount
                                            );
                                          }}
                                          aria-hidden="true"
                                        >
                                          Colloborate
                                        </button>
                                      )
                                    ) : (
                                      ""
                                    )}

                                    {!solution.members.includes(
                                      localStorage.getItem("username")
                                    ) ? (
                                      solution.bid == "false" ? (
                                        <button
                                          className="btn btn-info fas fa-coins ml-2"
                                          id={solution.solutionId + "bidchange"}
                                          aria-hidden="true"
                                          onClick={() => {
                                            this.handleModal(
                                              solution.solutionId
                                            );
                                          }}
                                        >
                                          &nbsp;Bet&nbsp;
                                        </button>
                                      ) : (
                                        <button
                                          className="btn btn-secondary fas fa-coins ml-2 btn-sm"
                                          aria-hidden="true"
                                        >
                                          &nbsp;Bet&nbsp;
                                        </button>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                );
                              } else
                                return (
                                  <div>
                                    <br></br>
                                  </div>
                                );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Comments problemId={this.state.problemId} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemDescription;
