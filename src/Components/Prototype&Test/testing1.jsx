import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

class VerticalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: [],
      step: null,
      Iagree: "",
      Bagree: "",
      person: [],
      Bdoc: "",
      Idoc: "",
      fileName: "",
    };
    this.getSteps = this.getSteps.bind(this);
    this.implementImplementerAgree = this.implementImplementerAgree.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
  }
  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ pBuilderDoc: file, fileName: file.name });
  }

  componentDidMount() {
    axios
      .get("/prototypetest/implementSteps/" + this.props.id + "/")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.person);
        this.setState({ step: Number(res.data.step) });

        this.setState({ a: res.data.value });
        this.setState({ Iagree: res.data.Iagree });
        this.setState({ Bagree: res.data.Bagree });
        this.setState({ person: res.data.person });
        this.setState({ Bdoc: res.data.Bdoc });
        this.setState({ Idoc: res.data.Idoc });

        // console.log(json.has("video"));implementBuilderAgree
        // this.setState({ currentStep: res.data.currentStep });
        // this.setState({ stepper: res.data.stepper });
        // this.setState({ next: res.data.next });
      });
    this.implementImplementerAgree = this.implementImplementerAgree.bind(this);
    this.implementImplementerBoth = this.implementImplementerBoth.bind(this);
    this.implementImplementerAgree1 = this.implementImplementerAgree1.bind(
      this
    );
  }
  implementImplementerAgree(e) {
    e.preventDefault();
    console.log("aa");
    let formdata = new FormData();
    formdata.append("pImplementerDoc", this.state.pBuilderDoc);
    axios
      .post(
        "/prototypetest/implementImplementerAgree/" + this.props.id + "/",
        formdata
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ step: Number(res.data.step) });
      });
    document.getElementById("yesText").innerHTML = "Completed";
    document.getElementById("yes").style = "display:none";
  }
  implementImplementerAgree1() {
    console.log("aa");
    let formdata = new FormData();
    formdata.append("pImplementerDoc", this.state.pBuilderDoc);
    axios
      .post(
        "/prototypetest/implementImplementerAgree/" + this.props.id + "/",
        formdata
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ step: Number(res.data.step) });
      });
    document.getElementById("yesText").innerHTML = "Completed";
    document.getElementById("yes").style = "display:none";
  }
  implementImplementerBoth() {
    console.log("aa");
    // let formdata = new FormData();
    // formdata.append("pImplementerDoc", this.state.pBuilderDoc);
    axios
      .post("/prototypetest/implementImplementerAgree1/" + this.props.id + "/")
      .then((res) => {
        console.log(res.data);
        this.setState({ step: Number(res.data.step) });
      });
    document.getElementById("yes11").innerHTML = "Verified";
    // document.getElementById("yes").style = "display:none";
  }

  getSteps() {
    return this.state.a;
  }

  getStepContent(step) {
    if (step < 0) {
      return ``;
    } else {
      return (
        <div>
          <div class="row">
            <div class="col-sm-6">
              {(() => {
                switch (this.state.person[step]) {
                  case "0":
                    return "This step is to be done by pilot builder";
                  case "1":
                    return "This step is to be done by pilot implementer";
                  case "2":
                    return "This step is to be done by both implementer and builder";
                  default:
                    return "";
                }
              })()}
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Pilot Implementer</h5>
                  <hr />

                  {this.state.Iagree ? (
                    <span
                      class="ml-1"
                      id="yesText"
                      style={{ fontWeight: "bold" }}
                    >
                      Completed
                    </span>
                  ) : (
                    <div>
                      {(() => {
                        switch (this.state.person[step]) {
                          case "0":
                            return (
                              <div>
                                <span
                                  class="ml-1"
                                  id="yesText"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Verified?
                                </span>

                                <br />
                                <div>
                                  <button
                                    id="yes"
                                    class="btn btn-success"
                                    onClick={() =>
                                      this.implementImplementerAgree1()
                                    }
                                  >
                                    &nbsp;Yes and Continue next&nbsp;
                                  </button>
                                </div>
                              </div>
                            );
                          case "1":
                            return (
                              <div>
                                <span
                                  class="ml-1"
                                  id="yesText"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Have you completed your part? <br />
                                  Upload the document
                                </span>

                                <br />
                                <form onSubmit={this.implementImplementerAgree}>
                                  <div class="custom-file">
                                    <input
                                      type="file"
                                      class="custom-file-input"
                                      onChange={this.handleFile}
                                      required
                                    />
                                    <label class="custom-file-label" id="file">
                                      {this.state.fileName}
                                    </label>
                                  </div>

                                  <br />
                                  <button
                                    type="submit"
                                    id="yes"
                                    class="btn btn-success"
                                    // onClick={() => this.builderAgree()}
                                  >
                                    &nbsp;Upload&nbsp;
                                  </button>
                                </form>
                              </div>
                            );
                          case "2":
                            return (
                              <div>
                                {this.state.Idoc == null ? (
                                  <div>
                                    <span
                                      class="ml-1"
                                      id="yesText"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Have you completed your part? <br />
                                      Upload the document
                                    </span>
                                    <br />

                                    <div class="custom-file">
                                      <form
                                        onSubmit={
                                          this.implementImplementerAgree
                                        }
                                      >
                                        <div>
                                          <input
                                            type="file"
                                            class="custom-file-input"
                                            onChange={this.handleFile}
                                            required
                                          />
                                          <label
                                            class="custom-file-label"
                                            id="file"
                                          >
                                            {this.state.fileName}
                                          </label>

                                          <button
                                            type="submit"
                                            id="yes"
                                            class="btn btn-success mt-1"
                                            // onClick={() => this.builderAgree()}
                                          >
                                            &nbsp;Upload&nbsp;
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                ) : (
                                  "Submitted your work"
                                )}
                                <hr />
                                {this.state.Bdoc == null ? (
                                  ""
                                ) : (
                                  <div>
                                    Verify the pilot builder's document and
                                    proceed next
                                    {this.state.Idoc == null ? (
                                      <button
                                        id="yes11"
                                        class="btn btn-success"
                                        disabled="true"
                                        onClick={() =>
                                          this.implementImplementerBoth()
                                        }
                                      >
                                        &nbsp;Yes and Continue next&nbsp;
                                      </button>
                                    ) : (
                                      <button
                                        id="yes11"
                                        class="btn btn-success"
                                        onClick={() =>
                                          this.implementImplementerBoth()
                                        }
                                      >
                                        &nbsp;Yes and Continue next&nbsp;
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                        }
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <br />
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Pilot Builder</h5>
                  <hr />
                  {this.state.Bagree ? (
                    <span class="ml-1" style={{ fontWeight: "bold" }}>
                      Completed <br />
                      <Button href={this.state.Bdoc} class="btn btn-primary">
                        View Document
                      </Button>
                      <br />
                    </span>
                  ) : (
                    <span class="ml-1" style={{ fontWeight: "bold" }}>
                      {this.state.Bdoc == null &&
                      this.state.person[step] == "2" ? (
                        "Work on Progress"
                      ) : this.state.person[step] == "2" ? (
                        <Button href={this.state.Bdoc} class="btn btn-primary">
                          View Document
                        </Button>
                      ) : (
                        ""
                      )}
                      {this.state.person[step] != "2" ? "Work on Progress" : ""}

                      <br />
                    </span>
                  )}
                  <div class="btn btn-success" style={{ display: "none" }}>
                    &nbsp;Yes&nbsp;
                  </div>

                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };
  //   handleReset = () => {
  //     setActiveStep(0);
  //   };
  //   handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  render() {
    const steps = this.getSteps();
    console.log(this.state.a);
    return (
      <div>
        <Stepper activeStep={this.state.step} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                {/* <div className={classes.actionsContainer}> */}
                {/* <div> */}
                {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button> */}
                {/* </div> */}
                {/* </div> */}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {/* {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )} */}
      </div>
    );
  }
}
export default VerticalLinearStepper;
