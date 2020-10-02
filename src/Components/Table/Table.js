import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "../ProblemInvolved/style.css";

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expired: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    axios
      .get("/dashboard/expired/" + localStorage.getItem("username") + "/")
      .then((response) => {
        this.setState(
          (this.state.expired = this.state.expired.concat(response.data))
        );
        this.setState({ isLoading: true });
        console.log(this.state.expired);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const expired = this.state.expired;
    return (
      <div className="tab main_content">
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
            Expired Problems
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
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Expired Problems</h3>
        </div>

        <table className="table table-bordered"
        style={{backgroundColor:"#323754",color:"white",
        width:"80%",
        marginLeft:"10%",
        textAlign:"center",
        marginTop:"10%"}}>
          <thead style={{backgroundColor:"#4885ed"}}>
            <tr>
              <th>
                Problems
              </th>
              <th>
                RnD_Budget
              </th>
            </tr>
          </thead>
          <tbody>
            {expired.map((item) => (
              <tr key={item.problemId}>
                <td>
                  <center>
                    <Link
                      to={{ pathname: "/prblmdesc", state: { query: item } }}
                      style={{color:"white"}}
                    >
                      {item.title}
                    </Link>
                  </center>
                </td>
                <td>
                  <center>
                    <Link
                      to={{ pathname: "/prblmdesc", state: { query: item } }}
                      style={{color:"white"}}
                    >
                      {item.RnD_Budget}
                    </Link>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
