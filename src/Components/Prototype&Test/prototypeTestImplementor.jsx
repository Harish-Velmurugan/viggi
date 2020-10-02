import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import A from "./a.jpg";
import { Card, Button, CardDeck, Modal, InputGroup } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
// import update from "react-addons-update";
import Testing1 from "../Prototype&Test/testing1";

import { Stepper as Steppernew } from "@material-ui/core";

class prototypeTestImplementor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      stepper: 0,
      process: [""],
      dataArr: [],
      show: false,
      show1: false,
      show2: false,
      show3: false,
      id: this.props.location.state.query,
      person: "",
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      stepName: "",
      Desc: "",
      Doc: "",
      step2Agree: "",
    };

    this.next = this.next.bind(this);
    //   this.handleChange = this.handleChange.bind(this);
    this.Step1 = this.Step1.bind(this);
    this.Step2 = this.Step2.bind(this);
    this.Step3 = this.Step3.bind(this);
    this.planAccept = this.planAccept.bind(this);
    this.planReject = this.planReject.bind(this);

    // this.planAccept = this.planAccept.bind(this);
    this.prototypeAccept = this.prototypeAccept.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  prototypeAccept() {
    axios
      .post("/prototypetest/prototypeAccept/" + this.state.id + "/")
      .then((res) => {
        console.log(res.data);
        document.getElementById("prototypeaccept").disabled = true;
        //     document.getElementById("planreject").innerHTML = "Rejected";
      });
  }

  componentDidMount() {
    axios
      .get("/prototypetest/viewPlanning/" + this.state.id + "/")
      .then((res) => {
        console.log(res.data);
        this.setState({ currentStep: Number(res.data.currentStep) });
        this.setState({ stepper: Number(res.data.stepper) });

        if (res.data.value == "Planning phase is not submitted still") {
          this.setState({ show: false });
        } else {
          this.setState({
            show: true,
            show1: true,
            a: res.data.value.budget,
            b: res.data.value.time,
            c: res.data.value.desc,
            d: res.data.value.sustainability,
            e: res.data.value.risk,
            f: res.data.value.ios,
          });
        }

        if ("agree" in res.data) {
          this.setState({
            show1: false,
            a: res.data.value.budget,
            b: res.data.value.time,
            c: res.data.value.desc,
            d: res.data.value.sustainability,
            e: res.data.value.risk,
            f: res.data.value.ios,
          });
        }
      });

    axios
      .get("/prototypetest/viewPrototype/" + this.state.id + "/")
      .then((res) => {
        if (res.data.value == "This phase is not submitted still") {
          this.setState({ show2: false });
        } else {
          this.setState({
            show2: true,
            stepName: res.data.steps,
            person: res.data.person,
            Desc: res.data.prototypeDesc,
            Doc: res.data.prototypeDoc,
            step2Agree: res.data.pImplementerAgree,
          });
        }
        console.log(res.data.pImplementerAgree);
      });
    // console.log(this.state.step2Agree);
  }

  planAccept() {
    axios
      .post("/prototypetest/planningAccept/" + this.state.id + "/")
      .then((res) => {
        console.log(res.data);
        document.getElementById("planreject").disabled = true;
        document.getElementById("planaccept").innerHTML = "Accepted";
      });
  }

  planReject() {
    axios
      .post("/prototypetest/planningReject/" + this.state.id + "/")
      .then((res) => {
        console.log(res.data);
        document.getElementById("planaccept").disabled = true;
        document.getElementById("planreject").innerHTML = "Rejected";
      });
  }
  next() {
    // window.location = "/dashboard/solPrototypeInitial";
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <div>
          <button
            className="btn btn-primary mt-1"
            style={{ marginLeft: "14%" }}
            type="button"
            onClick={this._prev}
          >
            &lt; Previous
          </button>
        </div>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <div>
          <button
            className="btn btn-primary  mt-1"
            style={{ marginLeft: "78%" }}
            type="button"
            onClick={this._next}
          >
            &nbsp;&nbsp;Next &gt;&nbsp;&nbsp;
          </button>
          <br />
          <br />
        </div>
      );
    }
    return null;
  }

  _next = () => {
    console.log(this.state.currentStep);
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: this.state.currentStep + 1,
    });
    this.setState({ stepper: this.state.stepper + 1 });
    console.log(this.state.currentStep);
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
    this.setState({ stepper: this.state.stepper - 1 });
  };

  render() {
    console.log(this.state.dataArr);
    return (
      <div className="main_content">
        {/* <div 
                style={{
                  display: "flex",
                  justifyContent: "center",

                  marginLeft:'5%',
                  marginRight:'7%',
                  backgroundColor: "#323754",
                }}
                class="mb-4"
                >
                <h3 style={{ paddingTop: "4px", color: "snow" }}>
                  Risk Management & Budget Planning
                </h3>
                </div> */}

        <Stepper
          styleConfig={{
            activeBgColor: "#000b73",
            completedBgColor: "#005d37",
          }}
          steps={[
            { label: "Planning" },
            { label: "Prototype Submission" },
            { label: "Implementation" },
          ]}
          activeStep={this.state.stepper}
        />

        <React.Fragment>
          <div>
            <this.Step1 currentStep={1} handleChange={this.handleChange} />
            <this.Step2
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              username={this.state.username}
            />
            <this.Step3
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              password={this.state.password}
            />

            <span>
              {" "}
              {this.previousButton()}
              {this.nextButton()}
            </span>
          </div>
        </React.Fragment>
      </div>
    );
  }
  Step1(props) {
    console.log(this.state.currentStep);
    if (this.state.currentStep != 1) {
      return null;
    }

    return (
      <div>
        <CardDeck
          className="card-display ml-5"
          style={{ width: "90%", height: "20%", minWidth: "200px" }}
        >
          <Card>
            <Card.Body style={{ backgroundColor: "#faffdd" }}>
              <Card.Text className="text-secondary">
                <center>
                  {" "}
                  Pilot Builder has briefly given all the details for developing
                  this.Read this and if you would like to proceed further or
                  reject this.
                  <br></br>
                </center>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>

        <div
          class="shadow-lg bg-white rounded ml-5"
          style={{
            width: "90%",
            heigth: "5%",
            marginTop: "2%",
            marginBottom: "5%",
            padding: "auto",
            backgroundColor: "#c0c0c0",
          }}
        >
          <div
            class="card"
            style={{
              width: "100%",
              paddingLeft: "0%",
              paddingRight: "0%",
              paddingTop: "0%",
              paddingBottom: "0%",
              border: "none",
            }}
            id="content"
            name="content"
          >
            <div class="ui inverted segment">
              <div class="ui inverted form">
                {this.state.show ? (
                  <div>
                    <div class="row">
                      <div class="card-body col-sm-6 ">
                        <div class="card">
                          <div class="card-header">
                            <strong style={{ color: "black" }}>
                              What is the estimated budget?
                              <span class="float-right">${this.state.a}</span>
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div class="card-body col-sm-6 ">
                        <div class="card">
                          <div class="card-header">
                            <strong style={{ color: "black" }}>
                              What is the estimated days required for
                              completion?
                              <span class="float-right">
                                {this.state.b} days
                              </span>
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="card-body">
                      <div class="card">
                        <div class="card-header">
                          <strong style={{ color: "black" }}>
                            Tell us briefly about the implementation
                          </strong>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title" style={{ color: "black" }}>
                            {this.state.c}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="card-body">
                      <div class="card">
                        <div class="card-header">
                          <strong style={{ color: "black" }}>
                            Tell us briefly about the Sustainability?
                          </strong>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title" style={{ color: "black" }}>
                            {this.state.d}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="card-body">
                      <div class="card">
                        <div class="card-header">
                          <strong style={{ color: "black" }}>
                            What are the risk factors faces during the
                            development and on completion of the implementation?
                          </strong>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title" style={{ color: "black" }}>
                            {this.state.e}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="card-body">
                      <div class="card">
                        <div class="card-header">
                          <strong style={{ color: "black" }}>
                            How it impacts the society?
                          </strong>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title" style={{ color: "black" }}>
                            {this.state.f}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div class="mx-auto" style={{ textAlign: "center" }}>
                    {" "}
                    Planning phase is not submitted still{" "}
                  </div>
                )}
                <br />
                {this.state.show1 ? (
                  <div>
                    <div class="inline field"></div>
                    <div>
                      <button
                        class="float-right ml-2 mr-2 btn btn-danger"
                        id="planreject"
                        onClick={() => this.planReject()}
                      >
                        Reject
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn btn-success float-right"
                        id="planaccept"
                        onClick={() => this.planAccept()}
                      >
                        Accept & Proceed further
                      </button>
                    </div>
                    &nbsp; &nbsp;
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Step2(props) {
    if (props.currentStep != 2) {
      return null;
    }
    if (this.state.stepName.length > 0) {
      var aaaa = this.state.stepName.slice(1, -1).split(",");
      var bbbb = this.state.person.slice(1, -1).split(",");
    }

    return (
      <div>
        <div
          class="shadow-lg bg-white rounded ml-5"
          style={{
            width: "90%",
            heigth: "5%",
            marginTop: "2%",
            marginBottom: "5%",
            padding: "auto",
            backgroundColor: "#c0c0c0",
          }}
        >
          <div
            class="card"
            style={{
              width: "100%",
              paddingLeft: "0%",
              paddingRight: "0%",
              paddingTop: "0%",
              paddingBottom: "0%",
              border: "none",
            }}
            id="content"
            name="content"
          >
            {this.state.show2 ? (
              <div class="ui inverted segment">
                <div class="ui inverted form">
                  <div class="card-body">
                    <div class="card">
                      <div class="card-header">
                        <strong style={{ color: "black" }}>
                          Steps involved
                        </strong>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title" style={{ color: "black" }}>
                          {console.log(aaaa)}
                          {aaaa.map((value, index) => {
                            return (
                              <li key={index}>
                                {index + 1}.{value} - {console.log(bbbb[index])}
                                {(() => {
                                  if (
                                    (bbbb[index] === "'0'") |
                                    (bbbb[index] === " '0'")
                                  ) {
                                    return (
                                      <span>
                                        This step will be done by Pilot Builder
                                      </span>
                                    );
                                  } else if (
                                    (bbbb[index] === " '1'") |
                                    (bbbb[index] === "'1'")
                                  ) {
                                    return (
                                      <span>
                                        This step be done by Pilot Implementer
                                      </span>
                                    );
                                  } else if (
                                    (bbbb[index] === " '2'") |
                                    (bbbb[index] === "'2'")
                                  ) {
                                    return (
                                      <span>
                                        This step will be done by you both
                                      </span>
                                    );
                                  } else {
                                    return <div>error</div>;
                                  }
                                })()}
                              </li>
                            );
                          })}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="card">
                      <div class="card-header">
                        <strong style={{ color: "black" }}>
                          Brief description on prototype
                        </strong>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title" style={{ color: "black" }}>
                          {this.state.Desc}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      class="btn btn-info mt-1 ml-3 "
                      href={this.state.Doc}
                    >
                      Download Prototype
                    </Button>
                  </div>
                  <br />
                  <br />
                </div>
                <div>
                  {console.log(this.state.stepper)}
                  {this.state.step2Agree ? (
                    ""
                  ) : (
                    <button
                      class="float-right ml-2 mr-2 btn btn-success"
                      id="prototypeaccept"
                      onClick={() => this.prototypeAccept()}
                    >
                      Proceed Next
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <center>This phase is not submitted still</center>
            )}
          </div>
        </div>
      </div>
    );
  }

  Step3(props) {
    if (props.currentStep != 3) {
      return null;
    }
    return (
      <div>
        <div
          class="shadow-lg bg-white rounded ml-5"
          style={{
            width: "90%",
            heigth: "5%",
            marginTop: "2%",
            marginBottom: "5%",
            padding: "auto",
            backgroundColor: "#c0c0c0",
          }}
        >
          <div
            class="card"
            style={{
              width: "100%",
              paddingLeft: "2%",
              paddingRight: "2%",
              paddingTop: "2%",
              paddingBottom: "2%",
              border: "none",
            }}
            id="content"
            name="content"
          >
            <div class="ui inverted segment" style={{ color: "black" }}>
              {this.state.step2Agree ? (
                <Testing1 id={this.state.id} />
              ) : (
                <div style={{ color: "white", textAlign: "center" }}>
                  Accept the step 2{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default prototypeTestImplementor;
