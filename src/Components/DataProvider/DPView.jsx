import React from "react";
import Navbar from "../Navbar/nav";
import { Badge, Button, Modal, InputGroup } from "react-bootstrap";
import axios from "axios";
class DPView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domains: [
        "Artificial Intelligence",
        "Algorithms",
        "Cryptography",
        "Distributed Computing",
        "Computer Vision",
        "Big Data",
        "Computational Learning",
        "Computer Vision",
        "Medicine",
        "Block Chain",
        "BioTech",
        "Covid",
        "Machine Learning",
        "Other",
      ],
      selectedDomain: "",
      feed: "",
      show: false,
      setShow: false,
      //budgetIndex: null,
      show2: false,
      show3: false,
      budget: "",
      quoteID: null,
      reqID: null,
    };
    this.changeDomain = this.changeDomain.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleQuote = this.handleQuote.bind(this);
    this.handleBudget = this.handleBudget.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleClose = () =>
    this.setState({ setShow: false, show2: false, show3: false, show: false });
  handleShow = () => this.setState({ setShow: true });

  async componentDidMount() {
    await this.setState({ selectedDomain: this.state.domains[0] });
    this.changeDomain();
  }

  async changeDomain() {
    await axios
      .get("/helper/dpFeed/" + this.state.selectedDomain + "/")
      .then((response) => this.setState({ feed: response.data[0] }));
  }
  async handleChange(e) {
    let target = e.target;
    let value = target.value;
    await this.setState({
      selectedDomain: value,
    });
    this.changeDomain();
  }
  handleChange2(e) {
    let target = e.target;
    let value = target.value;
    console.log(value);
    this.setState({
      budget: value,
    });
  }

  async handleClick(e, index) {
    let data = new FormData();
    data.append("reqID", index);
    data.append("user", localStorage.getItem("username"));
    const headers = {
      "Content-Type": "multipart/form-data",
      // 'Authorization': token
    };
    await axios
      .post("/helper/dpagreed/" + index + "/", data, {
        headers: headers,
      })
      .then((response) =>
        this.setState({
          setShow: true,
        })
      );
  }

  handleQuote(e, index, ch) {
    this.setState({
      setShow: true,
    });
    if (ch == "budget") {
      this.setState({ show2: true, quoteID: index });
    } else if (ch == "view") {
      this.setState({ show3: true, reqID: index });
    }
  }

  async handleBudget() {
    let data = new FormData();
    data.append("reqID", this.state.quoteID);
    data.append("name", localStorage.getItem("username"));
    data.append("quote", this.state.budget);
    const headers = {
      "Content-Type": "multipart/form-data",
      // 'Authorization': token
    };
    await axios
      .post("/helper/quoteBudget/" + this.state.quoteID + "/", data, {
        headers: headers,
      })
      .then((response) =>
        this.setState({
          setShow: false,
          quoteID: "",
          budget: "",
        })
      );
  }
  render() {
    console.log(this.state.feed);
    let reqID = this.state.reqID;
    let Stype, tech, time, quan, storage, speed, core, os, depend;
    if (reqID != null) {
      console.log(reqID);
      tech = this.state.feed[reqID].techno
        .substring(2, this.state.feed[reqID].techno.length - 2)
        .split("', '");
      time = this.state.feed[reqID].time
        .substring(2, this.state.feed[reqID].time.length - 2)
        .split("', '");
      quan = this.state.feed[reqID].quantity
        .substring(2, this.state.feed[reqID].quantity.length - 2)
        .split("', '");
      storage = this.state.feed[reqID].storage
        .substring(2, this.state.feed[reqID].storage.length - 2)
        .split("', '");
      speed = this.state.feed[reqID].speed
        .substring(2, this.state.feed[reqID].speed.length - 2)
        .split("', '");
      core = this.state.feed[reqID].core
        .substring(2, this.state.feed[reqID].core.length - 2)
        .split("', '");
      os = this.state.feed[reqID].os
        .substring(2, this.state.feed[reqID].os.length - 2)
        .split("', '");
      depend = this.state.feed[reqID].depend
        .substring(2, this.state.feed[reqID].depend.length - 2)
        .split("', '");
      Stype = this.state.feed[reqID].Stype.substring(
        2,
        this.state.feed[reqID].Stype.length - 2
      ).split("', '");
    }
    return (
      <div className="feedMain">
        <Navbar />
        <br />
        <br />
        <div className="container" style={{ marginTop: "3rem" }}>
          <div className="row">
            <div className="col-sm-0 col-md pb-3 ">
              <div className="card sticky-top">
                <div className="card-header text-white bg-primary">
                  Your Domains
                </div>
                <div className="card-body">
                  {this.state.domains.map((domain, index) => (
                    <div key={index}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={index}
                          name="customRadio"
                          value={domain}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <label className="custom-control-label" htmlFor={index}>
                          {domain}
                        </label>
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="col-sm-12 col-md-6 overflow-auto"
              style={{
                overflowY: "visible",
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              {this.state.feed[0] != undefined &&
                this.state.feed.map((x, index) => {
                  let tech = x.techno
                    .substring(2, x.techno.length - 2)
                    .split("', '");
                  let time = x.time
                    .substring(2, x.time.length - 2)
                    .split("', '");
                  let quan = x.time
                    .substring(2, x.quantity.length - 2)
                    .split("', '");
                  return (
                    <>
                      <div className="card">
                        <div className="card-header bg-warning text-white">
                          {x.title}
                        </div>
                        <div className="card-body" style={{ padding: "6%" }}>
                          <p>{x.purpose}</p>

                          {x.vendor == "tech" && (
                            <table style={{ width: "65%" }}>
                              <thead style={{ lineHeight: "25px" }}>
                                <tr>
                                  <th>REQUIREMENTS</th>
                                  <th>DAYS</th>
                                  <th>QUANTITY</th>
                                </tr>
                              </thead>
                              <tbody style={{ lineHeight: "25px" }}>
                                {console.log(tech, time)}
                                {tech.map((techno, index) => (
                                  <tr>
                                    <td>{techno}</td>
                                    <td style={{ textAlign: "center" }}>
                                      {time[index]}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      {quan[index]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          <br />

                          <Badge
                            variant="success"
                            style={{ padding: "8px", marginRight: "1.5%" }}
                          >
                            <a href={x.attach} style={{ color: "white" }}>
                              Attachments
                            </a>
                          </Badge>

                          {x.vendor == "data" ? (
                            <Badge variant="danger" style={{ padding: "8px" }}>
                              Budget:&nbsp;$&nbsp;{x.budget}
                            </Badge>
                          ) : (
                            <Badge
                              variant="dark"
                              style={{
                                padding: "8px",
                                marginRight: "1.5%",
                                cursor: "pointer",
                              }}
                              onClick={(e) =>
                                this.handleQuote(e, index, "view")
                              }
                            >
                              View More
                            </Badge>
                          )}
                        </div>
                        <div className="card-footer">
                          {x.vendor == "data" ? (
                            <Button
                              style={{ float: "right" }}
                              onClick={(e) => this.handleClick(e, x.reqID)}
                            >
                              Accept
                            </Button>
                          ) : (
                            <Button
                              style={{ float: "right" }}
                              onClick={(e) =>
                                this.handleQuote(e, x.reqID, "budget")
                              }
                            >
                              Quote Budget
                            </Button>
                          )}
                        </div>
                      </div>
                      <br />
                    </>
                  );
                })}
              <br />
            </div>
            <div className="col"></div>

            <br />
          </div>
        </div>
        {this.state.show && (
          <Modal centered show={this.state.setShow} onHide={this.handleClose}>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: "#ececec",
                fontWeight: "bolder",
              }}
            >
              <Modal.Title>Accepted Data Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You have accepted to provide the data requested by the firm for
              the specified buget.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Ok</Button>
            </Modal.Footer>
          </Modal>
        )}
        {this.state.show2 && (
          <Modal centered show={this.state.setShow} onHide={this.handleClose}>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: "#ececec",
                fontWeight: "bolder",
              }}
            >
              <Modal.Title>Quote Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>Quote your Budget </td>
                  <td>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <input
                        required
                        type="number"
                        className="form-control"
                        //value="budget"
                        name="budget"
                        onChange={(e) => this.handleChange2(e)}
                        maxLength="50"
                      />
                    </InputGroup>
                  </td>
                </tr>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleBudget}>Ok</Button>
            </Modal.Footer>
          </Modal>
        )}
        {this.state.show3 && (
          <Modal centered show={this.state.setShow} onHide={this.handleClose}>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: "#ececec",
                fontWeight: "bolder",
              }}
            >
              <Modal.Title>Technology Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Stype != undefined && (
                <>
                  {Stype.map((type, index) => (
                    <>
                      <div
                        class="accordion"
                        id="accordionExample"
                        className="collapse show"
                      >
                        <div className="card">
                          <div className="card-header">
                            {tech[index]}
                            <a
                              class="card-link"
                              data-toggle="collapse"
                              href={"#collapse" + index}
                              aria-expanded="false"
                              aria-controls={"collapse" + index}
                            >
                              <i
                                class="fa fa-sort-desc"
                                aria-hidden="true"
                                style={{ fontSize: "20px", float: "right" }}
                              ></i>
                            </a>
                          </div>
                        </div>
                        <div
                          class="collapse"
                          id={"collapse" + index}
                          data-parent="#accordionExample"
                        >
                          {type == "Server" && (
                            <div class="card card-body">
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  Name:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={tech[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  No. of Days:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={time[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  Quantity:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={quan[index]}
                                    disabled="true"
                                    
                                  />
                                </div>
                              </div>

                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  Storage Capacity:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={storage[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  Processing Speed:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={speed[index]}
                                    disabled="true"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  Number of cores:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={core[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  OS type:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={os[index]}
                                    disabled="true"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  Other dependencies:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={depend[index]}
                                    disabled="true"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {type == "Software" && (
                            <div class="card card-body">
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  Name:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={tech[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  No. of Days:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={time[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  Quantity:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={quan[index]}
                                    disabled="true"
                                  />
                                </div>
                              </div>

                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  OS type:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={os[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  Other dependencies:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={depend[index]}
                                    disabled="true"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {type == "Others" && (
                            <div class="card card-body">
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  Name:
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={tech[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  No. of Days:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={time[index]}
                                    disabled="true"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  Quantity:
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={quan[index]}
                                    disabled="true"
                                  />
                                </div>
                              </div>

                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  Other Specifications:
                                  <textarea
                                    required
                                    rows={3}
                                    className="form-control"
                                    value={depend[index]}
                                    disabled="true"
                                   
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )}
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}
export default DPView;
