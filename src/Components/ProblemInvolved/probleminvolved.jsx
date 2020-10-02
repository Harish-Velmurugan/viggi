import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

class ProblemInvolved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemsinvolved: [
        // { id:'1',breifTitle:'Reconstituted Paediatric Powders',budget:' $15,000 USD',image:'./img1.jfif',level:'submitted',status:true,deadline:'Jun 12 2020 23:59 EDT',seekersName:'Google' ,review:'Nice work'},
        // { id:'2',breifTitle:'Gamification to Prevent the Spread of Coronavirus',budget:'$1,000 USD',level:'collabrated',image:'./img1.jfif',status:false,deadline:'Jun 12 2020 23:59 EDT',seekersName:'Oxford University',review:''},
        // { id:'3',breifTitle:'Future Innovation of the U.S. Electric Grid',budget:'1,000 USD',image:'./img1.jfif',level:'submitted',status:true,deadline:'Jun 08 2020 23:59 EDT',seekersName:'NUS',review:'Winner'},
        // { id:'4',breifTitle:'Early Signs of Pending Pandemic',budget:'30,000 USD',image:'./img1.jfif',status:false,level:'unsolved',deadline:'Jun 12 2020 23:59 EDT',seekersName:'Seeram Insitute',review:'' },
        // { id:'5',breifTitle:'Fonterra Challenge: Sustainable Butter Mini-Dish',budget:'$1,000 USD',image:'./img1.jfif',status:false,level:'unsolved',deadline:'Jun 12 2020 23:59 EDT',seekersName:'NIT-Trichy',review:'' },
      ],
      status: [],
      status1: [],
    };
    this.getBadge = this.getBadge.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    axios
      .get(`/dashboard/dashboard-piv-view/${localStorage.getItem("username")}/`)
      .then((response) => {
        this.setState({ status: response.data[1] });
        this.setState({ problemsinvolved: response.data[0] });
        console.log(this.state.problemsinvolved);
        // this.setState({status1:JSON.parse(JSON.stringify(this.state.status))})
      });
  }

  getBadge(level) {
    let badge = "badge badge-pill badge-";
    if (level == "submitted") {
      return badge + "success";
    } else if (level == "collabrated") {
      return badge + "primary";
    } else {
      return badge + "secondary";
    }
  }

  problemId(id) {
    localStorage.setItem("currentproblem", id);
  }

  render() {
    var problemsinvolved = "";
    problemsinvolved = this.state.problemsinvolved;
    var self = this;

    return (
      <div className="main_content">
        {/* <div
          className="card"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Involved Problems
          </h3>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Involved Problems
          </h3>
        </div>

        <div className="row">
          <div className="col-sm-12" style={{ marginLeft: "0%" }}>
            {/* <div className="d-flex">
              <a href="#" className="p-2 ml-auto">view all</a>
            </div> */}
            <div className="row">
              {problemsinvolved.map((probleminvolved, index) => (
                <div className="col-md-3" key={index}>
                  <div
                    className="card shadow-sm mb-4 bg-white"
                    style={{ height: "90%" }}
                  >
                    <div className="card-body p-0">
                      <div className="img1">
                        <img
                          alt="asd"
                          src={probleminvolved.img}
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
                              pathname: "/problemdetails",
                              state: { pid: probleminvolved.problemId },
                            }}
                          >
                            {probleminvolved.title}
                          </Link>
                        </h5>
                        {/* <h6>{probleminvolved.seekersName}</h6> */}
                        <p className="p-0" style={{ fontSize: "15px" }}>
                          {probleminvolved.RnD_Budget}
                        </p>
                        <p className="p-0" style={{ fontSize: "15px" }}>
                          {probleminvolved.deadline.split("", 10)}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-around">
                        <div>
                          <div>{/*probleminvolved.level*/}</div>
                        </div>
                        <div>
                          <div
                            className="badge badge-pill badge-warning
                            "
                          >
                            {/*probleminvolved.review*/}
                          </div>
                        </div>
                        <center>
                          <div>
                            {this.state.status[index].submitted == "true" ? (
                              <Link
                                to={{
                                  pathname: "/dashboard/solutionedit",
                                  state: { query: probleminvolved.problemId },
                                }}
                              >
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm "
                                >
                                  &nbsp;View&nbsp;&nbsp;
                                </button>
                              </Link>
                            ) : (
                              ""
                            )}
                            &nbsp;&nbsp;{" "}
                            <Link to="/submitsolution">
                              {probleminvolved.solved ? (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-secondary"
                                  disabled="True"
                                >
                                  Submit
                                </button>
                              ) : probleminvolved.topsolver ? (
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={() =>
                                    self.problemId(probleminvolved.problemId)
                                  }
                                >
                                  Submit
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={() =>
                                    self.problemId(probleminvolved.problemId)
                                  }
                                > 
                                  Submit
                                </button>
                              )}
                            </Link>
                            {/* { !probleminvolved.status ? 
                        (<Link to="/submitsolution"><button type="button" className="btn btn-success btn-sm" style={{float: 'right'}}>Submit</button></Link>):''
                      } */}
                          </div>
                        </center>
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

export default ProblemInvolved;
