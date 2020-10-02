import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

import "./Top.css";
import Navbar from "../Navbar/nav";
import Axios from "axios";

export default class ExpertList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: props.location.state.choice,
      bucket: props.location.state.bucket,
      problem: props.location.state.problem,
      posted: [],
      personal: [],
      professional: [],
      profile: [],
      wicked: props.location.state.wicked,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  async handleChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log(value);
    let wicked = ""
    if(this.state.choice == "wicked"){
      wicked = this.state.posted[value].postId
    }
    else{
      wicked = this.state.posted[value].problemId
    }

    await this.setState({
      bucket: this.state.posted[value].buckets,
      problem: wicked,
    });
    this.handleLoad();
  }

  componentDidMount() {
    console.log(this.state.choice, this.state.choice);

    if (this.state.choice == "wicked") {
      Axios.get("/forum/postRefining/" + localStorage.getItem("username") + "/")
        .then((response) => {
          this.setState({ posted: response.data });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.choice == "solution") {
      Axios.get(
        "/dashboard/dashboard-ppp-view/" +
          localStorage.getItem("username") +
          "/"
      )
        .then((response) => {
          this.setState({ posted: response.data });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("hi");
      this.handleLoad();
    }
  }

  handleLoad() {
    console.log(this.state.bucket, this.state.choice, this.state.problem);
    Axios.get(
      "/api/expertList/" + this.state.bucket + "/" + this.state.choice + "/"
    )
      .then((response) => {
        this.setState({ professional: response.data[2] });
        this.setState({ profile: response.data[0] });
        this.setState({ personal: response.data[1] });

        this.setState({ isLoading: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  top(e) {
    // let g=this.state.id;
    console.log(e);

    let username = localStorage.getItem("username");
    let form_data = new FormData();
    form_data.append("bucket", this.state.bucket);
    form_data.append("choice", this.state.choice);
    form_data.append("expert", e);
    form_data.append("problem", this.state.problem);
    form_data.append("username", Number(username));

    Axios.post("/api/expertRequest/", form_data)
      .then((response) => {
        //alert('request sent');
        if (response.status == 200) {
          document.getElementById(e + "req").disabled = "true";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var per = this.state.personal;
    var pro = this.state.professional;
    var prof = this.state.profile;

    console.log(per, pro, prof);
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <br />
        <center>
          <h2>Expert Panels</h2>
        </center>

        <br />
        <div className="" style={{ fontWeight: 600, marginRight: "20%" }}>
          <table style={{ width: "100%", marginLeft: "10%" }}>
            <tbody>
              {this.state.choice == "solution" && (
                <div>
                  <tr>
                    <td className="p-4">
                      {/* Choose your Forum Post */}

                      <label
                        htmlFor="title"
                        className="form-label-lg"
                        style={{ fontSize: "20px" }}
                      >
                        Choose your problem for solution decomposition
                      </label>
                    </td>
                    <td className="p-4">
                      {" "}
                      <select
                        className="form-control form-control-lg"
                        name="bucket"
                        id="bucket"
                        style={{ minWidth: "120%" }}
                        onChange={this.handleChange}
                        required
                      >
                        <option selected>Select your problem</option>
                        {this.state.posted.map((expert, i) => (
                          <option value={i}>{expert.title}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </div>
              )}
              {this.state.choice == "wicked" && (
                <div>
                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="title"
                        className="form-label-lg"
                        style={{ fontSize: "20px" }}
                      >
                        Choose your Forum Post
                      </label>
                    </td>
                    <td className="p-4">
                      {" "}
                      <select
                        className="form-control form-control-lg"
                        name="bucket"
                        id="bucket"
                        style={{ minWidth: "120%" }}
                        onChange={this.handleChange}
                        required
                      >
                        <option selected>Select your problem</option>
                        {this.state.posted.map((expert, i) => (
                          <option value={i}>{expert.title}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </div>
              )}
            </tbody>
          </table>
        </div>

        {per.map(
          (da, i) => (
            // per[i].username != localStorage.getItem("username") ? (
            <Card className="card-display m-5" style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src={per[i].img}
                style={{ width: "15rem", height: "9rem" }}
              />
              <Card.Body className="mh-100 d-flex flex-column">
                <div
                  className="mh-100 d-flex mb-2 justify-content-between text-center"
                  style={{ width: "12rem", height: "2rem" }}
                >
                  <Card.Title
                    className="h-100 text-secondary"
                    class="text-center"
                  >
                    <h4 style={{ fontWeight: "bolder" }}>
                      {per[i].firstname + " " + per[i].lastname}
                    </h4>
                  </Card.Title>
                </div>
                <Card.Text
                  className="text-secondary mh-100 "
                  style={{ width: "12rem", height: "3rem", marginTop: "20px" }}
                >
                  <center
                    style={{
                      minHeight: "10vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    class="my-auto"
                  >
                    {/* <h5 style={{fontWeight:"bold"}}> */}
                    {pro[i].specialization}
                    {/* </h5> */}
                  </center>
                </Card.Text>

                <Card.Text className="text-secondary">
                  <h5>
                    <center>RP&nbsp;:&nbsp;{prof[i].rp}</center>
                  </h5>
                </Card.Text>

                {/* {pro[i].requested ? ( */}
                <Button
                  className="btn btn-primary"
                  id={per[i].username + "req"}
                  variant="success"
                  onClick={() => {
                    this.top(per[i].username);
                  }}
                  block
                >
                  Request
                </Button>
                {/* ) : (
                  <Button
                    className="btn"
                    variant="success"
                    disabled="true"
                    style={{ backgroundColor: "#2b2b2b", color: "#ffffff" }}
                    block
                  >
                    Requested
                  </Button> 
                )} */}
              </Card.Body>
            </Card>
          )
          /* ) : (
            <div></div>
          ) */
        )}
      </div>
    );
  }
}
