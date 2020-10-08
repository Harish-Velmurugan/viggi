import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import StarRatings from "react-star-ratings";

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

class SSSlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      contractNumber: 0,
      Redirect: false,
      expert: true,
      labels: {
        0.5: "Useless",
        1: "Useless+",
        1.5: "Poor",
        2: "Poor+",
        2.5: "Ok",
        3: "Ok+",
        3.5: "Good",
        4: "Good+",
        4.5: "Excellent",
        5: "Excellent+",
      },
      value: 2,
      hover: -1,
      comments: "",
      currentSolUser: "",
      date: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }
  componentDidMount() {
    axios
      .get("dashboard/problemDeadline/" + this.props.problemId + "/")
      .then((res) => {
        console.log(res.data);
        this.setState({ date: res.data.value });
      });
  }

  submitReview(selected) {
    axios
      .get(
        "http://localhost:8000/sol/submitReview/" +
          selected.solutionId +
          "/" +
          localStorage.getItem("username") +
          "/" +
          this.state.value +
          "/" +
          this.state.comments +
          "/"
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  }

  handleChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log(value, name);
    this.setState({
      [name]: value,
    });
  }

  handleModal(e) {
    this.setState({ show: !this.state.show });
    axios
      .get("/prototypetest/solverName/" + this.props.user.solutionId + "/")
      .then((res) => {
        this.setState({
          currentSolUser: res.data.value,
        });
      });
  }

  async submitsoln1(selected) {
    console.log(this.state.currentSolUser);
    let formdata = new FormData();
    formdata.append("solutionId", this.props.user.solutionId);
    formdata.append("pBuilder", Number(this.props.user.username));
    formdata.append("pImplementer", Number(localStorage.getItem("username")));
    formdata.append(
      "members",
      this.props.user.username + "," + localStorage.getItem("username") + ","
    );

    axios.post("/prototypetest/createPrototype/", formdata).then((res) => {});

    console.log(selected);
    let cn = 0;
    await axios
      .post("/contract/create-contract/" + this.props.problemId + "/")
      .then((response) => {
        if (response.status == 200) {
          this.setState({ contractNumber: response.data.contractNumber });
          cn = response.data.contractNumber;

          let data = new FormData();

          data.append("username", selected.username);
          data.append("contract", cn);
          data.append("solution", selected.solutionId);
          data.append("revenue", 100);

          let name = selected.username;
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
                    "/contract/seekerCollaboration/" + cn + "/" + name + "/"
                  )
                  .then((response) => {
                    this.setState({ Redirect: true });
                  });
                this.setState({ Redirect: true });
              }
            });
        }
      });
  }

  async submitsoln(selected) {
    // if (this.state.selectedsoln.length == 0) {
    //   alert("Please select atleast one solution.");
    //   //<Redirect to ="/viewsolution"/>
    // }
    console.log(selected);
    let cn = 0;
    await axios
      .post("/contract/create-contract/" + this.props.problemId + "/")
      .then((response) => {
        if (response.status == 200) {
          this.setState({ contractNumber: response.data.contractNumber });
          cn = response.data.contractNumber;

          let data = new FormData();

          data.append("username", selected.username);
          data.append("contract", cn);
          data.append("solution", selected.solutionId);
          data.append("revenue", 100);

          let name = selected.username;
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
                    "/contract/seekerCollaboration/" + cn + "/" + name + "/"
                  )
                  .then((response) => {
                    this.setState({ Redirect: true });
                  });
                this.setState({ Redirect: true });
              }
            });
        }
      });
  }

  render() {
    // const [value, setValue] = React.useState(2);
    // const [hover, setHover] = React.useState(-1);
    //const classes = useStyles();

    if (this.state.Redirect == true) {
      console.log(this.props.alldata);
      console.log(this.props.user);
      // conosle.log(this.props.alldata)
      // conosle.log(this.props.alldata)
      return (
        <Redirect
          to={{
            pathname: "/contract",
            state: {
              absParam: this.props.user,
              allData: this.props.alldata,
              problemId: this.props.problemId,
              check: true,
              selected: this.props.selected,
              contractNumber: this.state.contractNumber,
            },
          }}
        />
      );
    }
    return (
      <div class="container-fluid">
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
                This solution is given by {this.state.currentSolUser}.If you are
                going to implement this solution do you hire this person as
                pilot builder for your implementation?
              </div>
              <br></br>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary float-right"
              id="send"
              onClick={() => this.submitsoln(this.props.user)}
            >
              {" "}
              No and Accept
            </button>

            <button
              className="btn btn-primary"
              id="send"
              onClick={() => this.submitsoln1(this.props.user)}
            >
              {" "}
              Yes and Accept
            </button>
          </Modal.Footer>
        </Modal>

        <br />
        <br />
        <div class="row" style={{ position: "relative", top: "3rem" }}>
          <div
            class="col-lg-1"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <button
              type="button"
              onClick={this.props.prev}
              class="btn btn-dark"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.5) , 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              Prev
            </button>
          </div>
          <div class="col-lg-7">
            <div
              class="card bg-light mb-3"
              style={{
                maxWidth: "50rem",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.5) , 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <div class="card-header">
                <h4>{this.props.user.title}</h4>
              </div>
              <div class="card-body">
                <img
                  src={this.props.user.image}
                  style={{ float: "right" }}
                  width="200px"
                  alt="asd"
                  height="200px"
                />
                <h5 class="card-title">
                  Abstract :<br />
                </h5>
                <p>{this.props.user.abstract}</p>
                <br />
                <h5 class="card-text">
                  Description :<br />
                </h5>
                <p>{this.props.user.desc}</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div
              class="card text-white bg-dark mb-3"
              style={{
                maxWidth: "18rem",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.5) , 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <div class="card-header">{this.props.user.username}</div>
              <div class="card-body">
                <p class="card-text">
                  Level : {this.props.user.level} &emsp;&emsp; Votes :{" "}
                  {this.props.user.votes}
                </p>

                {this.props.seeker && this.props.user.expert.length > 0 ? (
                  <div>
                    <p class="card-text">Rating : {this.props.user.rating}</p>

                    {this.props.user.expertDetails.map((expert, i) => (
                      <div>
                        <table>
                          <tr>
                            <td>
                              <img
                                className="profilepic"
                                src={expert.img}
                                alt="user img"
                                style={{
                                  borderRadius: "50%",
                                  width: "40px",
                                  height: "40px",
                                }}
                              ></img>{" "}
                              &nbsp;
                            </td>
                            <td>
                              {expert.firstname + " " + expert.lastname}
                              <br />
                              <StarRatings
                                rating={this.props.user.score[i] / 2}
                                starRatedColor="orange"
                                name="rating"
                                starDimension="15px"
                                starSpacing="1px"
                              />
                            </td>
                          </tr>
                        </table>
                        <p style={{ fontSize: "14px" }}>
                          {this.props.user.comments[i]}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}

                <div style={{ textAlign: "center" }}>
                  {console.log(this.props.seeker)}
                  {!this.props.seeker ? (
                    <div>
                      <div>
                        {console.log(this.state.value)}
                        <Rating
                          name="hover-feedback"
                          value={this.state.value / 2}
                          precision={0.5}
                          size="large"
                          onChange={(event, newValue) => {
                            this.setState({ value: newValue * 2 });
                          }}
                          onChangeActive={(event, newHover) => {
                            this.setState({ hover: newHover });
                          }}
                        />
                        {this.state.value !== null && (
                          <Box ml={2}>
                            {
                              this.state.labels[
                                this.state.hover !== -1
                                  ? this.state.hover
                                  : this.state.value
                              ]
                            }
                          </Box>
                        )}
                      </div>
                      <br />

                      <textarea
                        className="form-control"
                        required
                        placeholder="Add a comment..."
                        rows={3}
                        id="comments"
                        name="comments"
                        style={{ background: "#dbdbdb" }}
                        onChange={this.handleChange}
                        value={this.state.comments}
                      />
                      <br></br>
                      <Link
                        type="button"
                        class="btn btn-primary"
                        onClick={() => this.submitReview(this.props.user)}
                      >
                        SUBMIT
                      </Link>
                    </div>
                  ) : this.props.user.agreed ? (
                    <div>
                      {/* <Link to="/viewsolution">
                      <button
                        type="button"
                        class="btn btn-danger"
                        value="ACCEPT"
                        onClick={this.props.accept}
                      >
                        {this.props.but}
                      </button>
                    </Link>
                    <br /> */}

                      <br />
                      {this.state.date == "true" ? (
                        <div>
                          <Link
                            to={{
                              pathname: "/collaborate",
                              state: {
                                absParam: this.props.user,
                                allData: this.props.alldata,
                                problemId: this.props.problemId,
                              },
                            }}
                          >
                            <button type="button" class="btn btn-warning">
                              COLLABORATE
                            </button>
                          </Link>
                          <br />
                          <br />

                          <Link
                            onClick={() => this.handleModal()}
                            // onClick={() => this.submitsoln(this.props.user)}
                          >
                            {console.log(this.props.user.solutionId)}
                            <button type="button" class="btn btn-success">
                              ACCEPT
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <Link
                            to={{
                              pathname: "/collaborate",
                              state: {
                                absParam: this.props.user,
                                allData: this.props.alldata,
                                problemId: this.props.problemId,
                              },
                            }}
                          >
                            <button
                              type="button"
                              class="btn btn-warning"
                              disabled="true"
                            >
                              COLLABORATE
                            </button>
                          </Link>
                          <br />
                          <br />
                          <button
                            onClick={() => this.handleModal()}
                            // onClick={() => this.submitsoln(this.props.user)}
                            type="button"
                            disabled="true"
                            class="btn btn-success"
                          >
                            {console.log(this.props.user.solutionId)}
                            ACCEPT
                          </button>
                          <br /> Wait until the deadline to cross to choose the
                          solution
                        </div>
                      )}
                    </div>
                  ) : this.state.date == "true" ? (
                    <div>
                      {/* <button
                       type="button"
                       class="btn"
                       style={{ backgroundColor: "#aba9a9", color: "#ffffff" }}
                     >
                       ACCEPT
                     </button>
                     <br /> */}
                      <br />

                      <button
                        type="button"
                        class="btn"
                        style={{ backgroundColor: "#aba9a9", color: "#ffffff" }}
                      >
                        COLLABORATE
                      </button>
                      <br />
                      <h6 style={{ color: "red" }}>
                        This solution contract is not completed
                      </h6>

                      <Link
                        // onClick={() => this.submitsoln(this.props.user)}
                        onClick={() => this.handleModal()}
                        type="button"
                        class="btn btn-success"
                      >
                        {console.log(this.props.user)}
                        ACCEPT
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {/* <button
                     type="button"
                     class="btn"
                     style={{ backgroundColor: "#aba9a9", color: "#ffffff" }}
                   >
                     ACCEPT
                   </button>
                   <br /> */}
                      <br />
                      <button
                        type="button"
                        class="btn"
                        style={{ backgroundColor: "#aba9a9", color: "#ffffff" }}
                      >
                        COLLABORATE
                      </button>
                      <br />
                      <h6 style={{ color: "red" }}>
                        This solution contract is not completed
                      </h6>
                      <button
                        // onClick={() => this.submitsoln(this.props.user)}
                        onClick={() => this.handleModal()}
                        type="button"
                        class="btn btn-success"
                        disabled="true"
                      >
                        {console.log(this.props.user)}
                        ACCEPT
                      </button>
                      <br /> Wait until the deadline to cross to choose the
                      solution
                    </div>
                  )}

                  <br />
                  <br />
                </div>
              </div>
            </div>

            <div
              class="border p-2"
              style={{
                maxWidth: "18rem",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.5) , 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <h5>Download Attachments</h5>
              <br />
              <div style={{ textAlign: "center" }}>
                <a
                  href={this.props.user.docs}
                  type="button"
                  className="btn btn-info mb-2"
                >
                  Download Documents
                </a>
                <a
                  href={this.props.user.image}
                  type="button"
                  className="btn btn-info mb-2"
                >
                  Download Image
                </a>
                <a
                  href={this.props.user.video}
                  type="button"
                  className="btn btn-info mb-2"
                >
                  Download Videos
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-1">
            <button
              type="button"
              onClick={this.props.next}
              class="btn btn-dark"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.5) , 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SSSlay;
