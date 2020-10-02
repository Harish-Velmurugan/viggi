import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../ProblemInvolved/style.css";

class ExpertDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemsPosted: this.props.location.state.problemsPosted,
      forumPosted: this.props.location.state.forumPosted
    };
    this.viewsolution = this.viewsolution.bind(this);
  }

  componentWillMount() {
    console.log(this.state)
  }

  viewsolution() {
    return <Redirect to="/abstract" />;
  }

  render() {
    var problemsPosted = this.state.problemsPosted;

    return (
      <div className="main_content">
              

        <div className="row">
          <div
            className="col-md-12"
            style={{ marginTop: "0%", marginLeft: "0%" }}
          >
            <div className="row">
              {problemsPosted.map((problemPosted, index) => (
                <div className="col-md-3" key={index}>
                  <div
                    className="card shadow-lg mb-4 bg-white"
                    style={{ height: "90%" }}
                  >
                    <div className="card-body p-0">
                      <div className="img1">
                        <img
                          alt="asd"
                          src={problemPosted.img}
                          width="100%"
                          height="100px;"
                        />
                      </div>
                      <div
                        className="detailsbody pt-3 pl-3 pr-3"
                        style={{ textAlign: "center" }}
                      >
                        <h5>
                          <Link
                            to={{
                              pathname: "/abstract",
                              state: { query: problemPosted, seeker:false },
                            }}
                          >
                            {problemPosted.title}
                          </Link>
                        </h5>
                        <p>{problemPosted.RnD_Budget}</p>
                        <p>{problemPosted.deadline.split("", 10)}</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-around">
                        <div>
                          <div
                            className={
                              problemPosted.sol_count > 0
                                ? "badge badge-pill badge-info"
                                : "badge badge-pill badge-dark"
                            }
                          >
                            {problemPosted.sol_count} Submited
                          </div>
                        </div>
                        <div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


              {this.state.forumPosted.map((forumPosted, index) => (
                <div className="col-md-3" key={index}>
                  <div
                    className="card shadow-lg mb-4 bg-white"
                    style={{ height: "90%" }}
                  >
                    <div className="card-body p-0">
                      <div className="img1">
                        <img
                          alt="asd"
                          src={forumPosted.img}
                          width="100%"
                          height="100px;"
                        />
                      </div>
                      <div
                        className="detailsbody pt-3 pl-3 pr-3"
                        style={{ textAlign: "center" }}
                      >
                        <h5>
                          <Link
                            to={{
                              pathname: "/postdetail", 
                              state: { pid: forumPosted.postId, expert:true },
                            }}
                          >
                            {forumPosted.title}
                          </Link>
                        </h5>
                        <p>{forumPosted.budget}</p>   
                        <p>{forumPosted.posteddate.split("", 10)}</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-around">
                        <div>
                          <div
                            className={
                              forumPosted.ans_count > 0
                                ? "badge badge-pill badge-info"
                                : "badge badge-pill badge-dark"
                            }
                          >
                            {forumPosted.ans_count} Submited
                          </div>
                        </div>
                        <div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpertDashboard;