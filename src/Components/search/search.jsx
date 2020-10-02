import React from "react";
import "./search.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/nav";

// const trending=[
//     {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',
//     Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',
//     Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
// ]

// const renderTrendingInfo=(trending,index) =>
// {
//     return(
//         <div className="searchcard">
//                 <div className="additional">
//                   <div className="user-card">
//                     <div className="level center mt-2">
//                       {trending.Trend}
//                     </div>

//                     <img className="center mt-2 ml-3" src="ch1.png" width="100px" height="100px" />

//                   <div className="points center mt-3">
//                      {trending.Collaborate} Submissions
//                     </div>
//                     </div>
//                   <div className="more-info"><br />
//                         <h1>{trending.Name}</h1>
//                     <div className="coords">
//                       <span>Company name:{trending.Cname}</span>
//                       {/* <span></span> */}
//                     </div>
//                     <div className="coords">
//                         <span>Posted:{trending.Posted}</span>
//                     </div>
//                  <div className="stats">

//                       <div>
//                         {/* <div class="title">Reward</div> */}
//                         <i className="fa fa-trophy ml-4" />
//                         {/*<div className="value ml-10">{trending.Rewards}</div>*/}
//                       </div>
//                       <div>
//                         {/* <div class="title">Likes</div> */}
//                         <i className="fa fa-thumbs-up" />
//                        {/* <div className="value">{trending.Likes}</div>*/}
//                       </div>
//                       <div>
//                         {/* <div class="title">Pals</div> */}
//                         <i className="fa fa-group" />
//                        {/* <div className="value">{trending.Collaborate }</div>*/}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="general">
//                   <h6 style={{padding: '10px'}}><strong>{trending.Name}</strong></h6>
//                         <p>{trending.Desc}</p>
//                   {/* <span class="more"></span> */}
//                 </div>
//               </div>
//     )
// }

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      key: "",
      search: [],
      profile: [],
      challanges: [],
      solutions: [],
      professional: [],
    };
  }

  componentDidMount() {
    let q = this.props.location.state.query || "";
    let url_1 = "/search/" + q + "/";
    Axios.get(url_1).then((response) => {
      this.setState({ search: response.data });
      this.setState({ professional: response.data[3] });
      this.setState({ profile: response.data[0] });
      this.setState({ challanges: response.data[1] });
      this.setState({ solutions: response.data[2] });
    });
  }
  render() {
    return (
      <div className="search-container">
        <Navbar />
        <div>
          <div className="form-row">
            <div className="form-group col-md-7">
              <div className="container-fluid">
                <div className="mt-5 p-4" style={{ width: "100%" }}>
                  <div>
                    <h5
                      className="border-bottom p-2"
                      style={{ fontSize: "18px" }}
                    >
                      <strong>
                        Search results for "{this.props.location.state.query}"
                      </strong>
                    </h5>
                  </div>
                  <div className="mt-4">
                    <ul
                      className="nav nav-tabs bg-light"
                      role="tablist"
                      style={{ fontSize: "15px" }}
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#profile"
                        >
                          Profiles
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#company"
                        >
                          Challanges
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#challenge">Solutions</a>
                      </li> */}
                      {/* <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#all">All</a>
                      </li> */}
                    </ul>
                  </div>

                  {/* Tab panes */}

                  <div className="tab-content">
                    <div id="profile" className="container tab-pane active">
                      <br />
                      {this.state.profile.map((profile, index) => (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={{
                            pathname: "/profile",
                            state: { id: profile.username },
                          }}
                          key={index}
                        >
                          <div className="border-bottom" key={index}>
                            <div className="d-flex row">
                              <div className="p-1 col-sm-8 col-md-2">
                                <img
                                  src={profile.img}
                                  className="img-thumbnail"
                                  alt="Cinque Terre"
                                  width="100vw"
                                />
                              </div>
                              <div className="pt-2 pl-2 col-sm-8">
                                <Link
                                  href=""
                                  style={{ textDecoration: "none" }}
                                >
                                  <h5
                                    className="mb-0"
                                    style={{ color: "black" }}
                                  >
                                    <strong>{profile.firstname}</strong>
                                  </h5>

                                  <p
                                    style={{ fontSize: "14px", color: "black" }}
                                    className="mb-0 pt-1"
                                  >
                                    <i
                                      className="fa fa-graduation-cap"
                                      style={{ padding: "0px" }}
                                    />
                                    &nbsp;
                                    {
                                      this.state.professional[index][0]
                                        .qualification
                                    }
                                  </p>
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      color: "#9ca3a8",
                                    }}
                                  >
                                    Specialization :
                                    {
                                      this.state.professional[index][0]
                                        .specialization
                                    }
                                  </div>
                                  <p />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div id="company" className="container tab-pane fade">
                      <br />
                      {this.state.challanges.map((challenges, index) => (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={{
                            pathname: "/problemdetails",
                            state: { pid: challenges.problemId },
                          }}
                        >
                          <div key={index} className="border-bottom p-2">
                            <div className="row">
                              <div className="p-1 col-sm-8 col-md-2">
                                <img
                                  src={challenges.img}
                                  className="img-thumbnail"
                                  alt="Loading"
                                  width="100vw"
                                />
                              </div>

                              <div className="pt-2 pl-2 col-sm-12 col-md-9">
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  <h5 className="mb-0">
                                    <strong>{challenges.title}</strong>
                                  </h5>
                                  <p
                                    style={{
                                      fontSize: "11pt",
                                      color: "#696969",
                                    }}
                                  >
                                    {challenges.description.split("", 200)}...
                                  </p>
                                  <p
                                    style={{ fontSize: "14px" }}
                                    className="mb-0"
                                  >
                                    <i
                                      className="fa fa-calendar"
                                      style={{ padding: "0px", color: "blue" }}
                                    />
                                    &nbsp;
                                    <strong>
                                      Deadline :{" "}
                                      {challenges.deadline.split("", 10)}
                                      <i
                                        className="fa fa-trophy ml-4"
                                        style={{ color: "#d2691e" }}
                                      />
                                      &nbsp;Reward:{challenges.RnD_Budget}
                                      &nbsp;&nbsp;
                                      <i
                                        className="fa
                                    fa-check-circle ml-4"
                                        style={{ color: "green" }}
                                      />
                                      &nbsp;Submitted Solutions:
                                      {challenges.sol_count}
                                    </strong>
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* <div id="challenge" className="container tab-pane fade"><br/>
                    {this.state.solutions.map((solutions,index) =>(
                    <Link style={{textDecoration:'none'}}to={{pathname:"/", state:{query:solutions.solutionId}}}>
                    <div key={index} className="border-bottom" style={{height: '100px'}}>
                      <div className="d-flex">
                        <div className="p-1">
                          <img src={"solutions.image"} className="img-thumbnail float-right" alt="Image Loading" width="70px" height="100px" />
                        </div>
                        <div className="pt-2 pl-2 flex-grow-1">
                        <a href="" style={{textDecoration:'none' , color:'black'}}>
                        <h5 className="mb-0"><strong>{solutions.title}</strong></h5>
                          <p style={{fontSize: '14px'}} className="mb-0">&nbsp;{solutions.desc.split("",100)}...</p><div style={{fontSize: '14px', color: '#9ca3a8'}}>{/*<i className="fa ml-4" style={{padding: '0px'}} />&nbsp;<strong>Votes : {solutions.votes}</strong></div><p/></a>
                        {/* </div>
                      </div>
                    </div>  
                    </Link> 
                    ))} */}
                    {/* </div>  */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="form-group col-md-5 mt-5">
              
              <br /><h4 style={{marginLeft: '60pt', fontFamily: 'Segoe UI'}}>Trending <i className="fa fa-line-chart" /></h4>
              {trending.map(renderTrendingInfo)}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
