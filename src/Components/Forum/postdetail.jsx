import { Modal, Form } from "react-bootstrap";
import Card1 from "react-bootstrap/Card";
import React from "react";
import Navbar from "../Navbar/nav";
import "./forums.css";
import { Card, Button, Header, Image, Icon } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";

import Axios from "axios";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      setShow: false,
      ansChoice: [],
      treeData: [],
      treeCommon: [],
      username: "",
      id: "",
      check: false,
      postdetails: [],
      collab: 0,
      postId: this.props.location.state.pid,
      show: false,
      answers: [],
      profiles: [],

      buckets: "",
      keyword: "",
      msg: "",
      citation_abt: "",
      citation: "",
      redirect: false,
      expert: this.props.location.state.expert,

      options: [
        { name: "Agriculture", id: 1 },
        { name: "Arts & Sports", id: 2 },
        { name: "Automobiles", id: 3 },
        { name: "Climate", id: 4 },
        { name: "E-Commerce", id: 5 },
        { name: "Education & Training", id: 6 },
        { name: "Fashion", id: 7 },
        { name: "FMCG", id: 8 },
        { name: "Finance", id: 9 },
        { name: "Healthcare", id: 10 },
        { name: "Gems & Jewelery", id: 11 },
        { name: "Infrastructure", id: 12 },
        { name: "Law", id: 13 },
        { name: "Media & Entertainment", id: 14 },
        { name: "Pharmaceuticals", id: 15 },
        { name: "Power & Energy", id: 16 },
        { name: "Railways", id: 17 },
        { name: "Science & Tech", id: 18 },
        { name: "Security", id: 19 },
        { name: "Textile", id: 20 },
        { name: "Trade", id: 21 },
        { name: "Travel & Tourism", id: 22 },
      ],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });

  async handleSubmit() {
    this.setState({ setShow: false });

    Axios.post("/sol/createTree/" + this.state.ansChoice + "/").then((res) => {
      if (res.status == 200) {
        this.setState({
          redirect: true,
        });
      }
    });
  }

  handleSelect(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    if (target.checked) {
      this.setState(
        (this.state.ansChoice = this.state.ansChoice.concat(value))
      );
    } else if (!target.checked) {
      const filteredItems = this.state.ansChoice.filter(
        (temp) => temp != value
      );
      this.setState({ ansChoice: filteredItems });
    }
  }

  async componentDidMount() {
    await Axios.get(`/forum/getaPost/${this.state.postId}/`).then(
      (response) => {
        this.setState({
          postdetails: response.data,
        });

        Axios.get(`/forum/getAnswer/${this.state.postId}/`).then((response) => {
          this.setState({
            answers: response.data[0],
            profiles: response.data[1],
          });
        });
      }
    );

    await Axios.get("/sol/getTree/" + this.state.postdetails.postId + "/").then(
      (res) => {
        if (res.data.length > 0) {
          this.setState({
            treeData: JSON.parse(res.data[0].treeBase),
            treeCommon: JSON.parse(res.data[0].treeCommon),
            id: res.data[0].id,
            username: res.data[0].username,
            check: true,
          });
        }
      }
    );
  }
  onSelect(selectedList, selectedItem) {
    this.setState({ buckets: selectedList });
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }

  like(i) {
    Axios.post(
      "/forum/upvote/" + i + "/" + localStorage.getItem("username") + "/"
    ).then((res) => {
      if (res.data.value == "success") {
        document.getElementById("like".concat(i)).style =
          "background-color:yellow";
        document.getElementById("dislike" + i).style = "background-color:teal";
      }
    });
  }

  dislike(i) {
    Axios.post(
      "/forum/downvote/" + i + "/" + localStorage.getItem("username") + "/"
    ).then((res) => {
      if (res.data.value == "success") {
        document.getElementById("dislike" + i).style =
          "background-color:yellow";
        console.log(res.data);
      }
      document.getElementById("like".concat(i)).style = "background-color:teal";
    });
  }

  onRemove(selectedList, removedItem) {}
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  onSubmit() {
    let formdata = new FormData();

    formdata.append("postId", this.state.postId);
    formdata.append("username", localStorage.getItem("username"));
    formdata.append("keyword", this.state.keyword);
    formdata.append("buckets", this.state.buckets);
    formdata.append("msg", this.state.msg);
    formdata.append("citation_abt", this.state.citation_abt);
    formdata.append("citation", this.state.citation);

    Axios.post("/forum/answerSubmission/", formdata).then((res) => {
      if (res.status == 200) {
        this.setState({
          keyword: "",
          buckets: [],
          msg: "",
          citation: "",
          citation_abt: "",
        });
      }
    });
  }

  render() {
    var post = this.state.postdetails;

    return (
      <div>
        {this.state.redirect && (
          <Redirect
            to={{ pathname: "/tree", state: { main: this.state } }}
          ></Redirect>
        )}
        <Navbar />
        <Card1 style={{ width: "100%", backgroundColor: "#ffe066" }}>
          <div className="" style={{ marginLeft: "25%", paddingTop: "2%" }}>
            <div>
              <div className="description pt-5 d-flex row justify-content-start pb-3">
                <div className="problemimg p-3 col-sm-12 col-md-3">
                  <img
                    src={post.img}
                    className="img-thumbnail"
                    alt="Responsive"
                    width="100%"
                    size=""
                  />
                </div>
                <div
                  className="details p-3  col-sm-12 col-md-5"
                  style={{ width: "100%" }}
                >
                  <div className="title">
                    <p style={{ fontSize: "20px", fontWeight: 650 }}>
                      {post.title}
                    </p>
                  </div>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td className="p-1" style={{ width: "50%" }}>
                          <div className="activesolvers">
                            <h6 style={{ display: "inline" }}>DESCRIPTION :</h6>
                            <span className="pl-3">{post.desc}</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-1">
                          <div className="activesolvers">
                            <h6 style={{ display: "inline" }}>COMMENTS :</h6>
                            <span className="pl-3">{post.ans_count}</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <div className="posteddate">
                            <h6 style={{ display: "inline" }}>POSTED DATE :</h6>
                            <span className="pl-3">{post.posteddate}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className="details col-sm-12 col-md-3"
                  style={{ width: "100%" }}
                >
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "100%" }}>
                          {post.username == localStorage.getItem("username") ? (
                            <button
                              className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3"
                              style={{
                                backgroundColor: "#663300",
                                color: "white",
                              }}
                              disabled="True"
                            >
                              Your Post
                            </button>
                          ) : (
                            <div>
                              {this.state.expert && (
                                <button
                                  className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3"
                                  style={{
                                    backgroundColor: "#663300",
                                    color: "white",
                                  }}
                                  disabled="True"
                                >
                                  Expert
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "100%" }}>
                          {this.state.check ? (
                            post.panel ? (
                              <Link
                                to={{
                                  pathname: "dashboard/expertpost",
                                  state: {
                                    username: post.username,
                                    sid: post.panelId,
                                    bucket: post.panelBucket,
                                    treeSet: true,
                                    tree: this.state.treeData,
                                  },
                                }}
                              >
                                <button
                                  className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3 "
                                  style={{
                                    backgroundColor: "#663300",
                                    color: "white",
                                  }}
                                >
                                  Post
                                </button>
                              </Link>
                            ) : (
                              <div>
                                {post.username ==
                                  localStorage.getItem("username") && (
                                  <Link
                                    to={{ pathname: "dashboard/postproblem" }}
                                  >
                                    <button
                                      className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3 "
                                      style={{
                                        backgroundColor: "#663300",
                                        color: "white",
                                      }}
                                    >
                                      Post
                                    </button>
                                  </Link>
                                )}
                              </div>
                            )
                          ) : (
                            <button
                              className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3 "
                              style={{
                                backgroundColor: "#663300",
                                color: "white",
                              }}
                              disabled="true"
                            >
                              Post
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "100%" }}>
                          {this.state.check ? (
                            <Link
                              to={{
                                pathname: "/tree",
                                state: { main: this.state },
                              }}
                            >
                              <button
                                className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3"
                                style={{
                                  backgroundColor: "#663300",
                                  color: "white",
                                }}
                              >
                                Tree
                              </button>
                            </Link>
                          ) : (
                            <div>
                              {post.username ==
                                localStorage.getItem("username") ||
                              post.expert ? (
                                <button
                                  className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3"
                                  style={{
                                    backgroundColor: "#663300",
                                    color: "white",
                                  }}
                                  onClick={this.handleShow}
                                >
                                  Tree
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning align-self-center  col-sm-12 col-md-6 mt-3 "
                                  style={{
                                    backgroundColor: "#663300",
                                    color: "white",
                                  }}
                                  disabled="True"
                                >
                                  Tree
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card1>
        <Modal
          centered="true"
          show={this.state.setShow}
          onHide={this.handleClose}
        >
          <Modal.Header
            style={{
              backgroundColor: "#ececec",
              fontWeight: "bolder",
            }}
            closeButton
          >
            <Modal.Title>Choose your statements</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#dedede",
            }}
          >
            <div className="card">
              <div className="card-body">
                <Form>
                  {this.state.answers.map((y, index) => (
                    <>
                      <Form.Check
                        inline
                        label={y.msg}
                        type="checkbox"
                        name="ansChoice"
                        value={y.id}
                        id={index}
                        onChange={(e) => this.handleSelect(e)}
                      />
                      <hr />
                    </>
                  ))}
                </Form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#ececec",
            }}
          >
            <Button
              variant="primary"
              style={{ backgroundColor: "blue", color: "#ffff" }}
              onClick={this.handleSubmit}
            >
              Filter
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
        <div>
          <Card.Group className="p-2 ml-5">
            {this.state.answers.map((answer, index) => (
              <Card className="p-2">
                <Card.Content>
                  <Card1.Img
                    style={{ float: "right", width: "80px", height: "80px" }}
                    src={this.state.profiles[index].img}
                  />
                  <Card.Header>
                    {this.state.profiles[index].firstname +
                      "  " +
                      this.state.profiles[index].lastname}
                  </Card.Header>

                  <Card.Description>
                    <Header as="h4">{answer.keyword}:</Header>
                    {answer.msg}
                    <br />
                    <h5>
                      Link:&nbsp;{" "}
                      <a href="{answer.citation}">{answer.citation}</a>
                    </h5>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="float-right">
                    {answer.upvoters.includes(
                      localStorage.getItem("username")
                    ) ||
                    answer.upvoters.includes(
                      "," + localStorage.getItem("username")
                    ) ? (
                      <button
                        className="btn"
                        id={"like".concat(answer.id)}
                        style={{ backgroundColor: "yellow" }}
                      >
                        {" "}
                        <i
                          style={{ color: "white" }}
                          class="fas fa-thumbs-up"
                        ></i>
                      </button>
                    ) : (
                      <button
                        className="btn"
                        id={"like".concat(answer.id)}
                        style={{ backgroundColor: "teal" }}
                        onClick={() => this.like(answer.id)}
                      >
                        {" "}
                        <i
                          style={{ color: "white" }}
                          class="fas fa-thumbs-up"
                        ></i>
                      </button>
                    )}
                    &nbsp;
                    {console.log(
                      answer.downvoters.includes(
                        localStorage.getItem("username")
                      )
                    )}
                    {answer.downvoters.includes(
                      localStorage.getItem("username") + ","
                    ) ||
                    answer.downvoters.includes(
                      "," + localStorage.getItem("username")
                    ) ||
                    answer.downvoters.includes(
                      localStorage.getItem("username")
                    ) ? (
                      <button
                        className="btn"
                        id={"dislike".concat(answer.id)}
                        style={{ backgroundColor: "yellow" }}
                      >
                        <i
                          style={{ color: "white" }}
                          class="fas fa-thumbs-down"
                        ></i>
                      </button>
                    ) : (
                      <button
                        className="btn"
                        id={"dislike".concat(answer.id)}
                        style={{ backgroundColor: "teal" }}
                        onClick={() => this.dislike(answer.id)}
                      >
                        <i
                          style={{ color: "white" }}
                          class="fas fa-thumbs-down"
                        ></i>
                      </button>
                    )}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>

        <Modal show={this.state.show}>
          <Modal.Header>
            <Modal.Title>Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              Keyword:
              <input
                className="form-control"
                type="text"
                required
                name="keyword"
                onChange={this.handleChange}
              />
            </label>

            <br />

            <label htmlFor="buckets">Buckets Related:</label>
            {/* {this.state.domains.map((domains,index) =>(  */}
            <select
              id="buckets"
              placeholder="your"
              className="form-control"
              name="buckets"
              onChange={this.handleChange}
              required
            >
              {this.state.options.map((domains, index) => (
                <option value={domains.name}>{domains.name}</option>
              ))}
            </select>
            <br />
            <label htmlFor="msg">Explanation:</label>
            <textarea
              className="form-control"
              placeholder="Describe your reason here..."
              rows={5}
              id="msg"
              required
              name="msg"
              onChange={this.handleChange}
            />
            <br />
            <label>
              About Link:
              <input
                className="form-control"
                placeholder="Describe in one word..."
                type="text"
                name="citation_abt"
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label htmlFor="msg">Link:</label>
            <textarea
              className="form-control"
              placeholder="www.google.com"
              rows={1}
              id="citation"
              required
              name="citation"
              onChange={this.handleChange}
            />

            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="teal"
              onClick={() => {
                this.handleModal();
              }}
            >
              {" "}
              Close
            </Button>
            <Button
              color="teal"
              onClick={() => {
                this.onSubmit();
                this.handleModal();
              }}
            >
              {" "}
              Post
            </Button>
          </Modal.Footer>
        </Modal>

        <button
          className="btn floatbutton  button5 fa fa-plus"
          aria-hidden="true"
          onClick={() => this.handleModal()}
        ></button>
      </div>
    );
  }
}
export default PostDetail;
