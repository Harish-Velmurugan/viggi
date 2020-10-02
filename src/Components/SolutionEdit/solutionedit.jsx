import React from "react";
import Navbar from "../Navbar/nav";
import "../ProblemInvolved/style.css";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { Modal } from "react-bootstrap";
import { EmailShareButton } from "react-share";
import axios from "axios";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import SolutionUpdate from "./solutionupdate";
import "./sol.css";
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

class solutionedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show1: false,
      skills: [],
      // reason:"",
      share: false,
      solution: [],
      days: "",
      reason: "",
      docs: "",
      problemDetails: "",
      skills1: "",
      designation: "",
      firm: "",
      username: localStorage.getItem("username"),
      problemId: Number(this.props.location.state.query),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  handleClose() {
    this.setState({ show: !this.state.show });
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  handleModal1() {
    this.setState({ show1: !this.state.show1 });
  }

  requestLor() {
    if (
      this.state.reason !== "" &&
      this.state.designation != "" &&
      this.state.firm != ""
    ) {
      let formdata = new FormData();
      formdata.append("problemId", this.state.problemId);
      formdata.append("username", this.state.username);
      formdata.append("reason", this.state.reason);
      formdata.append("designation", this.state.designation);
      formdata.append("firm", this.state.firm);
      formdata.append("status", "null");

      axios
        .post(
          "/lor/lorRequest/" +
            this.state.problemId +
            "/" +
            localStorage.getItem("username") +
            "/",
          formdata
        )
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.setState({ show1: !this.state.show1 });
            document.getElementById("beforeRequest").className =
              "btn btn-success float-right mr-4";
            document.getElementById("beforeRequest").innerHTML =
              "Requested LOR";
            document.getElementById("beforeRequest").disabled = "True";
          }
        });
    } else {
      document.getElementById("error").innerHTML = "Fill all the Details";
    }
  }

  onSubmit() {
    let formdata = new FormData();
    if (
      this.state.reason !== "" &&
      this.state.days !== "" &&
      this.state.docs !== ""
    ) {
      formdata.append("problemId", this.state.problemId);
      formdata.append("username", this.state.username);
      formdata.append("reason", this.state.reason);
      formdata.append("days", this.state.days);
      formdata.append("docs", this.state.docs);

      axios.post("/dashboard/extendDaysView/", formdata).then((res) => {
        if (res.status == 200) {
          document.getElementById("send").disabled = true;
          this.setState({
            reason: "",
            days: "",
            docs: "",
          });
        }
      });
      document.getElementById("error").innerHTML = "";
    } else {
      document.getElementById("error").innerHTML = "Fill all the Details";
    }
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
    // if(document.getElementById(''))
    document.getElementById("error").innerHTML = "";
  }
  onChangeFile = (e) => {
    let file = e.target.files[0];
    this.setState({ docs: file });
    document.getElementById("file").innerHTML = file.name;
    document.getElementById("error").innerHTML = "";
  };

  componentDidMount() {
    const pid = this.props.location.state.query;
    axios.get(`/dashboard/problemDescription/${pid}/`).then((res) => {
      this.setState({ problemDetails: res.data[0] });
      this.setState({ skills: this.state.problemDetails.skill.split(",") });
    });

    axios
      .get(
        "/dashboard/mySolutionEdit/" +
          localStorage.getItem("username") +
          "/" +
          pid +
          "/"
      )
      .then((res) => {
        this.setState({ solution1: res.data });
        // this.setState({problemId:pid})

        // });

        // console.log(this.state.problemDetails.skill);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].username == localStorage.getItem("username")) {
            this.setState(this.state.solution.concat([res.data[i]]));
            // this.setState({problemId:pid})
          }
        }
      });
    axios.get("/contract/share/" + pid + "/").then((res) => {
      if (res.data[0].length == 0) {
        this.setState({ share: true });
      }
    });
  }

  render() {
    var a = this.state.skills;
    // var a = this.state.skills.filter(x => x).join(',');
    // console.log(result);
    return (
      <div>
        <Navbar />
        {console.log(this.state.skills)}
        <div className="main_content">
          <h3 className="ml-4">
            MySolutions
            {this.state.problemDetails.solved ? (
              <button
                disabled="True"
                className="btn btn-secondary float-right mr-4"
              >
                Extend Deadline
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary float-right mr-4"
                onClick={() => this.handleModal()}
              >
                Extend Deadline
              </button>
            )}
            {this.state.problemDetails.solved ? (
              this.state.problemDetails.lor.includes(
                localStorage.getItem("username")
              ) ? (
                <button
                  disabled="True"
                  className="btn btn-success float-right mr-4"
                >
                  Requested LOR
                </button>
              ) : (
                <button
                  type="submit"
                  id="beforeRequest"
                  className="btn btn-primary float-right mr-4"
                  onClick={() => this.handleModal1()}
                >
                  Request LOR
                </button>
              )
            ) : (
              ""
            )}
          </h3>
          <br></br> <br />
          <br />
          {this.state.solution[0] != undefined && (
            <div>
              <div
                // className="inner0"
                style={{
                  width: "50px",
                  //   backgroundColor: "#323754",
                  //   color: "white",
                  //   minWidth: "0px",

                  float: "right",
                }}
              >
                {/* <h5>Share with</h5>
                  <hr style={{ backgroundColor: "white" }} /> */}
                {this.state.share && (
                  <div>
                    <FacebookShareButton
                      url="http://vignatree.herokuapp.com/"
                      quote={
                        this.state.solution[0].title +
                        "\n" +
                        this.state.solution[0].desc
                      }
                      hashtag="#RnDsolution"
                    >
                      <FacebookIcon
                        logoFillColor="white"
                        size={42}
                        style={{ outline: "none" }}
                      />
                    </FacebookShareButton>

                    <LinkedinShareButton
                      url="http://vignatree.herokuapp.com/"
                      title={this.state.solution[0].title}
                      summary={this.state.solution[0].desc}
                    >
                      <LinkedinIcon size={42} />
                    </LinkedinShareButton>

                    <RedditShareButton
                      url="http://vignatree.herokuapp.com/"
                      title={this.state.solution[0].desc}
                    >
                      <RedditIcon size={42} />
                    </RedditShareButton>
                  </div>
                )}
              </div>

              {this.state.solution.map((solution, index) => (
                <SolutionUpdate
                  solution={solution}
                  problemDetails={this.state.problemDetails}
                  index={index}
                />
              ))}
            </div>
          )}
          <br></br>
          <Modal show={this.state.show1}>
            <Modal.Header className="">
              <Modal.Title className="mx-auto" style={{ color: "black" }}>
                <strong>
                  <div>&nbsp;&nbsp;Request for LOR</div>
                </strong>
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
              <div className="form-group">
                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <strong>SKILLS</strong>
                    </div>
                    <div class="card-body">
                      {a.map((a, index) => (
                        <span>
                          {a != "" ? (
                            <p id="rcorners2" class="mr-3">
                              {a}
                            </p>
                          ) : (
                            ""
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <strong>Reason for Requesting LOR</strong>
                    </div>

                    <textarea
                      class="card-body"
                      style={{ border: "none" }}
                      type="text"
                      placeholder="Describe the reason for requesting LOR here..."
                      rows={5}
                      id="reason"
                      required
                      name="reason"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <strong>Designation</strong>
                    </div>

                    <input
                      class="card-body"
                      style={{ border: "none" }}
                      type="text"
                      placeholder="For the post of..."
                      rows={5}
                      id="designation"
                      required
                      name="designation"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <strong>Firm</strong>
                    </div>

                    <input
                      class="card-body"
                      style={{ border: "none" }}
                      type="text"
                      //  className="form-control"
                      placeholder="Firm referring to..."
                      rows={5}
                      id="firm"
                      required
                      name="firm"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <br />
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
                onClick={() => {
                  this.requestLor();
                }}
              >
                {" "}
                Send Request
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.show}>
            <Modal.Header className="">
              <Modal.Title className="mx-auto">Days to be Extended</Modal.Title>
              <button
                type="button"
                class="close"
                aria-label="Close"
                onClick={() => {
                  this.handleClose();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <div>
                  {" "}
                  No. Of Days
                  <input
                    type="number"
                    className="form-control"
                    id="days"
                    required
                    name="days"
                    onChange={this.handleChange}
                  />
                </div>
                <br></br>
                <div>
                  {" "}
                  Reason
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Describe your reason here..."
                    rows={5}
                    id="reason"
                    required
                    name="reason"
                    onChange={this.handleChange}
                  />
                  <br />
                </div>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  onChange={this.onChangeFile}
                />
                <label class="custom-file-label" id="file">
                  Select File
                </label>
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
                onClick={() => {
                  this.onSubmit();
                }}
              >
                {" "}
                Send Request
              </button>
            </Modal.Footer>
          </Modal>
          {/* <a href="https://www.facebook.com/sharer/sharer.php?u=http://vignatree.herokuapp.com/#Opportunities/">
              Share on Facebook
            </a>

            <a href="https://www.linkedin.com/shareArticle?mini=true&url=http://swiftforentrepreneurs.com/&title=Be%20first%20%7C%20Join%20Swift%20for%20Entrepreneurs&summary=Swift%20for%20Entrepreneurs%20is%20a%20project-based%20programming%20course%20for%20non-technical%20founders.%20We'll%20learn%20how%20to%20build%20iOS%20apps%20from%20scratch%20using%20Apple's%20new%20programming%20language:%20Swift.%20Be%20first%20and%20learn%20with%20me!&source=http://swiftforentrepreneurs.com/">
              Share on Linkedin
            </a>

            <a href="https://twitter.com/home?status=I'm%20going%20to%20learn%20to%20Code...%20Come%20build%20an%20web%20apsp%20with%20me!%20%23CFE%20and%20@justinmitchel%20http://codingforentrepreneurs.com/">
              Share on Twitter
            </a> */}
        </div>
      </div>
    );
  }
}
export default solutionedit;
