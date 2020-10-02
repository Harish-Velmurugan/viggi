import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Top.css";
import Navbar from "../Navbar/nav";
import axios from "axios";

class SolversNav1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: [],
      professional: [],
      profile: [],
      specialization1: " ",
      nationality: " ",
    };
    // this.domainSearch=this.domainSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({ specialization1: value });
  }
  handleChange1(e) {
    let target = e.target;
    let value = target.value;
    this.setState({ nationality: value });
  }

  componentDidMount() {
    // window.addEventListener('load', this.handleLoad);

    var username = localStorage.getItem("username");
    var url = "";
    if (
      this.props.location.state.query1 == " " ||
      (this.props.location.state.query1 == "-----------------------------" &&
        this.props.location.state.query != "-----------------------------")
    ) {
      url =
        "/dashboard/domainSearch/" + this.props.location.state.query + "/null/";
    } else if (
      this.props.location.state.query == " " ||
      (this.props.location.state.query == "-----------------------------" &&
        this.props.location.state.query1 != "-----------------------------")
    ) {
      url =
        "/dashboard/domainSearch/null/" +
        this.props.location.state.query1 +
        "/";
    } else if (
      this.props.location.state.query == "-----------------------------" &&
      this.props.location.state.query1 == "-----------------------------"
    ) {
      url = `/dashboard/toprankerNav/${Number(username)}/`;
    } else {
      url =
        "/dashboard/domainSearch/" +
        this.props.location.state.query +
        "/" +
        this.props.location.state.query1 +
        "/";
    }
    this.setState({ specialization1: this.props.location.state.query });
    this.setState({ nationality: this.props.location.state.query1 });
    console.log(this.props.location.state.query);
    console.log(this.props.location.state.query1);
    console.log(url);
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({ professional: response.data[2] });
      this.setState({ personal: response.data[1] });
      this.setState({ profile: response.data[0] });
    });
  }
  handleLoad = () => {};

  render() {
    // var pro = this.state.professional
    // var prof = this.state.profile
    // var problem = this.state.problem
    // var per = this.state.personal
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <div
          className="card p-2"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <h2>LEADER BOARD</h2>
        </div>

        <div className=" row">
          <div
            className="col-6 col-md-3 "
            style={{ marginTop: "0rem", marginLeft: "3rem" }}
          >
            <div></div>

            <div className="card" style={{ marginLeft: "" }}>
              <div
                className="card-header text-white "
                style={{ backgroundColor: "#323754" }}
              >
                Filter by
              </div>
              <div
                className="card-body"
                style={{ paddingLeft: "14pt", alignItems: "centre" }}
              >
                <div className="">
                  <label htmlFor="specialization">Domains</label>
                  <select
                    id="specialization"
                    className="form-control"
                    name="specialization1"
                    onChange={this.handleChange}
                  >
                    <option selected>{this.state.specialization1}</option>
                    <option>-----------------------------</option>
                    <option>CS - Computer Theory</option>
                    <option>Algorithms </option>
                    <option>Cryptography</option>
                    <option>CS - Distributed Computing</option>
                    <option>CS - Cloud Computing </option>
                    <option>CS - Computational Learning </option>
                    <option>ComputerVision </option>
                    <option>CS - Big Data </option>
                    <option>CS - Neural Networks</option>
                    <option>AE - Fluid Dynamics</option>
                    <option>AE - Materials sciences</option>
                    <option>AE - Structural Analysis</option>
                    <option>Propulsion</option>
                    <option>AE - Automatic Control and Guidance</option>
                    <option>
                      AE - Aircraft Performance and Aircraft Structures
                    </option>
                    <option>EE - Power</option>
                    <option>EE - Electronics</option>
                    <option>EE - Microelectronics and nanoelectronics</option>
                    <option>EE - Signal processing</option>
                    <option>EE - Telecommunications</option>
                    <option>EE - Instrumentation</option>
                    <option>EE - Computers</option>
                    <option>CI - Geotechnical Engineering</option>
                    <option>CI - Structural Engineering</option>
                    <option>CI - Transport Engineering</option>
                    <option>CI - Environmental Engineering</option>
                    <option>CI - Urban and Community Planning</option>
                  </select>
                </div>

                <div className="">
                  <label htmlFor="nationality">Country of Residence</label>
                  <select
                    id="nationality"
                    name="nationality"
                    className="form-control"
                    onChange={this.handleChange1}
                  >
                    <option selected>{this.state.nationality}</option>
                    <option>-----------------------------</option>
                    <option value="Afganistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <center>
                    <Link
                      to={{
                        pathname: "/solver",
                        state: {
                          query: this.state.specialization1,
                          query1: this.state.nationality,
                        },
                      }}
                    >
                      <button
                        className=" mt-3 btn btn-primary"
                        style={{ width: "50%" }}
                      >
                        Search
                      </button>
                    </Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="card">
              <table class="table table-hover">
                <thead style={{ backgroundColor: "#323754", color: "#ffffff" }}>
                  <tr>
                    <th>Rank</th>
                    <th>Solver Name</th>
                    <th>Points</th>
                    <th>Speclization</th>
                  </tr>
                </thead>
                {this.state.profile.map((da, i) => (
                  <tbody>
                    <tr>
                      <td>#{i + 1}</td>
                      <td>
                        {this.state.personal[i].firstname +
                          " " +
                          this.state.personal[i].lastname}
                      </td>

                      <td>{da.rp}</td>
                      <td>{this.state.professional[i].specialization}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SolversNav1;
