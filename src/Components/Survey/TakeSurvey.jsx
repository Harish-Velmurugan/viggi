import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
class TakeSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      ans: [],
      choice: [],
      surveyID: props.surveyID,
      questions: [],
      singleSel: [],
      ansChoice: [],
      temp: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSingleSelect = this.handleSingleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setChoice = this.setChoice.bind(this);
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });
  componentDidMount() {
    window.addEventListener("load", this.handleLoad());
  }
  async handleLoad() {
    await axios
      .get("/sol/TakeSurvey/" + this.state.surveyID + "/")
      .then((response) => {
        this.setState({
          questions: response.data[0],
          //tempChoice : response.data[0].choice.split(',')
        });
      });
    this.setChoice();
  }
  async setChoice() {
    let i;
    for (i = 0; i < this.state.questions.length; i++) {
      let sel = this.state.singleSel.slice();
      let answ = this.state.ans.slice();
      answ[i] = "";
      sel[i] = [];
      //ans[outerIndex][index] = value;
      this.setState({
        ans: answ,
        singleSel: sel,
      });

      await axios
        .get(
          "/sol/getChoice/" +
            this.state.surveyID +
            "/" +
            (i + 1) +
            "/"
        )
        .then((response) => {
          this.setState(
            (this.state.choice = this.state.choice.concat(response.data[0]))
            //tempChoice : response.data[0].choice.split(',')
          );
        });
    }
  }
  handleSingleSelect(e, index) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let ans = this.state.singleSel.slice();
    ans[index] = [value];
    //ans[outerIndex][index] = value;
    this.setState({
      [name]: ans,
    });
  }
  
  async handleSubmit() {
    this.setState({ setShow: false });
    let data = new FormData();
    data.append("survey", this.state.surveyID);

    data.append("name ", localStorage.getItem("username"));

    let str = "";
    let qtype="";
    for (let i = 0; i < this.state.ans.length - 1; i++) {
      qtype = qtype +this.state.questions[i].questionType+","
      if (this.state.ans[i] == "") {
        str = str + "None" + ",";
      } else {
        str = str + this.state.ans[i] + ",";
      }
    }
    qtype = qtype +this.state.questions[this.state.ans.length - 1].questionType+","
    if (this.state.ans[this.state.ans.length - 1] == "") {
      str = str + "None" + ",";
    } else {
      str = str + this.state.ans[this.state.ans.length - 1];
    }
    console.log(str);
    data.append("ans", str);
    data.append("questionType",qtype);
    const headers = {
      "Content-Type": "multipart/form-data",
      // 'Authorization': token
    };

    await axios
      .post("/sol/SurveyAns/", data, {
        headers: headers,
      })
      .then((response) => {
        if (response.status == 200) {
          this.setState({});
          console.log(response.data);
        }
      });

      
      console.log("seinn", this.state.singleSel)

    for (let i = 0; i < this.state.singleSel.length; i++) {
      if (this.state.singleSel[i].length > 0) {
         for(let j=0 ; j < this.state.singleSel[i].length; j++){
          console.log(this.state.surveyID, this.state.questions[i].questionNo,this.state.singleSel[i][j])
           if(this.state.singleSel[i][j] != ''){

        await axios
          .post("/sol/count/"+this.state.surveyID+"/"+this.state.questions[i].questionNo+"/"+this.state.singleSel[i][j]+"/")
          .then((response) => {
            if (response.status == 200) {
              console.log(response.data);

            }
          });
        }
        }
      }
    }
    this.handleLoad()
    this.setState({
      singleSel:[], choice:[], ans:[]
    })
  }

  handleChange(e, index) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let ans = this.state.ans.slice();
    ans[index] = value;
    //ans[outerIndex][index] = value;
    this.setState({
      [name]: ans,
    });
  }

  handleSelect(e, index,outerIndex) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    let ans = this.state.singleSel.slice(); 
    console.log("checked",target.checked, index, outerIndex) 
    console.log("mm",ans[index][outerIndex])
    // if(ans[index][outerIndex] != undefined){ 
    if (target.checked) { 
      ans[index].push(value)
     
     
    } else if (!target.checked) {
      let a =ans[index].indexOf(value)
      ans[index][a] ="";
    }
  // }
    console.log("ans",ans)
    this.setState({
      [name]: ans,
    });

  }
    
  render() {
    
    return (
      <div>
        <Button
          variant="warning"
          onClick={this.handleShow}
          style={{
            marginLeft: "3px",
            fontWeight: "bolder",
          }}
        >
          Take Survey
        </Button>

        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header
            style={{
              backgroundColor: "#ececec",
              fontWeight: "bolder",
            }}
            closeButton
          >
            <Modal.Title>Take Survey</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#dedede",
            }}
          >
            <Form>
              {this.state.questions.map((x, index) => (
                <div className="card">
                  <div className="card-body">
                    {index + 1 + ". " + x.question}
                    <br />
                    <br />
                    <Form>
                      {x.questionType == "SingleLine Text" && (
                        <input
                          required
                          type="text"
                          className="form-control"
                          id={"Q" + index}
                          value={this.state.ans[index]}
                          name={"ans"}
                          onChange={(e) => this.handleChange(e, index)}
                          maxLength="50"
                        />
                      )}
                      {x.questionType == "MultiLine Text" && (
                        <textarea
                          required
                          rows={3}
                          className="form-control"
                          id={"Q" + index}
                          value={this.state.ans[index]}
                          name={"ans"}
                          onChange={(e) => this.handleChange(e, index)}
                          maxLength="200"
                        />
                      )}
                      {x.questionType == "Single Select" && (
                        <Form>
                          {this.state.choice.map((y) => (
                            <>
                              {y.questionNo == x.questionNo && (
                                <Form.Check
                                  inline
                                  label={y.option}
                                  type="radio"
                                  name="singleSel"
                                  value={y.option}
                                  id={index}
                                  onChange={(e) =>
                                    this.handleSingleSelect(e, index)
                                  }
                                />
                              )}
                            </>
                          ))}
                        </Form>
                      )}
                      {x.questionType == "Multi Select" && (
                        <Form>
                          {this.state.choice.map((y,outerIndex) => (
                            <>
                              {y.questionNo == x.questionNo && (
                                <Form.Check
                                  inline
                                  label={y.option}
                                  type="checkbox"
                                  name="singleSel"
                                  value={y.option}
                                  id={index}
                                  onChange={(e) => this.handleSelect(e, index,outerIndex)}
                                />
                              )}
                            </>
                          ))}
                        </Form>
                      )}
                    </Form>
                  </div>
                </div>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#ececec",
            }}
          >
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default TakeSurvey;
