import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

import "./Top.css";
import Navbar from "../Navbar/nav";
import axios from "axios";

export default class TopCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: [],
      professional: [],
      profile: [],
      list: [],
      problem: this.props.location.state.query,
      req: this.props.location.state.req,
    };
  }

  componentDidMount() {
    console.log("lolll" + this.state.problem);
    console.log("pkjub" + this.props.location.state.query);
    axios
      .get("/dashboard/topsolver/" + this.props.location.state.query + "/")
      .then((response) => {
        this.setState({ professional: response.data[2] });
        this.setState({ profile: response.data[0] });
        this.setState({ personal: response.data[1] });
        this.setState({ list: response.data[3] });

        this.setState({ isLoading: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  top(e) {
    // let g=this.state.id;
    console.log(e);
    axios
      .post(
        "/dashboard/topsolverRequest/" +
          this.props.location.state.query +
          "/" +
          e +
          "/"
      )
      .then((response) => {
        //alert('request sent');
        if (response.status == 200) {
          document.getElementById(e + "req").disabled = "true";
        }
      });
  }

  render() {
   
    var per = this.state.personal;
    var pro = this.state.professional;
    var prof = this.state.profile;

    return (
      <div>
        <Navbar />
        <br />
        <br />
        <br />
        <center>
          <h2>TOP SOLVERS</h2>
        </center>

        {per.map((da, i) =>
          per[i].username != localStorage.getItem("username") ? (
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
                    <h5 style={{ fontWeight: "bold" }}>
                      {pro[i].specialization}
                    </h5>
                  </center>
                </Card.Text>

                <Card.Text className="text-secondary">
                  <h5>
                    <center>RP&nbsp;:&nbsp;{prof[i].rp}</center>
                  </h5>
                </Card.Text>
                {console.log(pro[i].requested)}
                {pro[i].requested ? (
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
                ) : (
                  <Button
                    className="btn"
                    variant="success"
                    disabled="true"
                    style={{ backgroundColor: "#2b2b2b", color: "#ffffff" }}
                    block
                  >
                    Requested
                  </Button>
                )}
              </Card.Body>
            </Card>
          ) : (
            <div></div>
          )
        )}
      </div>
    );
  }
}
