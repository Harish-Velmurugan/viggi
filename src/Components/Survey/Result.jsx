import React, { useState } from "react";
import Navbar from "../Navbar/nav";
import axios from "axios";
import Polls from "./Poll";
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      surveyID: this.props.location.state,
      ans: [],
      pblm: [],
      ques: [],
      ansArray: [],
      poll: [],
      pollArray:[]
    };
    this.ansSplit = this.ansSplit.bind(this);
  }
  //const [show, setShow] = useState(false);

  async componentDidMount() {
    await axios
      .get(
        "/sol/FetchSurveyAns/" + this.state.surveyID + "/"
      )
      .then((response) => {
        if (response.status == 200) {
          this.setState({ ans: response.data[0] });
          this.setState({ pblm: response.data[1] });
          this.setState({ ques: response.data[2] });
          this.setState({ poll: response.data[3] });
        }
      });

    this.ansSplit();
  }

  ansSplit() {
    let i;
    for (i = 0; i < this.state.ans.length; i++) {
      this.setState(
        (this.state.ansArray = this.state.ansArray.concat([
          this.state.ans[i].ans.split("'"),
        ]))
      );
    }
    
     for (i = 0; i < this.state.ques.length; i++) {
      const filteredItems = this.state.poll.filter((id) => id.questionNo == (i+1));
    
      this.setState(
        (this.state.pollArray = this.state.pollArray.concat([
          filteredItems
        ]))
      );
     }
    
  }

  render() {
    console.log(this.state.ques, this.state.ansArray,this.state.pollArray);
    return (
      <div>
        <Navbar />
        <div
          className="inner0"
          style={{
            minWidth: "300px",
            padding: "5%",
            marginTop: "90px",
            marginLeft: "5.5%",
            width: "90%",

            backgroundColor: "#f5f5f5",
          }}
        >
          {this.state.pblm[0] != undefined && (
            <div>
              <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
                {" "}
                Survey Result for {this.state.pblm[0].title}
              </h2>
              {/* <h4 style={{}}>Survey Created By : Kavin </h4> */}
              <hr />
              <br />
              <div>
                {this.state.ques.map((x, index) => (
                  <div>
                    <div className="card">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: "#dedede",
                        }}
                      >
                        <div className="card-title">
                          <h4>
                            {index+1}&nbsp;.&nbsp;{x.question}
                          </h4>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-text">
                          {(x.questionType == "SingleLine Text" ||
                            x.questionType == "MultiLine Text") && (
                            <ol>
                              {this.state.ansArray.map((y) => (
                                <li>
                                  {/* {(index % 2) == 0 ? ( */}
                                    <div>
                                      
                                      {y[index +index+ 1]}
                                    </div>
                                  {/* ) : (
                                    <div>
                                      
                                      {y[index + 2]}</div>
                                  )} */}
                                  <hr />
                                </li>
                              ))}
                            </ol>
                          )}
                          {(x.questionType == "Single Select" ||
                            x.questionType == "Multi Select") &&   
                            this.state.pollArray.length == this.state.ques.length &&
                          <Polls pollState={this.state.pollArray[x.questionNo - 1]}/>
                          
                           }                     
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Result;
