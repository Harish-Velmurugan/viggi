import React, { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { closestIndexTo } from "date-fns";
import axios from "axios";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      ques: null,
      type: null,
      dummyOption: ["", "", "", "", ""],
      SurveyQ: [""],
      SurveyType: [],
      Options: [["", "", "", "", ""]],
      surveyID: 0,
      deadLine: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeadLine = this.handleDeadLine.bind(this);
  }
  //const [show, setShow] = useState(false);
  // componentDidMount() {
  //   window.addEventListener("load", this.handleLoad());
  // }
  // async handleLoad() {

  // }
  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });
  async handleSubmit() {
    // let data2 = new FormData()
    // data2.append("deadline" , this.state.deadLine)
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    //   // 'Authorization': token
    // };
    await axios
      .post(
        "/sol/CreateSurvey/" +
          this.props.pblmID +
          "/" +
          localStorage.getItem("username") +
          "/" +
          this.state.deadLine +
          "/"
        // {
        //   headers: headers,
        // }
      )
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            surveyID: response.data.surveyID,
          });
          this.setState({ setShow: false });
          for (let i = 0; i < this.state.SurveyQ.length; i++) {
            let data = new FormData();
            data.append("questionNo", i + 1);
            data.append("survey", response.data.surveyID);

            data.append("question", this.state.SurveyQ[i]);
            if (this.state.SurveyType[i] == undefined) {
              data.append("questionType ", "SingleLine Text");
            } else {
              data.append("questionType ", this.state.SurveyType[i]);
            }
            const headers = {
              "Content-Type": "multipart/form-data",
              // 'Authorization': token
            };
            axios
              .post("/sol/SurveyQues/", data, {
                headers: headers,
              })
              .then((response) => {
                this.setState({});
                console.log(response.data);
              });

            for (let j = 0; j < this.state.Options[i].length - 1; j++) {
              if (this.state.Options[i][j] != "") {
                let data1 = new FormData();
                data1.append("questionNo", i + 1);
                data1.append("survey", response.data.surveyID);
                data1.append("option", this.state.Options[i][j]);
                const headers = {
                  "Content-Type": "multipart/form-data",
                  // 'Authorization': token
                };
                axios
                  .post("/sol/Choice/", data1, {
                    headers: headers,
                  })
                  .then((response) => {
                    this.setState({});
                    console.log(response.data);
                  });
              }
            }
          }
        }
      });
  }
  handleDeadLine(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      deadLine: value,
    });
  }
  handleChange(e, index, outerIndex) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let ques;
    if (name == "SurveyQ") {
      ques = this.state.SurveyQ.slice();
      ques[index] = value;
    } else if (name == "SurveyType") {
      ques = this.state.SurveyType.slice();
      ques[index] = value;
    } else if (name == "Options") {
      ques = this.state.Options.slice();
      ques[outerIndex][index] = value;
    }

    this.setState({
      [name]: ques,
    });
  }
  handleClick() {
    let ques = this.state.SurveyQ.slice();
    console.log(ques.length);
    ques[ques.length] = "";
    this.setState({
      SurveyQ: ques,
    });
    let options = this.state.Options.slice();
    console.log(options.length);
    options[options.length] = ["", "", "", "", ""];
    this.setState({
      Options: options,
    });
  }
  render() {
    console.log(this.state.Options[0]);

    return (
      <>
        <Button
          variant="primary"
          onClick={this.handleShow}
          style={{
            marginLeft: "3px",
          }}
        >
          Create Survey
        </Button>

        <Modal size="lg" show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#ececec",
              fontWeight: "bolder",
            }}
          >
            <Modal.Title>Create Survey</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="card"
              style={{
                backgroundColor: "",
                color: "white",
              }}
            >
              <div
                className="card-header"
                style={{
                  backgroundColor: "#22263d",
                }}
              >
                Add New Questions
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-2">
                        <label
                          htmlFor="deadline"
                          style={{ color: "black", marginTop: "3px" }}
                        >
                          End Survey At
                        </label>
                      </div>
                      <div className="col">
                        <input
                          type="date"
                          required
                          className="form-control"
                          placeholder="Survey Ends At"
                          style={{ width: "60%" }}
                          id="deadline"
                          name="deadline"
                          onChange={this.handleDeadLine}
                        />
                      </div>
                    </div>

                    <br />

                    <div>
                      {this.state.SurveyQ.map((x, index) => {
                        let outerIndex = index;
                        return (
                          <div>
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text>{index + 1}</InputGroup.Text>
                              </InputGroup.Prepend>
                              <input
                                type="text"
                                className="form-control"
                                id={"Q" + index}
                                value={this.state.SurveyQ[index]}
                                name="SurveyQ"
                                onChange={(e) => this.handleChange(e, index)}
                              />
                              <InputGroup.Append>
                                <label htmlFor="type"></label>
                                <select
                                  style={{
                                    width: "100%",
                                    float: "right",
                                    backgroundColor: "#dedede",
                                  }}
                                  id="type"
                                  required
                                  className="form-control"
                                  name="SurveyType"
                                  onChange={(e) => this.handleChange(e, index)}
                                >
                                  {/* {<option selected>{this.state.gender}</option>} */}
                                  <option>SingleLine Text</option>
                                  <option>MultiLine Text</option>
                                  <option>Single Select</option>
                                  <option>Multi Select</option>
                                </select>
                              </InputGroup.Append>
                            </InputGroup>

                            {(this.state.SurveyType[index] == "Single Select" ||
                              this.state.SurveyType[index] ==
                                "Multi Select") && (
                              <div>
                                <label
                                  style={{
                                    marginTop: "1.5%",
                                  }}
                                >
                                  Options
                                </label>
                                <InputGroup>
                                  {this.state.dummyOption.map((x, index) => (
                                    <input
                                      required
                                      type="text"
                                      className="form-control"
                                      id={"Q" + index}
                                      value={
                                        this.state.Options[outerIndex][index]
                                      }
                                      name={"Options"}
                                      onChange={(e) =>
                                        this.handleChange(e, index, outerIndex)
                                      }
                                      style={{
                                        marginLeft: "1.5%",
                                        marginRight: "1.5%",
                                      }}
                                    />
                                  ))}
                                </InputGroup>
                              </div>
                            )}
                            <br />
                          </div>
                        );
                      })}
                    </div>
                    <Button
                      style={{ float: "right" }}
                      onClick={this.handleClick}
                    >
                      + Add Question
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default Create;
