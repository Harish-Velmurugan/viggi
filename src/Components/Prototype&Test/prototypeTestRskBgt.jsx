import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import A from "./a.jpg";
import { Card, Button, CardDeck, Modal, InputGroup } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
// import update from "react-addons-update";
import Testing from "../Prototype&Test/testing";

import { Stepper as Steppernew } from "@material-ui/core";

class prototypeTestRskBgt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      stepper: 0,
      process: [""],
      dataArr: [],
      dataArr1: [],
      id: this.props.location.state.query,
      next: "",
      budget: "",
      time: "",
      desc: "",
      sustainability: "",
      risk: "",
      ios: "",
      msg: "",
      msg1: "",
      prototypeSubmissionSteps: "",
      prototypeSubmissionPerson: "",
      prototypeDesc: "",
      prototypeDoc: "",
      prototypeDocName: "",
      prototypeEdit: false,
    };

    this.next = this.next.bind(this);

    this.Step1 = this.Step1.bind(this);
    this.Step2 = this.Step2.bind(this);
    this.Step3 = this.Step3.bind(this);
    this.planning = this.planning.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.prototypeSubmission = this.prototypeSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    console.log(this.state.next);
  }
  next() {
    // window.location = "/dashboard/solPrototypeInitial";
  }

  // handleChange(e) {
  //   let name = e.target.name + "";
  //   let i = parseInt(name.substring(8, 9));
  //   let b = process;
  //   b[i] = e.target.value + "";
  // this.setState({
  //   dataArr: update(this.state.dataArr, {
  //     0: { $set: e },
  //   }),
  // });

  // handleChange = (dataArr) => {
  //   let name = dataArr.target.name + "";
  //   let i = parseInt(name.substring(8, 9));
  //   let b = process;
  //   b[i] = dataArr.target.value + "";

  //   this.setState({
  //     dataArr: [...this.state.dataArr, dataArr.target.value],
  //   });
  //   console.log(this.state.dataArr);
  // };

  handleFile(e) {
    let file = e.target.files[0];
    console.log(file.name);
    this.setState({ prototypeDoc: file, prototypeDocName: file.name });
  }

  prototypeSubmission(e) {
    // if(!)
    // {

    // }
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("prototypeTestId", Number(this.state.id));
    formdata.append("prototypeDesc", this.state.prototypeDesc);
    formdata.append("prototypeDoc", this.state.prototypeDoc);
    formdata.append("steps", "");
    for (var i = 0; i < this.state.prototypeSubmissionSteps.length; i++) {
      formdata.append(
        "list[" + i + "]",
        this.state.prototypeSubmissionSteps[i]
      );
    }

    console.log(this.state.prototypeSubmissionPerson + "==============");
    for (var i = 0; i < this.state.prototypeSubmissionPerson.length; i++) {
      formdata.append(
        "list1[" + i + "]",
        this.state.prototypeSubmissionPerson[i]
      );
    }
    axios.post("/prototypetest/prototypeSubmission/", formdata).then((res) => {
      console.log(res.data);
      this.setState({ msg1: res.data.value });
      if (res.data.value == "(Submitted & waiting for approval)") {
        document.getElementById("prototypeSubmit").disabled = "true";
      }
    });
  }
  componentDidMount() {
    axios
      .get("/prototypetest/Stage/" + this.props.location.state.query + "/")
      .then((res) => {
        console.log("state" in res.data);
        if ("state" in res.data) {
          this.setState({
            budget: res.data.state.budget,
            time: res.data.state.time,
            desc: res.data.state.desc,
            sustainability: res.data.state.sustainability,
            risk: res.data.state.risk,
            ios: res.data.state.ios,
            msg: res.data.msg,
          });
          console.log(res.data.msg);

          // document.getElementById("planSubmit").innerHTML = "true";
        }
        if ("state1" in res.data) {
          this.setState({
            prototypeDesc: res.data.state1.prototypeDesc,
            prototypeDoc: res.data.state1.prototypeDoc,
            dataArr: res.data.state1.steps,
            msg1: res.data.msg1,
            prototypeEdit: true,
          });
        }
        // console.log(json.has("video"));
        this.setState({ currentStep: res.data.currentStep });
        this.setState({ stepper: res.data.stepper });
        this.setState({ next: res.data.next });
      });
  }

  handleChange1(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
    console.log(value);
  }
  handleChange(e, i) {
    const { name, value } = e.target;
    let dataArr = [...this.state.dataArr];
    dataArr[i] = { ...dataArr[i], [name]: value };
    this.setState({ dataArr });

    let bb = dataArr.length;
    let a = [];
    for (var i = 0; i < bb; i++) {
      a.push(dataArr[i]["process[" + i + "]"]);
    }
    this.setState({ prototypeSubmissionSteps: a });
    console.log(typeof this.state.prototypeSubmissionSteps);

    console.log(this.state.dataArr);
  }

  handleChange2(e, i) {
    const { name, value } = e.target;
    let dataArr1 = [...this.state.dataArr1];
    dataArr1[i] = { ...dataArr1[i], [name]: value };
    this.setState({ dataArr1 });

    let bbb = dataArr1.length;
    console.log(bbb);
    let b = [];
    for (var i = 0; i < bbb; i++) {
      b.push(dataArr1[i][i]);
    }
    this.setState({ prototypeSubmissionPerson: b });
    // console.log(b);

    console.log(this.state.prototypeSubmissionPerson);
  }

  // console.log(name.substring(8, 9));
  // }

  planning = () => {
    let formdata = new FormData();
    formdata.append("prototypeTestId", Number(this.state.id));
    formdata.append("budget", Number(this.state.budget));
    formdata.append("time", this.state.time);
    formdata.append("desc", this.state.desc);
    formdata.append("sustainability", this.state.sustainability);
    formdata.append("risk", this.state.risk);
    formdata.append("ios", this.state.ios);

    axios.post("/prototypetest/planningPhase/", formdata).then((res) => {
      console.log(res.data);

      this.setState({ msg: res.data.value });
      if (res.data.value == "(Submitted & waiting for approval)") {
        // document.getElementById("planSubmit").disabled = "true";
        this.setState({ msg: res.data.value });
      }
    });
  };

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
          {this.state.next != "false" ? (
            <button
              className="btn btn-primary  mt-1"
              style={{ marginLeft: "78%" }}
              type="button"
              onClick={this._next}
            >
              &nbsp;&nbsp;Next &gt;&nbsp;&nbsp;
            </button>
          ) : (
            <button
              className="btn btn-primary  mt-1"
              style={{ marginLeft: "78%" }}
              type="button"
              disabled="true"
              // onClick={this._next}
            >
              &nbsp;&nbsp;Next &gt;&nbsp;&nbsp;
            </button>
          )}
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
    // console.log(this.state.dataArr);
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
            {/* 
                        render the form steps and pass required props in
                    */}
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
              {/* {this.previousButton()} */}
              {/* {this.nextButton()} */}
            </span>
          </div>
        </React.Fragment>
      </div>
    );
  }
  Step1(props) {
    // console.log(this.state.currentStep);
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
                  You need to explain about the risk management and the budget
                  planning that are required to implement your solution{" "}
                  <br></br>
                  Briefly explain about all the factors.
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
                <div class="two fields">
                  <div class="field">
                    <label>What is the estimated budget?</label>
                    <input
                      placeholder="Estimate the budget in dollars"
                      type="number"
                      name="budget"
                      min="0"
                      max="1000000"
                      value={this.state.budget}
                      onChange={(e) => this.handleChange1(e)}
                    />
                  </div>
                  <div class="field">
                    <label>
                      What is the estimated days required for completion?
                    </label>
                    <input
                      placeholder="Estimated days required for completion"
                      type="number"
                      name="time"
                      min="0"
                      max="180"
                      value={this.state.time}
                      onChange={(e) => this.handleChange1(e)}
                    />
                  </div>
                </div>
                <br />
                <div class="ui form">
                  <div class="field">
                    <label>Tell us briefly about the implementation</label>
                    <textarea
                      rows="5"
                      placeholder="Brief about budget and the no of resourse person required"
                      name="desc"
                      value={this.state.desc}
                      onChange={(e) => this.handleChange1(e)}
                    ></textarea>
                  </div>
                </div>
                <br />
                <div class="ui form">
                  <div class="field">
                    <label>Tell us briefly about the Sustainability</label>
                    <textarea
                      placeholder="Desribe about the sustainability management of this solution"
                      name="sustainability"
                      value={this.state.sustainability}
                      onChange={(e) => this.handleChange1(e)}
                    ></textarea>
                  </div>
                </div>
                <br />
                <div class="ui form">
                  <div class="field">
                    <label>
                      What are the risk factors faces during the development and
                      on completion of the implementation?
                    </label>
                    <textarea
                      name="risk"
                      value={this.state.risk}
                      placeholder="Desribe about the risk factors and how to manage that while and after the impletation of the solution "
                      onChange={(e) => this.handleChange1(e)}
                    ></textarea>
                  </div>
                </div>
                <br />
                <div class="ui form">
                  <div class="field">
                    <label>How it impacts the society?</label>
                    <textarea
                      rows="2"
                      name="ios"
                      value={this.state.ios}
                      placeholder="Desribe about the impact on the society once this is implemented "
                      onChange={(e) => this.handleChange1(e)}
                    ></textarea>
                  </div>
                </div>

                <div class="inline field">
                  <div class="ui checkbox">
                    {/* <input type="checkbox" tabindex="0" class="hidden"/>
        <label>I agree to the terms and conditions</label> */}
                  </div>
                </div>
                <div>
                  {this.state.msg == "(Submitted & waiting for approval)" ? (
                    ""
                  ) : (
                    <button
                      id="planSubmit"
                      class="ui submit button float-right"
                      onClick={() => this.planning()}
                    >
                      Submit
                    </button>
                  )}
                </div>
                <br />
                <br />
              </div>
              <div class="float-right mr-3">{this.state.msg}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Step2(props) {
    if (this.state.prototypeEdit) {
      const items = [];
      var aaaa = this.state.dataArr.slice(1, -1).split(",");
    }

    if (props.currentStep != 2) {
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
                <form onSubmit={this.prototypeSubmission}>
                  <div class="form-field">
                    <div class="field">
                      <label>Steps involved in Developing</label>

                      {this.state.prototypeEdit ? (
                        <div class="card-body">
                          <div class="card">
                            {/* <div class="card-header"> */}
                            {/* <strong style={{ color: "black" }}>Risk</strong> */}
                            {/* </div> */}
                            {console.log(aaaa[0])}
                            <div class="card-body">
                              <h5 class="card-title" style={{ color: "black" }}>
                                {aaaa.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      {index + 1}.{value}
                                      
                                    </li>
                                  );
                                })}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ) : (
                        this.state.process &&
                        this.state.process.map((e, i) => {
                          return (
                            <span>
                              <span class="input-group-prepend">
                                <span
                                  class="input-group-text mt-1"
                                  id="validationTooltipUsernamePrepend"
                                  style={{ height: "95%" }}
                                >
                                  {i + 1}
                                </span>
                                <input
                                  className="form-control ml-2"
                                  placeholder="Enter the process name"
                                  class="mb-2"
                                  type="text"
                                  name={`process[${i}]`}
                                  id="dataArr"
                                  // value={this.state.process[i]}
                                  onKeyDown={(evt) =>
                                    evt.key === "," && evt.preventDefault()
                                  }
                                  onChange={(e) => this.handleChange(e, i)}
                                  // onChange={(data) =>
                                  //   this.setState({
                                  //     dataArr: update(this.state.dataArr, {
                                  //       i: { $push: data.target.value },
                                  //     }),
                                  //   })
                                  // }
                                />
                              </span>
                              <br />
                              Work Will be done by ? &nbsp;
                              <span class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name={i}
                                  id={i}
                                  value="0"
                                  required
                                  onChange={(e) => this.handleChange2(e, i)}
                                />
                                <label
                                  class="form-check-label"
                                  for="gridRadios1"
                                >
                                  Pilot Builder
                                </label>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name={i}
                                  id={i}
                                  value="1"
                                  onChange={(e) => this.handleChange2(e, i)}
                                />
                                <label
                                  class="form-check-label"
                                  for="gridRadios2"
                                >
                                  Pilot Implementor
                                </label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name={i}
                                  id={i}
                                  value="2"
                                  onChange={(e) => this.handleChange2(e, i)}
                                />
                                <label
                                  class="form-check-label"
                                  for="gridRadios3"
                                >
                                  Both
                                </label>
                              </span>
                              <br />
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                  <br />

                  {this.state.prototypeEdit ? (
                    ""
                  ) : (
                    <Button
                      style={{ float: "right" }}
                      onClick={() =>
                        this.setState((prevState) => ({
                          process: [...prevState.process, ""],
                        }))
                      }
                    >
                      + Add Process
                    </Button>
                  )}
                  <br />
                  <br />
                  <br />
                  <br />

                  <div class="ui form">
                    <div class="field">
                      <label>Describe about Prototype</label>
                      <textarea
                        rows="2"
                        name="prototypeDesc"
                        value={this.state.prototypeDesc}
                        placeholder="Describe about the prototype in few words"
                        onChange={(e) => this.handleChange1(e)}
                      ></textarea>
                    </div>
                  </div>
                  <br />

                  <label>Upload Document for Prototype</label>
                  <br />
                  {this.state.prototypeEdit ? (
                    <Button
                      // style={{ float: "right" }}
                      href={this.state.prototypeDoc}
                    >
                      Prototype Document
                    </Button>
                  ) : (
                    <div class="custom-file">
                      <input
                        type="file"
                        name="prototypeDoc"
                        class="custom-file-input"
                        style={{ color: "black" }}
                        onChange={this.handleFile}
                      />
                      <label
                        class="custom-file-label"
                        style={{ color: "black" }}
                        id="file"
                      >
                        {this.state.prototypeDocName}
                      </label>
                    </div>
                  )}
                  <div>
                    {/* 
(Submitted & waiting for approval) */}
                    {this.state.msg1 ==
                    "(Submitted & waitin  g for approval)" ? (
                      ""
                    ) : (
                      <button
                        id="prototypeSubmit"
                        class="ui submit mt-5 button float-right"
                        type="sumbit"
                        // onClick={() => this.prototypeSubmission()}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <br />
              <br />
              <br />
              <div class="float-right mr-3">{this.state.msg1}</div>
            </div>
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
              <Testing id={this.state.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default prototypeTestRskBgt;
