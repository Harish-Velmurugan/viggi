import React from "react";
import Axios from "axios";
import Name from "./name.svg";
import Points from "./points.svg";
import School from "./school.svg";
import Skills from "./skills.svg";
import Email from "./email.svg";
import Navbar from "../Navbar/nav";
import { Link } from "react-router-dom";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemsinvolved: [],
      problemsposted: [],
      personaldetails: [],
      qualification: "",
      specialization: "",
      email: "",
      img: "",
      name: "",
    };
  }

  componentDidMount() {
    Axios.get(
      `/users/v1/users/profile/${localStorage.getItem("username")}/`
    ).then((response) => {
      //   this.setState({problemsinvolved:response.data[0]})
      //    this.setState({problemsposted:response.data[1]})
      //    this.setState({personaldetails:response.data[2]})
      //    this.setState({professionaldetails:response.data[3]})
      //    this.setState({email:response.data[4].email})
      var dat2 = response.data[2];
      this.setState({
        //professionaldetails:response.data[3],
        problemsinvolved: response.data[0],
        problemsposted: response.data[1],
        email: response.data[4].email,
        //qualification:dat1[0].qualification,
        //specialization:dat1[0].specialization,
        name: dat2[0].firstname + dat2[0].lastname,
        img: dat2[0].img,
      });
    });
  }

  render() {
    // var personaldetails = this.state.personaldetails;
    // var professionaldetails = this.state.professionaldetails;
    var problemsinvolved = this.state.problemsinvolved;
    var problemsposted = this.state.problemsposted;

    return (
      <div>
        <Navbar />
        <div className="profile m-5 pt-3">
          <div className="row mt-5 ml-5">
            <div className="col-sm-3  border-right">
              <div className="image  p-4">
                <img
                  src={this.state.img}
                  className="img-thumbnail"
                  alt="Cinque Terre"
                  width="130px"
                  height="100px"
                />
              </div>
              <div className="details">
                <table
                  style={{ width: "100%", fontSize: "15px", fontWeight: 600 }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <h4 style={{ fontWeight: 700 }}>
                          <img src={Name} alt="profile pic" /> {this.state.name}
                        </h4>
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                    </tr>
                    <tr>
                      <td>
                        <p>
                          <img alt="asd" src={Email} /> {this.state.email}
                        </p>
                        <p />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>
                          <img alt="asd" src={Skills} />{" "}
                          {this.state.specialization}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>
                          <img alt="school" src={School} />{" "}
                          {this.state.qualification}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>
                          <img alt="school" src={Points} />{" "}
                          {/*personal.points*/}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/update">
                          <button
                            className="btn float-right btn-sm btn-info"
                            style={{ backgroundColor: "#33adff" }}
                          >
                            Edit Profile
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-9">
              <div
                className="problemsinvolved table-hover"
                style={{ width: "70%" }}
              >
                <h5>Particpated Problems</h5>
                <ul className="list-group list-group-flush">
                  {problemsinvolved.map((probleminvolved, index) => {
                    return (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                      >
                        {probleminvolved.title}
                        <span className="badge badge-primary badge-pill">
                          {/*probleminvolved.review*/}
                        </span>
                        <span>{probleminvolved.deadline.split("", 10)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="problemsposted mt-5" style={{ width: "70%" }}>
                <h5>Posted Problems</h5>
                <ul className="list-group list-group-flush">
                  {problemsposted.map((problemposted, index) => {
                    return (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                      >
                        {problemposted.title}
                        <span>{/*problemposted.amount*/}</span>
                        <span>{problemposted.soln_date.split("", 10)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
