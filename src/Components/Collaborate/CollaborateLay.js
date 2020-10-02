import React, { Component } from "react";
import "../Abstract/Abstract.css";
import "./Collaborate.css";
import { Link } from "react-router-dom";
import CollabCards from "./CollabCard";
import { Button } from "react-bootstrap";
import Navbar from "../Navbar/nav";

class CollaborateLay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected:this.handleClick2(),
      absParam: props.location.state.absParam,
      allData: props.location.state.allData,
      problemId: props.location.state.problemId,
      selectedID: [],
    };
    this.state.selectedID.push(this.state.absParam);
  }

  handleClick1 = (all) => {
    document
      .getElementById("CollDiv1")
      .appendChild(document.getElementById(all.solutionId));
    document.getElementById("add" + all.solutionId).style.color = "white";
    this.state.selectedID.push(all);
  };

  handleClick2 = (all) => {
    document
      .getElementById("CollDiv2")
      .appendChild(document.getElementById(all.solutionId));
    document.getElementById("add" + all.solutionId).style.color = "green";
    const filteredItems = this.state.selectedID.filter((id) => id != all);
    this.setState({ selectedID: filteredItems });
  };

  render() {
    const allData = this.state.allData;
    return (
      <div>
        <Navbar />
        <section>
          <div className="outerDiv" id="CollDiv1">
            <div class="diagonal1">Collaborated</div>
            {allData.map((all) => (
              <div>
                {this.state.absParam.solutionId == all.solutionId && (
                  <CollabCards
                    collData={all}
                    allData={this.state.allData}
                    add="white"
                    click1={() => this.handleClick1(all)}
                    click2={() => this.handleClick2(all)}
                  />
                )}
              </div>
            ))}
          </div>
          <Link
            to={{
              pathname: "/seekerRevenueSplit",
              state: {
                selectedID: this.state.selectedID,
                absParam: this.state.absParam,
                problemId: this.state.problemId,
              },
            }}
          >
            <Button
              style={{
                float: "right",
                marginTop: "1%",
                marginRight: "6%",
                backgroundColor: "green",
              }}
            >
              Submit
            </Button>
          </Link>

          <div
            id="CollDiv2"
            style={{
              marginTop: "5%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              width: "94%",
            }}
          >
            {allData.map((all) => (
              <div>
                {this.state.absParam.solutionId != all.solutionId &&
                all.agreed ? (
                  <CollabCards
                    collData={all}
                    allData={this.state.allData}
                    add="green"
                    click1={() => this.handleClick1(all)}
                    click2={() => this.handleClick2(all)}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default CollaborateLay;
//
