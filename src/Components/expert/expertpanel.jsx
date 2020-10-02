import React from "react";

import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Card, Button, CardDeck, Modal } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";

class ExpertPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      options: [
        { name: "Algorithms", id: 1 },
        { name: "Cryptography", id: 2 },
        { name: "Distributed Computing", id: 3 },
        { name: "Cloud Computing", id: 4 },
        { name: "Computational Learning ", id: 5 },
        { name: "Computer Vision", id: 6 },
        { name: "Big Data ", id: 7 },
        { name: "Medicine ", id: 8 },
      ],
      selectedValue: [],
      buckets: "",
      profile: [],
      domains: [],
      problem: false,
      solution: false,
      problemsPosted: [],
      forumPosted: [],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/expertCheck/" + localStorage.getItem("username") + "/")
      .then((res) => {
        this.setState({
          profile: res.data.values,
          buckets: res.data.values[0],
        });
      })
      .catch((err) => {});

    axios
      .get(`/api/expertDash/${localStorage.getItem("username")}/`)
      .then((response) => {
        this.setState({
          problemsPosted: response.data[0],
          forumPosted: response.data[1],
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    if (
      (this.state.solution == "true" || this.state.problem == "true") &&
      this.state.domains.length > 0
    ) {
      let domain = [];

      for (let i = 0; i < this.state.domains.length; i++) {
        domain.push(this.state.domains[i]["name"]);
      }

      console.log(domain, typeof domain);

      let username = localStorage.getItem("username");
      let form_data = new FormData();
      form_data.append("bucket", this.state.buckets);
      form_data.append("problem", this.state.problem);
      form_data.append("solution", this.state.solution);
      form_data.append("domains", domain);
      form_data.append("username", Number(username));

      axios
        .post("/api/expertApply/", form_data)
        .then((response1) => {
          console.log(response1);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ show: !this.state.show });
    }
  }

  handleChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log(value, name);
    this.setState({
      [name]: value,
    });
  }

  handleCheck(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    console.log(value, name);
    this.setState({
      [name]: value == "false" ? "true" : "false",
    });
  }

  onSelect(selectedList, selectedItem) {
    this.setState({ domains: selectedList });
  }

  onRemove(selectedList, removedItem) {}

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div className="main_content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            marginLeft: "5%",
            marginRight: "7%",
            backgroundColor: "#323754",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Solver Provision</h3>
        </div>

        <CardDeck
          className="card-display m-5"
          style={{ width: "90%", minWidth: "200px" }}
        >
          {this.state.problemsPosted.length > 0 ||
          this.state.forumPosted.length > 0 ? (
            <Card>
              <Card.Header as="h4">Expert Dashboard</Card.Header>
              <Card.Body>
                <Card.Text className="text-secondary">
                  Help the seekers by evaluating the solutions to their
                  problems. Click 'View' to access the solutions.
                </Card.Text>
                <br />
                <br />

                <Link
                  to={{
                    pathname: "expertDashboard",
                    state: {
                      choice: true,
                      problemsPosted: this.state.problemsPosted,
                      forumPosted: this.state.forumPosted,
                    },
                  }}
                >
                  <Button style={{ float: "right" }}>View</Button>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <div></div>
          )}

          <Card>
            <Card.Header as="h4">Expert Panel</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                Become a expert panel members and be the helper in hand for
                seekers!!.
                <br></br>
                Note: In order to apply for expert panel, you should be a
                VETERAN Badge holder of that particalar sector.
              </Card.Text>

              <div>
                {this.state.profile.length > 0 ? (
                  <Button
                    onClick={() => this.handleModal()}
                    style={{ float: "right" }}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.handleModal()}
                    disabled="true"
                    style={{ float: "right" }}
                  >
                    Apply
                  </Button>
                )}

                <Modal centered show={this.state.show}>
                  <Modal.Header>
                    <Modal.Title>Expert Panel Application</Modal.Title>
                    <button
                      type="button"
                      class="close"
                      aria-label="Close"
                      onClick={() => {
                        this.handleModal();
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </Modal.Header>

                  <Modal.Body>
                    <table>
                      <tr>
                        <td className="p-4">
                          <label>Fields</label>
                        </td>
                        <td className="p-4" style={{ width: "160%" }}>
                          <select
                            id="buckets"
                            placeholder="your"
                            className="form-control"
                            name="buckets"
                            onChange={this.handleChange}
                            required
                          >
                            {this.state.profile.includes("fashion") ? (
                              <option value="fashion">Fashion</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("law") ? (
                              <option value="law">Law</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("fmcg") ? (
                              <option value="fmcg">FMCG</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("healthcare") ? (
                              <option value="healthcare">Health Care</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("finance") ? (
                              <option value="finance">Finance</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("ttt") ? (
                              <option value="ttt">
                                Transporation, Travel & Tourism
                              </option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("edu") ? (
                              <option value="edu">Education</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("energy") ? (
                              <option value="energy">Energy</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("med_ent") ? (
                              <option value="med_ent">
                                Media and Entertainment
                              </option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("swhw") ? (
                              <option value="swhw">Software & Hardware</option>
                            ) : (
                              <div></div>
                            )}
                            {this.state.profile.includes("construction") ? (
                              <option value="construction">Construction</option>
                            ) : (
                              <div></div>
                            )}
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-4">
                          <label>Domains</label>
                        </td>
                        <td className="p-4" style={{ width: "160%" }}>
                          <Multiselect
                            options={this.state.options}
                            selectedValues={this.state.domains}
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name"
                            showCheckbox={true} // Property name to display in the dropdown options
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <td className="p-4">
                            <label>Panels</label>
                          </td>
                          <br></br>
                          <br></br>
                        </td>

                        <td style={{ width: "160%" }}>
                          <div className="FormField ml-4">
                            <label className="FormField__CheckboxLabel">
                              <input
                                className="FormField__Checkbox"
                                type="checkbox"
                                name="problem"
                                value={this.state.problem}
                                onChange={this.handleCheck}
                              />
                              &nbsp;&nbsp;&nbsp;Problem Framing
                            </label>

                            <br />

                            <label className="FormField__CheckboxLabel">
                              <input
                                className="FormField__Checkbox"
                                type="checkbox"
                                name="solution"
                                value={this.state.solution}
                                onChange={this.handleCheck}
                              />
                              &nbsp;&nbsp;&nbsp;Solution Decomposition
                            </label>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleSubmit}>Apply</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Card.Body>
          </Card>
        </CardDeck>
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            marginLeft: "5%",
            marginRight: "7%",
            backgroundColor: "#323754",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Seeker Provision</h3>
        </div>
        <CardDeck className="card-display m-5" style={{ width: "90%" }}>
          <Card>
            <Card.Header as="h4">Solution Reviewing</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                Commission domain experts to choose best solutions for your
                problems.
              </Card.Text>
              <br />
              <Link to={{ pathname: "/list", state: { choice: "solution" } }}>
                <Button style={{ float: "right" }}>Request</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header as="h4">Problem Framing</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                Commission domains expert to frame Problem statements.
              </Card.Text>
              <br></br>
              <Link to={{ pathname: "request", state: { choice: "problem" } }}>
                <Button style={{ float: "right" }}>Request</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header as="h4">Wicked Problem</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                Commission domains expert to frame a wicked problem.
              </Card.Text>
              <br></br>
              <Link to={{ pathname: "/list", state: { choice: "wicked" } }}>
                <Button style={{ float: "right" }}>Request</Button>
              </Link>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default ExpertPanel;
