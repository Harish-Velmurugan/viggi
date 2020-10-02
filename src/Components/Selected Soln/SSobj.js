import React from "react";
import SSlay from "../Selected Soln/SSlay";
import Navbar from "../Navbar/nav";

class SSobj extends React.Component {
  constructor() {
    super();
    this.state = {
      User: [
        
      ],
    };
    this.rejectSolution = this.rejectSolution.bind(this);
    this.addSolution = this.addSolution.bind(this);
  }

  rejectSolution(id) {
    var data = this.state.User;
    data.forEach((element) => {
      if (element.id == id) {
        element.pro = false;
      }
    });
    this.setState({ User: data });
  }

  addSolution(id) {
    var data = this.state.User;
    data.forEach((element) => {
      if (element.id == id) {
        element.pro = true;
      }
    });
    this.setState({ User: data });
  }

  render() {
    return (
      <div className="SSobj">
        <Navbar />
        <br />
        <br />
        <br />
        <div class="header" id="selected">
          <h4 style={{ fontFamily: "cavalero", paddingLeft: "35rem" }}>
            SELECTED SOLUTIONS
          </h4>
          <br />
        </div>
        {this.state.User.map((data) => {
          return data.pro ? (
            <SSlay user={data} onClick={() => this.rejectSolution(data.id)} />
          ) : (
            console.log(true)
          );
        })}
        <button
          class="btn btn-success"
          type="submit"
          style={{
            backgroundColor: "rgb(6, 179, 6)",
            float: "right",
            marginRight: "9rem",
          }}
        >
          Submit
        </button>
        <br />
        <br />
        <div class="header" id="added">
          <br />
          <h4 style={{ fontFamily: "cavalero", paddingLeft: "35rem" }}>
            OTHER SOLUTIONS
          </h4>
          <br />
          {this.state.User.map((data, index) => {
            return data.pro ? (
              console.log(true)
            ) : (
              <SSlay user={data} onClick={() => this.addSolution(data.id)} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SSobj;
