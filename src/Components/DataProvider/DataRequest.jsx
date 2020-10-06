import React, { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import axios from "axios";
// import { Multiselect } from "multiselect-react-dropdown";

class DataProviderReq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      //other: false,
      options: [
        "Artificial Intelligence", "BioTech", "Covid", "Machine Learning", 
        "Algorithms",
        "Cryptography",
        "Distributed Computing",
        "Computer Vision",
        "Big Data",
        "Computational Learning",
        "Computer Vision",
        "Medicine",
        "Block Chain",
        "Other"
      ],
      domain: "",
      newDomain: "",
      purpose: "",
      budget: "",
      attach: "",
      filename:"", 
      title:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  }
  async handleFile(e) {
    let file = e.target.files[0];
    console.log(e.target.files[0])
    await this.setState({ attach: file ,
    filename: file.name
    });
  }
  async handleSubmit() {
    
    let data = new FormData();
   
    data.append("domain", this.state.domain);
    data.append("vendor","data")
    data.append("title", this.state.title);
    data.append("purpose", this.state.purpose);
    data.append("budget", this.state.budget);
    data.append("attach", this.state.attach);
    data.append("requestor", localStorage.getItem("username"))
    data.append("vendor", "data");
    axios.post("/helper/dataReq/", data).then(res=>{
      this.setState({setShow:false})
    })
  }

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

        <Modal centered show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#ececec",
              fontWeight: "bolder",
            }}
          >
            <Modal.Title>Data Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <table style={{ width: "100%" }}>
              <tr>
                  <td>Title</td>
                  <td>
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
                  </td>
                </tr>
                <br/>
                <tr>
                  <td>Domain</td>
                  <td>
                    <select
                      className="form-control"
                      id="0"
                      name="domain"
                      required // Property name to display in the dropdown options
                      onChange={(e) => this.handleChange(e)}
                    >
                      {this.state.options.map((x) => (
                        <option style={{ margin: "30px" }}>{x}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <br />
                {/* {this.state.domain == "Other" && (
                  <>
                  <tr>
                    <td>New Domain</td>
                    <td>
                      <input
                        type = "text"
                        className="form-control"
                        id="0"
                        name="newDomain"
                        required // Property name to display in the dropdown options
                        onChange={(e) => this.handleChange(e)}
                      />
                    </td>
                  </tr>
                  <br/>
                  </>
                )} */}
                <tr>
                  <td>Purpose</td>
                  <td>
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
                  </td>
                </tr>
                
                <br />
                <tr>
                  <td>Budget</td>
                  <td>
                    <input
                      required
                      type="number"
                      className="form-control"
                      id="2"
                      //value={this.state.ans[index]}
                      name="budget"
                      onChange={(e) => this.handleChange(e)}
                      maxLength="50"
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>Documents for Reference</td>
                  <td>
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
                  </td>
                </tr>
              </table>
              <hr />
              {/* <input
                style={{
                  width: "20%",
                  backgroundColor: "#4885ed",
                  height: "35px",
                  border: "none",
                  borderRadius: "7%",
                  color: "white",
                  float: "right",
                }}
                type="button" */}
              <Button onClick={this.handleSubmit} style={{float:"right"}}>Submit</Button>

              {/* /> */}
            
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              Request
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
}
export default DataProviderReq;
