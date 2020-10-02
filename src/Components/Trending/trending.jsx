import React from "react";
import "./trend.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../ProblemInvolved/style.css";
// const trending=[
//     {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
//     {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
//     {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
// ]

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: [
        //  {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
        //  {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
        //  {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
        //  {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
        //  {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
        //  {Trend:'#TRENDING 1',Name:'Sentiment Analysis for product rating',Cname:'IBM Chennai,India',Posted:'Apr 30 2020',Rewards:'1000USD',Likes:'100k',Collaborate:'150',Desc:'Sentiment analysis for product rating is a system, which rates any particular product based on hidden sentiments in the comments.'},
      ],
    };
    this.addInterestCount = this.addInterestCount.bind(this);
  }

  componentWillMount() {
    Axios.get("/post/trendings/" + localStorage.getItem("username") + "/").then(
      (response) => {
        this.setState({ trending: response.data });
      }
    );
  }

  async addInterestCount(id) {
    var url = `/post/viewProblem/${localStorage.getItem("username")}/${id}/`;
    await Axios.post(url);
  }

  render() {
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
            Trending Problems&nbsp;
            <p style={{ display: "inline", fontSize: "15pt" }}>
              (based on your profile...)
            </p>
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
            Trending Problems
          </h3>
        </div>

        {this.state.trending.map((trending, index) => (
          <Link
            to={{
              pathname: "/problemdetails",
              state: { pid: trending.problemId },
            }}
          >
            <div
              className="col-md-3 mt-4 box"
              key={index}
              style={{ display: "inline-block", transition: "1s" }}
            >
              <div
                className="card shadow-lg mb-4 bg-white"
                style={{ height: "90%" }}
              >
                <div className="card-body p-0">
                  <div className="img1">
                    <img
                      src={trending.img}
                      width="100%"
                      height="100px;"
                      alt="jgv"
                    />
                  </div>
                  <div
                    className="detailsbody pt-3 pl-3 pr-3 pb-1"
                    style={{
                      color: "white",
                      textAlign: "center",
                      backgroundImage:
                        "linear-gradient(to left bottom, #0d192d, #172a48, #223d65, #2d5084, #3864a4)",
                    }}
                  >
                    {/* <h5><Link to={{pathname:"/abstract", state:{query:problemPosted}}}>{problemPosted.title}</Link></h5> */}
                    {/* <p>{problemPosted.RnD_Budget}</p> */}
                    <h5 className="card-title">{trending.title}</h5>
                    <p>{trending.description.split("", 200)}...</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          //  <Link to={{pathname:'/problemdetails' ,state:{pid:trending.problemId}}}>
          //   <div className="card ml-4 mt-3 text-white" style={{width:'18rem',display:"inline-block",backgroundImage: "linear-gradient(to left bottom, #0d192d, #172a48, #223d65, #2d5084, #3864a4)"}}>
          //     <img className="card-img-top" src={trending.img} alt="Card image cap"/>
          //     <div className="card-body">
          //       <h5 className="card-title">{trending.title}</h5>
          //       <p className="card-text">{trending.description.split("",200)}...</p>
          //       {/* <p className="card-text"><i className="fa fa-calendar" style={{padding: '0px', color: 'white'}} />&nbsp;&nbsp;Posted:{trending.posteddate.split("",10)}</p>
          //       <p className="card-text"><i className="fa fa-trophy" style={{padding: '0px', color: 'white'}} />&nbsp;&nbsp;Reward:{trending.RnD_Budget}</p> */}

          //     </div>
          //   </div>
          //   </Link>
        ))}
      </div>
    );
  }
}

export default Trending;
