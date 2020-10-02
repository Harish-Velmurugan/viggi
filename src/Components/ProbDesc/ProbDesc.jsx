import React, { Component } from "react";
import "./ProbDesc.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Navbar from "../Navbar/nav";
import DatePicker from "react-date-picker";
import Axios from "axios";
class ProbDesc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problem: [],
      show: false,
      // {
      //   id : 1,
      //   pic : 'https://miro.medium.com/max/945/0*GxWiYNLblkesbW1B.jpg',
      //   name : 'Campus Analytic Challenge',
      //   body : 'Create the blueprint and Build the House:Provide Senior Leaders with a process flow with real code,demonstrating how the data are used,what algorithms are used,and the ultimate output.',
      // }
      deadline: null,
      result: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.extendDeadline = this.extendDeadline.bind(this);
  }

  extendDeadline = () => {
    if (this.state.deadline != null)
      Axios.post(
        "/dashboard/deadlineExtension/" +
          this.props.location.state.query.problemId +
          "/" +
          this.state.deadline +
          "/"
      ).then((res) => {
        console.log(res.data);
        this.setState({ result: "true" });
        this.setState({ show: !this.state.show });
      });
    else {
      window.alert("Choose a date");
    }
  };
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleModal() {
    console.log("---");
    this.setState({ show: !this.state.show });
  }
  async componentDidMount() {
    Axios.get(
      "/dashboard/topSolvercheck/" +
        this.props.location.state.query.problemId +
        "/"
    ).then((res) => {
      this.setState({ result: res.data.value });
      console.log(this.state.result);
    });
    window.addEventListener("load", this.handleLoad);

    await this.setState({
      problem: {
        id: this.props.location.state.query.problemId,
        pic: this.props.location.state.query.img,
        name: this.props.location.state.query.title,
        body: this.props.location.state.query.description,
        req: this.props.location.state.query.requested,
      },
    });
    console.log(this.props.location.state.query.problemId);
  }

  render() {
    console.log(this.state.result);
    const problem = this.state.problem;

    return (
      <div className="ProbDescc">
        <Navbar />
        <form>
          <Modal show={this.state.show}>
            <Modal.Header className="">
              <Modal.Title className="mx-auto" style={{ color: "black" }}>
                <strong>
                  <Link
                    to={{
                      pathname: "/topsolver",
                      state: { query: problem.id, req: problem.req },
                    }}
                  >
                    <div>&nbsp;&nbsp;Extend deadline</div>
                  </Link>
                </strong>
              </Modal.Title>
              <button
                type="button"
                class="close"
                aria-label="Close"
                onClick={() => {
                  this.extendDeadline();
                  // this.handleModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      Since your problem deadlineis completed and you have
                      received less than five solutions you can request top
                      solvers who are expert in your problem domain. Note:You
                      can request top solvers only once.
                      <br />
                      You have to set the deadline again for the top solvers to
                      involve and solve the problem.
                    </div>
                  </div>
                </div>

                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      {/* <input type="data"/> */}

                      <span>
                        Choose the deadline
                        <input
                          type="date"
                          required
                          className="form-control"
                          style={{ width: "50%" }}
                          id="deadline"
                          name="deadline"
                          onChange={this.handleChange}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div
                id="error"
                className="mx-auto"
                style={{ color: "red" }}
              ></div>
              <button
                className="btn btn-primary"
                id="send"
                type="submit"
                onClick={() => {
                  this.extendDeadline();
                  // this.handleModal();
                  console.log(this.state.deadline);
                }}
              >
                {" "}
                Extend deadline
              </button>
            </Modal.Footer>
            <div className="error"></div>{" "}
          </Modal>
        </form>
        <br />
        <br />
        <br />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <center>
          <div className="card">
            <div className=".profile-sidebar">
              <h2 className="profile-name">{problem.name}</h2>
              <img alt="ugv" src={problem.pic} height="250" width="200" />
            </div>
            <div className="profile-main">
              <p className="card-body">{problem.body}</p>
            </div>
          </div>
          {/* <div class="col-lg-7">
          <div
            class="card"
            style={{
              maxWidth: "700px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.5) , 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
          <div class="card-header">
              <h4>{problem.name}</h4>
            </div>
            <div class="card-body">
              <img
                src={problem.pic}
                style={{ float: "left" }}
                width="250px"
                alt="asd"
                height="200px"
              />
              <p>{problem.body}</p>
            </div>
          </div> 
          </div> */}
        </center>
        <br />
        <center>
          {(() => {
            if (this.state.result == "date") {
              return (
                <div>
                  <button className="button" onClick={() => this.handleModal()}>
                    <bold>Request Top Solvers</bold>
                  </button>
                </div>
              );
            }
            // else if (this.state.result == "false") {
            //   return (
            //     <div>
            //       <button className="btn btn-secondary" disabled="true">
            //         <bold>Request Top Solvers</bold>
            //       </button>
            //       <div>
            //         You have got more than five solutions for this problem.So
            //         you cannot request topsolvers. Choose a solution from that.
            //       </div>
            //     </div>
            //   );
            // }
            else if (this.state.result == "true") {
              return (
                <div>
                  <Link
                    to={{
                      pathname: "/topsolver",
                      state: { query: problem.id, req: problem.req },
                    }}
                  >
                    <button className="button">
                      <bold>Request Top Solvers</bold>
                    </button>
                  </Link>
                </div>
              );
            } else if (this.state.result == "topsolverFalse") {
              return (
                <div>
                  <div>
                    You have failed to choose the winner.So you cannot view
                    solution or choose winner for this solution anymore.
                  </div>
                </div>
              );
            } else if (this.state.result == "over") {
              return (
                <div>
                  <div>
                    You have failed to choose the winner when also few days were
                    given.The problem is completed and you cannto choose winner
                    or see the solutions herafter. You can post a new problem.
                  </div>
                </div>
              );
            }
          })()}

          {/* <Link
            to={{
              pathname: "/topsolver",
              state: { query: problem.id, req: problem.req },
            }}
          >
            <button className="button">
              <bold>Request Top Solvers</bold>
            </button>
          </Link> */}
        </center>
      </div>
    );
  }
}

export default ProbDesc;
