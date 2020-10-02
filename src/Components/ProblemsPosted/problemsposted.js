import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../ProblemInvolved/style.css";

class ProblemsPosted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // problemsPosted : [
      //     {id:'1',briefTitle:'Anti-COVID-19 Infection Protective Film',deadline:'Jun 15 2020 23:59 EDT',image:'./img1.jfif',budget:'$1,000 USD',solutionsNo:'10'},
      //     {id:'2',briefTitle:'Fonterra Challenge: Sustainable Butter Mini-Dish',deadline:'May 21 2020 23:59 EDT',image:'./img1.jfif',budget:'$2000 USD',solutionsNo:'25'},
      //     {id:'3',briefTitle:'Diminishing the Transmission of COVID-19',deadline:'May 24 2020 23:59 EDT ',image:'./img1.jfif',budget:'$3000 USD',solutionsNo:'50'},
      //     {id:'4',briefTitle:'Innovative Transitional Hybrid Power Plan',deadline:'May 21 2020 23:59 EDT',image:'./img1.jfif',budget:'$1500 USD',solutionsNo:'0'},
      // ],
      problemsPosted: [],
    };
    this.viewsolution = this.viewsolution.bind(this);
  }

  componentWillMount() {
    axios
      .get(`/dashboard/dashboard-ppp-view/${localStorage.getItem("username")}/`)
      .then((response) => {
        this.setState({
          problemsPosted: response.data,
        });
      });
  }

  viewsolution() {
    return <Redirect to="/abstract" />;
  }

  render() {
    var problemsPosted = this.state.problemsPosted;

    return (
      <div className="main_content">
        {/* <div
          className="card"
          style={{
            textAlign: "centre",
            paddingLeft: "25rem",
            marginBottom: "1rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ textAlign: "centre", paddingTop: "4px", color: "snow" }}>
            Problems Posted
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
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Problems Posted</h3>
        </div>

        <div className="row">
          <div
            className="col-md-12"
            style={{ marginTop: "0%", marginLeft: "0%" }}
          >
            {/* <div className="d-flex">
                <a href="#" className="p-2 ml-auto">view all</a>
              </div> */}
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
                              state: { query: problemPosted , seeker:true},
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
                          {/* <button type="button" className="btn btn-success btn-sm" style={{float: 'right'}} onClick={()=>history.push('/abstract')}>View Solutions</button> */}
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

export default ProblemsPosted;
