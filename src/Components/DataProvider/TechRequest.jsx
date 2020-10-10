import React, { useState } from "react";
import { Modal, Button, InputGroup} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

class TechReq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      other: false,
      type: ["Server"],
      techName: ["null"],
      techTime: ["null"],
      techQuantity: ["null"],
      techstorage: ["null"],
      techspeed: ["null"],
      techos: ["null"],
      techcores: ["null"],
      techdepen: ["null"],
      purpose: "",
      budget: "",
      attach: "",
      filename: "",
      title: "",
      index: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });

  handleChange(e, id = 0) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    let time = this.state.techTime.slice();
    let tec = this.state.techName.slice();
    let qua = this.state.techQuantity.slice();
    let store = this.state.techstorage.slice();
    let speed = this.state.techspeed.slice();
    let os = this.state.techos.slice();
    let core = this.state.techcores.slice();
    let depend = this.state.techdepen.slice();
    let type = this.state.type.slice();
    if (name == "name") {
      tec[id] = value;
      if (value != "") {
        this.setState({
          techName: tec,
        });
      }
    } else if (name == "time") {
      time[id] = value;

      this.setState({
        techTime: time,
      });
    } else if (name == "quantity") {
      qua[id] = value;

      this.setState({
        techQuantity: qua,
      });
    } else if (name == "type") {
      type[id] = value;

      this.setState({
        type: type,
      });
    } 
    else if (name == "storage") {
      store[id] = value;

      this.setState({
        techstorage: store,
      });
    }
    else if (name == "speed") {
      speed[id] = value;

      this.setState({
        techspeed: speed,
      });
    }
    else if (name == "os") {
      os[id] = value;

      this.setState({
        techos: os,
      });
    }
    else if (name == "core") {
      core[id] = value;

      this.setState({
        techcores: core,
      });
    }
    else if (name == "depend") {
      depend[id] = value;

      this.setState({
        techdepen: depend,
      });
    }else {
      this.setState({
        [name]: value,
      });
    }
  }
  async handleFile(e) {
    let file = e.target.files[0];
    console.log(e.target.files[0]);
    await this.setState({ attach: file, filename: file.name });
  }
  async handleSubmit() {
    let data = new FormData();

    data.append("title", this.state.title);
    data.append("vendor", "tech");
    data.append("purpose", this.state.purpose);
    data.append("attach", this.state.attach);
    data.append("requestor", localStorage.getItem("username"));
    data.append("techno", this.state.techName);
    data.append("time", this.state.techTime);
    data.append("Stype", this.state.type);
    data.append("core", this.state.techcores);
    data.append("os", this.state.techos);
    data.append("speed", this.state.techspeed);
    data.append("storage", this.state.techstorage);
    data.append("depend", this.state.techdepen);
    data.append("quantity", this.state.techQuantity);

    axios.post("/helper/dataReq/", data).then((res) => {
      this.setState({ setShow: false });
    });
  }

  handleClick = () => {
    let tec = this.state.techName.slice();
    let time = this.state.techTime.slice();
    let qua = this.state.techQuantity.slice();
    let type = this.state.type.slice();
    let store = this.state.techstorage.slice();
    let speed = this.state.techspeed.slice();
    let os = this.state.techos.slice();
    let core = this.state.techcores.slice();
    let depend = this.state.techdepen.slice();
    let index = this.state.index;

    if (this.state.index != 9) {
      if (tec[index] != "" && time[index] != "" && qua[index] != "") {
        tec[tec.length] = "null";
        time[time.length] = "null";
        qua[qua.length] = "null";
        type[type.length] = "Server";
        store[store.length] ="null";
        speed[speed.length] ="null";
        os[os.length]="null";
        core[core.length]="null";
        depend[depend.length]="null";
        this.setState({
          techName: tec,
          techTime: time,
          techQuantity: qua,
          type: type,
          techstorage:store,
          techspeed:speed,
          techos:os,
          techcores:core,
          techdepen:depend,
          index: tec.length - 1,
        });
      }
    }
  };

  render() {
  
    return (
      <>
        <Button
          variant="primary"
          onClick={this.handleShow}
          style={{
            float: "right",
          }}
        >
          Request
        </Button>
        <Link to="/dashboard/quotation">
        <Button
          variant="primary"
          style={{
            float: "right",marginRight:"3%"
          }}
        >
          View Quotations
        </Button>
        </Link>
        <Modal
          size="lg"
          centered
          show={this.state.setShow}
          onHide={this.handleClose}
        >
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#ececec",
              fontWeight: "bolder",
            }}
          >
            <Modal.Title>Service Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <table style={{ width: "100%" }}> */}
            <div className="form-row">
              <div className="form-group col-md-2">Title</div>
              <div className="form-group col-md-10">
                <input
                  required
                  type="text"
                  className="form-control"
                  id="10"
                  //value={this.state.ans[index]}
                  name="title"
                  onChange={(e) => this.handleChange(e)}
                  maxLength="50"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">Technology</div>
              <div className="form-group col-md-10">
                {/* <tr>
                      <td>Name</td>
                      <td>Requested Days</td>
                    
                    </tr> */}
                <div
                  class="accordion"
                  id="accordionExample"
                  className="collapse show"
                >
                  {this.state.techName.map((tech, index) => (
                    <div className="card">
                      <div className="card-header">
                        <InputGroup>
                          <select
                            id="type"
                            required
                            className="form-control"
                            name="type"
                            onChange={(e) => this.handleChange(e, index)}
                            style={{ marginRight: "10%" }}
                          >
                            <option>Server</option>
                            <option>Software</option>
                            <option>Others</option>
                          </select>
                          <InputGroup.Append>
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
                                style={{ fontSize: "20px" }}
                              ></i>
                            </a>
                          </InputGroup.Append>
                        </InputGroup>
                      </div>

                      <div
                        class="collapse"
                        id={"collapse" + index}
                        data-parent="#accordionExample"
                      >
                        {this.state.type[index] == "Server" && (
                          <div class="card card-body">
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                Name:
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="10"
                                  //value={this.state.ans[index]}
                                  name="name"
                                  onChange={(e) => this.handleChange(e, index)}
                                  maxLength="50"
                                  style={{ width: "95%" }}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                No. of Days:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  name="time"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                Quantity:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  name="quantity"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-group col-md-6">
                                Storage Capacity:
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="10"
                                  //value={this.state.ans[index]}
                                  name="storage"
                                  onChange={(e) => this.handleChange(e, index)}
                                  maxLength="50"
                                  style={{ width: "95%" }}
                                />
                              </div>
                              <div className="form-group col-md-6">
                                Processing Speed:
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="deadline"
                                  name="speed"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                Number of cores:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  id="deadline"
                                  name="core"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                              <div className="form-group col-md-6">
                                OS type:
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="deadline"
                                  name="os"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col-md-12">
                                Other dependencies:
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="deadline"
                                  name="depend"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {this.state.type[index] == "Software" && (
                          <div class="card card-body">
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                Name:
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="10"
                                  //value={this.state.ans[index]}
                                  name="name"
                                  onChange={(e) => this.handleChange(e, index)}
                                  maxLength="50"
                                  style={{ width: "95%" }}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                No. of Days:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  name="time"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                Quantity:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  name="quantity"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="form-group col-md-6">
                                OS type:
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="deadline"
                                  name="os"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                              <div className="form-group col-md-6">
                                Other dependencies:
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="deadline"
                                  name="depend"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {this.state.type[index] == "Others" && (
                          <div class="card card-body">
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                Name:
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="10"
                                  //value={this.state.ans[index]}
                                  name="name"
                                  onChange={(e) => this.handleChange(e, index)}
                                  maxLength="50"
                                  style={{ width: "95%" }}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                No. of Days:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  name="time"
                                  onChange={(e) => this.handleChange(e, index)}
                                />
                              </div>
                              <div className="form-group col-md-3">
                                Quantity:
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  name="quantity"
                                  onChange={(e) => this.handleChange(e, index)}
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
                                  id="1"
                                  //value=""
                                  name="depend"
                                  onChange={(e) => this.handleChange(e)}
                                  maxLength="200"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <i
                  className="fa fa-plus-circle fa-2x"
                  style={{
                    float: "right",
                    color: "gray",
                    cursor: "pointer",
                    marginTop: "5px",
                  }}
                  onClick={this.handleClick}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">Purpose</div>
              <div className="form-group col-md-10">
                <textarea
                  required
                  rows={5}
                  className="form-control"
                  id="1"
                  //value=""
                  name="purpose"
                  onChange={(e) => this.handleChange(e)}
                  maxLength="200"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">Technologies rquired</div>
              <div className="form-group col-md-10">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    onChange={this.handleFile}
                  />
                  <label class="custom-file-label" id="file">
                    {this.state.filename}
                  </label>
                </div>
              </div>
            </div>
            {/* </table> */}
            <hr />
            <p style={{ fontWeight: "bolder", color: "red" }}>
              Kindly attach the Technologies along with required time as a file.
            </p>
            <Button onClick={this.handleSubmit} style={{ float: "right" }}>
              Submit
            </Button>

            {/* /> */}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default TechReq;
