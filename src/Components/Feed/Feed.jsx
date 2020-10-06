import React from "react";
import { Link } from "react-router-dom";
import "./feed.css";
import Axios from "axios";
import axios from "axios";
import Navbar from "../Navbar/nav";

import bookmark from "./bookmarks.svg";
import tag from "./tag.svg";
import Survey from "./Survey.png";

import Create from "../Survey/Create";
import TakeSurvey from "../Survey/TakeSurvey";

import { Dropdown } from "semantic-ui-react";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedinfo: [
        //         {
        //           "title": "Corona Pandemic",
        //           "description": "It is highly effective",
        //           "deadline": "2020-05-20T13:08:58.943489Z",
        //           "img": "http://localhost:8000/media/problem_images/pandemic.jpg"
        //       }
      ],
      feedBack: [],
      //  color:true
      bookmark: [],
      result: [],
      domains: [
        "Algorithms",
        "Cryptography",
        "Distributed Computing",
        "Computer Vision",
        "Big Data",
        "Computational Learning",
        "Computer Vision",
        "Medicine",
        "Block Chain",
      ],

      //survey
      survey: [],
      pblm: [],
      creator: [],
      acc: [],
      options: [
        { key: 1, text: "Choice 1", value: 1 },
        { key: 2, text: "Choice 2", value: 2 },
        { key: 3, text: "Choice 3", value: 3 },
      ],
    };
    //this.fetchTasks = this.fetchTasks.bind(this)
    //this.interest = this.interest.bind(this)
    this.addInterestCount = this.addInterestCount.bind(this);
    this.domainChange = this.domainChange.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
  }

  componentDidMount() {
    this.fetchPost("new");
  }

  async fetchPost(sort) {
    //Survey
    await axios
      .get("/sol/getActiveSurvey/" + localStorage.getItem("username") + "/")
      .then((response) => {
        this.setState({ survey: response.data[0] });
        this.setState({ pblm: response.data[2] });
        this.setState({ creator: response.data[1] });
        this.setState({ acc: response.data[3] });
      });

    const url =
      "/dashboard/feed/" + localStorage.getItem("username") + "/" + sort + "/";
    const method = "GET";
    Axios.request({
      baseURL: "",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.props.token,
      },
      url,
      method,
    })
      .then((response) => {
        this.setState({ feedinfo: response.data[0] });
        this.setState({ feedBack: response.data[0] });
        this.setState({ bookmark: response.data[1] });
        this.setState({
          result: this.state.bookmark[0]["problems_interested"],
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // interest() {
  //   this.setState({color: !this.state.color})
  // }

  async addInterestCount(id) {
    var url = `/post/viewProblem/${localStorage.getItem("username")}/${id}/`;
    await Axios.post(url);
  }
  domainChange(event) {
    let dom = [];
    this.state.feedBack.forEach((feedinfo) => {
      if (feedinfo.skill.includes(event.target.value)) dom.push(feedinfo);
    });
    this.setState({ feedinfo: dom });
  }

  render() {
    //var feed = this.state.info
    var self = this;

    return (
      <div className="feedMain">
        <Navbar />
        <br />
        <br />
        <div className="container" style={{ marginTop: "3rem" }}>
          <div className="row">
            <div className="col-sm-0 col-md pb-3">
              <div className="card sticky-top">
                <div className="p-3">
                  {/* <Dropdown clearable options={this.state.options} selection /> */}
                  filter
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    onChange={(e) => this.fetchPost(e.target.value)}
                  >
                    <option selected>Choose...</option>
                    <option value="big">Big</option>
                    <option value="new">New</option>
                    <option value="old">Old</option>
                    <option value="near">Near</option>
                    <option value="far">Far</option>
                  </select>
                </div>
              </div>
              <div className="card sticky-top">
                <div className="card-header text-white bg-primary">Domain</div>
                <div className="card-body">
                  {this.state.domains.map((domain, index) => (
                    <div key={index}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={index}
                          name="customRadio"
                          value={domain}
                          onClick={this.domainChange}
                        />
                        <label className="custom-control-label" htmlFor={index}>
                          {domain}
                        </label>
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 overflow-auto"
              style={{ overflowY: "visible" }}
            >
              {this.state.feedinfo.reverse().map((feedinfo, index) => {
                let d = feedinfo.deadline;
                return (
                  <div>
                    <div className="card">
                      <div className="card-header bg-warning text-white">
                        {feedinfo.title}
                        {this.state.result.includes(feedinfo.problemId) ? (
                          <span
                            className="float-right text-dark mt--4"
                            style={{ fontWeight: "600" }}
                          >
                            <img src={bookmark} alt="bookmark" />
                          </span>
                        ) : (
                          ""
                        )}
                        {localStorage.getItem("username") ==
                        feedinfo.username ? (
                          <span
                            className="float-right text-dark"
                            style={{ fontWeight: "600" }}
                          >
                            Yours
                            <img className="ml-1" alt="asd" src={tag} />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <img src={feedinfo.img} alt="Card cap" height="140px" />
                      <div className="card-body">
                        <div className="card-title">
                          &nbsp;
                          <p>
                            Deadline : <strong>{d.split("", 10)}</strong>&nbsp;|
                            Submitted Solution : {feedinfo.sol_count}
                          </p>
                        </div>
                        <div className="card-text">
                          <strong style={{ fontSize: "16px" }}>Desc:</strong>
                          &nbsp;
                          <p style={{ color: "#808080", fontSize: "14px" }}>
                            {feedinfo.description}
                          </p>
                          <br />
                          <br />
                        </div>
                        <div style={{ float: "right" }}>
                          <Link
                            to={{
                              pathname: "/problemdetails",
                              state: { pid: feedinfo.problemId },
                            }}
                            className="btn btn-primary"
                            onClick={() =>
                              self.addInterestCount(feedinfo.problemId)
                            }
                          >
                            +View More..
                          </Link>
                          {localStorage.getItem("username") !=
                            feedinfo.username && (
                            <Create pblmID={feedinfo.problemId} />
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              <div>
                {this.state.survey.map((x, index) => (
                  <>
                    {this.state.acc[index] && (
                      <div>
                        <div
                          className="card"
                          style={{
                            backgroundImage: `url(${Survey})`,
                            color: "white",
                          }}
                        >
                          {this.state.pblm[index] != undefined &&
                            this.state.creator[index] != undefined && (
                              <div className="card-body">
                                <div className="card-title">
                                  <h3>
                                    <i class="fas fa-bullhorn" />
                                    &nbsp;&nbsp;&nbsp; Take the survey{" "}
                                  </h3>

                                  <hr style={{ backgroundColor: "white" }} />
                                </div>
                                <div className="card-text">
                                  <label style={{ fontWeight: "bold" }}>
                                    {" "}
                                    Problem Title&nbsp;:
                                  </label>{" "}
                                  {this.state.pblm[index].title}
                                  <br />
                                  <label style={{ fontWeight: "bold" }}>
                                    Survey Conductor&nbsp;:
                                  </label>
                                  &nbsp;{this.state.creator[index].firstname}
                                  &nbsp;
                                  {this.state.creator[index].lastname}
                                </div>
                                <div style={{ float: "right" }}>
                                  <TakeSurvey
                                    surveyID={this.state.survey[index].surveyID}
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                        <br />
                      </div>
                    )}
                  </>
                ))}
              </div>

              {/* {this.state.survey.map((x,index) =>{
              
              })} */}
              <br />
            </div>

            <div className="col">
              <div className="sticky-top">
                {/* <div className="card-header text-white bg-primary">
                  Latest News
               </div>
               
                <Main/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
