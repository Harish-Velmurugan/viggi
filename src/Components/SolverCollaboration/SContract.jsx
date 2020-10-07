import React, { Component } from "react";
import Conditions from "../CollaborateContract/conditions";
import { Button } from "react-bootstrap";
import Navbar from "../Navbar/nav";
import axios from "axios";
import PopUp from "../CollaborateContract/PopUp";

class SContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Personal: [],

      Contract: [],
      Name: [],
      agree: false,
      index: 0,
      pblm: "",
      solution: [],
      enable: true,
      count: 0,
      final: false,
      modalShow: false,
      setModalShow: false,
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
    axios
      .get(
        `/contract/SolverDescriptionView/${this.props.location.state.contractNumber}/`
      )

      .then((response) => {
        console.log(response.data);
        this.setState({ Name: response.data[2] });
        this.setState({ Contract: response.data[0] });
        this.setState({ Personal: response.data[1] });
        this.setState({ pblm: response.data[3] });
        this.setState({ solution: response.data[4] });

        for (let i = 0; i < response.data[1].length; i++) {
          console.log(response.data);
          console.log(response.data[1][i].agreed);
          if (
            response.data[1][i].username == localStorage.getItem("username")
          ) {
            this.setState({ agree: response.data[1][i].agreed });
            this.setState({ index: i });
          }
          if (!response.data[1][i].agreed) {
            this.setState({ count: this.state.count + 1 });
          }
        }

        let id = response.data[4].username;

        if (id == localStorage.getItem("username")) {
          for (let i = 0; i < response.data[1].length; i++) {
            if (id == response.data[1][i].username) {
              if (!response.data[1][i].agreed) {
                console.log(response.data[1][i].agreed + "]");
                this.setState({ enable: false });
                break;
              }
            }
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
    let name = localStorage.getItem("username");
    if (!this.state.agree) {
      await axios
        .post(
          "/contract/solveragree/" +
            name +
            "/" +
            this.props.location.state.contractNumber +
            "/"
        )
        .then((response) => {
          if (response.status == 200) {
            document.getElementById("btn" + index).style.background = "green";
            this.setState({ agree: true });
            if (this.state.count == 1) {
              this.setState({ final: true });
            }
          }
        });
    }
  }

  render() {
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
                width: "86%",
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
                    <td>
                      {this.state.Name[index].firstname}&nbsp;
                      {this.state.Name[index].lastname}
                    </td>
                    <td>{info.revenue}%-Split</td>
                    {this.state.index == index ? (
                      <td style={{ padding: "1.8%" }}>
                        {this.state.agree ? (
                          <h6 style={{ color: "green" }}>Agreed..</h6>
                        ) : !this.state.enable ? (
                          <Button
                            id={"btn" + index}
                            onClick={() => this.handleClick(index)}
                            style={{ backgroundColor: "#323754" }}
                          >
                            Agree
                          </Button>
                        ) : (
                          <div>
                            <Button
                              id={"btn" + index}
                              onClick={() => this.handleClick(index)}
                              style={{ backgroundColor: "#323754" }}
                              disabled="true"
                            >
                              Agree
                            </Button>
                            <h6 style={{ color: "red" }}>
                              Wait till all the solvers agree
                            </h6>
                          </div>
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
        {this.state.final && (
          <PopUp
            title={"Successful Collaboration"}
            desc={
              "Your collaboration is successful and start building up new solution."
            }
            redir={"/dashboard"}
            show={() => this.setState({ modalShow: false })}
            onHide={() => this.setState({ setModalShow: false })}
          />
        )}
      </div>
    );
  }
}
export default SContract;
