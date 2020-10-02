import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge, Button, Modal } from "react-bootstrap";

class DPinvolved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pblmInv: [],
      show: false,
      index: 0,
      file: "",
      img: "Only .csv file can be uploaded",
      img1:"Attach you keys as a file",
      prblm: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAttach = this.handleAttach.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClose = () => this.setState({ show: false });

  async componentDidMount() {
    await axios
      .get("/helper/pblmInv/" + localStorage.getItem("username") + "/")
      .then((response) =>
        this.setState({ pblmInv: response.data[1], prblm: response.data[0] })
      );
  }

  async handleSubmit() {
    if (this.state.file != "") {
      let data = new FormData();
      data.append("doc", this.state.file);
      data.append("reqID", this.state.pblmInv[this.state.index][0].reqID);
      data.append("user", localStorage.getItem("username"));
      console.log(this.state.pblmInv[this.state.index][0].reqID)
      await axios.post(
        "http://127.0.0.1:8000/helper/DPAttach/" +
          this.state.pblmInv[this.state.index][0].reqID +
          "/",
        data
      );

      this.setState({
        show: false,
        index: 0,
      });
    } else {
      document.getElementById("perror").innerHTML =
        "Please a upload a .csv file";
    }
  }

  handleClick(e, id) {
    console.log(this.state.prblm, id);
    let i = this.state.prblm[id].doc;
    this.setState({
      show: true,
      index: id,
      //img:i.substring(i.lastIndexOf('/')+1,i.length)
    });
  }
  handleAttach(e,ven="data") {
    let file = e.target.files[0];
    if(ven == "data"){
    if (file.name.includes(".csv")) {
      this.setState({ file: file, img: file.name });
      document.getElementById("perror").innerHTML = "";
    } else {
      document.getElementById("perror").innerHTML =
        "Please a upload a .csv file";
    }
  }
  else{
    this.setState({ file: file, img1: file.name ,img:file.name});
  }
    console.log(file);
  }

  render() {
    console.log(this.state.pblmInv, this.state.index);
    return (
      <div className="main_content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Involved Problems
          </h3>
        </div>
        {/* <div className="row">
          <div className="col-sm-12" style={{ marginLeft: "0%" }}> */}
        <div className="row">
          {this.state.pblmInv.map((x, index) => (
            <div className="col-md-3" key={index}>
              <div
                className="card shadow-sm mb-4 bg-white"
                style={{ height: "90%" }}
              >
                <div
                  className="card-header bg-primary p-3"
                  style={{
                    color: "white",
                    fontSize: "15px",
                    height: "20%",
                    maxHeight: "50px",
                    overflow: "hidden",
                  }}
                >
                  {x[0].title}
                </div>
                <div className="card-body p-3">
                  <div
                    style={{
                     // height: "53%",
                      overflow: "hidden",
                      marginBottom: "5px",
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: "bolder",
                        textDecoration: "underline",
                        marginBottom: "10px",
                      }}
                    >
                      Purpose
                    </h4>
                    <p>{x[0].purpose}</p>
                  </div>
                  <Link onClick={(e) => this.handleClick(e, index)}>
                    +&nbsp;View More...
                  </Link>
                  <br />
                  <br />
                  <Badge
                    variant="danger"
                    style={{ padding: "8px", marginRight: "1.5%" }}
                  >
                    Budget:&nbsp;$&nbsp;{x[0].budget}
                  </Badge>
                  <Badge variant="success" style={{ padding: "8px" }}>
                    <a href={x[0].attach} style={{ color: "white" }}>
                      Attachments
                    </a>
                  </Badge>
                </div>
                <div className="card-footer">
                  <Button
                    style={{ float: "right" }}
                    onClick={(e) => this.handleClick(e, index)}
                  >
                    Attach
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* </div>
          </div> */}
        </div>
        {this.state.show && (
          <Modal centered show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.pblmInv[this.state.index][0].vendor == "data" ? (
                  <>Data Request</>
                ) : (
                  <>Technology Request</>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "3%" }}>
              <h4
                style={{
                  fontWeight: "bolder",
                  textDecoration: "underline",
                  marginBottom: "10px",
                }}
              >
                PURPOSE
              </h4>
              <p>{this.state.pblmInv[this.state.index][0].purpose}</p>

              {this.state.pblmInv[this.state.index][0].vendor == "tech" &&
                this.state.pblmInv[this.state.index].map((x) => {
                  let tech = x.techno
                    .substring(2, x.techno.length - 2)
                    .split("', '");
                  let time = x.time
                    .substring(2, x.time.length - 2)
                    .split("', '");
                  let quan = x.quantity
                    .substring(2, x.quantity.length - 2)
                    .split("', '");
                  let storage = x.storage
                    .substring(2,x.storage.length - 2)
                    .split("', '");
                  let speed = x.speed
                    .substring(2, x.speed.length - 2)
                    .split("', '");
                  let core = x.core
                    .substring(2, x.core.length - 2)
                    .split("', '");
                  let os = x.os
                    .substring(2, x.os.length - 2)
                    .split("', '");
                  let depend = x.depend
                    .substring(2, x.depend.length - 2)
                    .split("', '");
                  let Stype = x.Stype.substring(
                    2,
                    x.Stype.length - 2
                  ).split("', '");
                    {console.log(x)}
                  return (
                    <>
                    <br/>
                      {/* <table style={{ width: "50%" }}>
                        <thead style={{ lineHeight: "25px" }}>
                          <tr>
                            <th style={{textDecoration: "underline"}}>REQUIREMENTS</th>
                            <th style={{textDecoration: "underline"}}>DAYS</th>
                          </tr>
                        </thead>
                        <tbody style={{ lineHeight: "25px" }}>
                          {console.log(tech, time)}
                          {tech.map((techno, index) => (
                            <tr>
                              <td>{techno}</td>
                              <td>{time[index]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
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
                      <br/>
                      
                    </>
                  );
                })}

              <Badge
                variant="danger"
                style={{ padding: "8px", marginRight: "1.5%" }}
              >
                Budget:&nbsp;$&nbsp;
                {this.state.pblmInv[this.state.index][0].budget}
              </Badge>
              <Badge variant="success" style={{ padding: "8px" }}>
                <a
                  href={this.state.pblmInv[this.state.index][0].attach}
                  style={{ color: "white" }}
                >
                  Download Attachment
                </a>
              </Badge>
              <br />
              <br />
              {this.state.pblmInv[this.state.index][0].paid && (
                <>
                {this.state.pblmInv[this.state.index][0].vendor == "data" ?
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    onChange={this.handleAttach}
                  />
                  <label
                    class="custom-file-label"
                    id="file"
                    style={{ overflow: "hidden" }}
                  >
                    {this.state.img}
                  </label>
                </div>
                :
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    onChange={(e)=>this.handleAttach(e,"tech")}
                  />
                  <label
                    class="custom-file-label"
                    id="file"
                    style={{ overflow: "hidden" }}
                  >
                    {this.state.img1}
                  </label>
                </div>
                }
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <p id="perror" style={{ color: "red", marginRight: "47%" }}></p>{" "}
              &nbsp;&nbsp;
              {this.state.pblmInv[this.state.index][0].paid ? (
                <Button onClick={this.handleSubmit}>Submit</Button>
              ) : (
                <p id="pd" style={{ color: "red" }}>
                  Requestor not yet paid.
                </p>
              )}
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}
export default DPinvolved;
