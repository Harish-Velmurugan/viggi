import React from "react";
import { Link } from "react-router-dom";
import "./forums.css";
import Axios from "axios";
import Navbar from "../Navbar/nav";

import bookmark from "./bookmarks.svg";
import tag from "./tag.svg";

class Forum extends React.Component {
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
      buckets: [
        "Agriculture",
        "Arts & Sports",
        "Automobiles",
        "Climate",
        "E-Commerce",
        "Education & Training",
        "Fashion",
        "Finance",
        "FMCG",
        "Food",
        "Gem & Jewellery",
        "Healthcare",
        "Infrastructure",
        "Law",
        "Media & Entertainment",
        "Pharmaceuticals",
        "Power & Energy",
        "Railways",
        "Science & Technology",
        "Security",
        "Textile",
        "Trade",
        "Travel & Tourism"

         
      ],
    };
    //this.fetchTasks = this.fetchTasks.bind(this)
    //this.interest = this.interest.bind(this)
    this.addInterestCount = this.addInterestCount.bind(this);
    this.bucketChange = this.bucketChange.bind(this);
  }

  componentDidMount() {
    const url = "/forum/getPost/" ;
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
        this.setState({ feedinfo: response.data});

      })
      .catch((error) => {
        console.log(error);
      });
  }

  // interest() {
  //   this.setState({color: !this.state.color})
  // }

  async addInterestCount(id) {
    var url = '/forum/getPost/';
    await Axios.post(url);
  }
  bucketChange(event) {
    let dom = [];
    this.state.feedBack.forEach((feedinfo) => {
      if (feedinfo.buckets.includes(event.target.value)) dom.push(feedinfo);
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
                <div className="card-header text-white bg-primary">Buckets</div>
                <div className="card-body">
                  {this.state.buckets.map((bucket, index) => (
                    <div key={index}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={index}
                          name="customRadio"
                          value={bucket}
                          onClick={this.bucketChange}
                        />
                        <label className="custom-control-label" htmlFor={index}>
                          {bucket}
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
                            Submitted Answers : {feedinfo.ans_count}
                          </p>
                        </div>
                        <div className="card-text">
                          <strong style={{ fontSize: "16px" }}>Desc:</strong>
                          &nbsp;
                          <p style={{ color: "#808080", fontSize: "14px" }}>
                            {feedinfo.desc}
                          </p>

                        </div>
                        <div style={{ float: "right" }}>
                          <Link
                            to={{
                              pathname:"/postdetail",
                              state: { pid: feedinfo.postId, expert:false },
                            }}
                            className="btn btn-primary"
                            onClick={() =>
                              self.addInterestCount(feedinfo.postId)
                            }
                          >
                            +View more...
                          </Link>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
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

export default Forum;
