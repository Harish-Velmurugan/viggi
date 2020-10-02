import React, { Component } from "react";
import Conditions from "./conditions";
import { Button } from "react-bootstrap";
import Navbar from "../Navbar/nav";
import axios from "axios";

class SContractLay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Personal: [
        // {
        //     Name : "Alex Simon",
        //     Revenue : "60% - Split",
        //     Agree:false
        // },
        // {
        //     Name : "Natasha",
        //     Revenue : "20% - Split",
        //     Agree:false
        // },
        // {
        //     Name : "Alex Simon",
        //     Revenue : "20% - Split",
        //     Agree:false
        // }
      ],

      Contract: [],
      Name: [],
      agree: false,
      index: 0,
      pblm: "",
    };
  }
  async componentDidMount() {
    window.addEventListener("load", this.handleLoad());
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad());
  }
  // get contract number and problem id
  async handleLoad() {
    console.log(this.props.location.state);
    axios
      .get(`/contract/view-description/${this.props.location.state}/`)

      .then((response) => {
        this.setState({ Name: response.data[2] });
        this.setState({ Contract: response.data[0] });
        this.setState({ Personal: response.data[1] });
        this.setState({ pblm: response.data[3] });
        for (let i = 0; i < response.data[1].length; i++) {
          if (
            response.data[1][i].username == localStorage.getItem("username")
          ) {
            console.log(response.data[1][i].agreed);
            this.setState({ agree: response.data[1][i].agreed });
            this.setState({ index: i });
          }
        }
        //    const info = this.state.Info
        //    info.map(
        //        info => {this.setState({info:response.data[0]})}
        //    )
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //post
  async handleClick(index) {
    console.log(this.state.Contract, this.state.Name);
    let name = localStorage.getItem("username");
    console.log(this.state.agree);
    if (!this.state.agree) {
      await axios
        .post(
          "/contract/agree/" +
            name +
            "/" +
            this.state.Contract.contractNumber +
            "/"
        )
        .then((response) => {
          console.log(this.state.agree);
          if (response.status == 200) {
            console.log("hello");
            document.getElementById("btn" + index).style.background = "green";
            this.setState({ agree: true });
          }
        });
    }
  }

  render() {
    console.log(this.state.Name);
    const personal = this.state.Personal;
    return (
      <div>
        <Navbar />
        <div
          className="inner0"
          style={{
            minWidth: "320px",
            padding: "2.7%",
            marginTop: "10%",
            marginLeft: "6%",
            width: "89%",
            backgroundColor: "white",
          }}
        >
          <br />
          <h3 style={{ textAlign: "center" }}>
            Collaboration Solver-Solver Smart Contract
          </h3>
          <hr />
          <br />

          <div>
            <h1 className="contract-watermark">Vignatree</h1>
            <Conditions pblm={this.state.pblm} />
          </div>
          <div>
            <table
              border="1"
              style={{
                marginTop: "3%",
                width: "89%",
                marginLeft: "5%",
                textAlign: "center",
              }}
            >
              <thead style={{ backgroundColor: "#323754", color: "white" }}>
                <tr>
                  <th>Solver</th>
                  <th>Revenue Split</th>
                  <th>Agree</th>
                </tr>
              </thead>
              <tbody>
                {personal.map((info, index) => (
                  <tr>
                    <td style={{ overflow: "hidden" }}>
                      {this.state.Name[index].firstname}&nbsp;
                      {this.state.Name[index].lastname}
                    </td>
                    <td>{info.revenue}%-Split</td>
                    {this.state.index == index ? (
                      <td style={{ padding: "1.8%" }}>
                        {this.state.agree ? (
                          <h6 style={{ color: "green" }}>Agreed..</h6>
                        ) : (
                          <Button
                            id={"btn" + index}
                            onClick={() => this.handleClick(index)}
                            style={{ backgroundColor: "#323754" }}
                          >
                            Agree
                          </Button>
                        )}
                      </td>
                    ) : (
                      <td style={{ padding: "1.8%" }}>
                        {personal[index].agreed ? (
                          <h6 style={{ color: "green" }}>Agreed..</h6>
                        ) : (
                          <h6 style={{ color: "red" }}>Not yet Agreed..</h6>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default SContractLay;
