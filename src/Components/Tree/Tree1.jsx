import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
class Tree1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      choice: [
        "blockchain",
        "www.shdajdhksa/asjhdaskd.in",
        "pandemic",
        "Covi-19",
        "SARS",
        "Russia",
      ],
      ansChoice: [1, 2],
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });

  async handleSubmit() {
    this.setState({ setShow: false });

    axios.post(
      "/sol/createTree/" + this.state.ansChoice + "/"
    );
  }

  handleSelect(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    if (target.checked) {
      this.setState(
        (this.state.ansChoice = this.state.ansChoice.concat(value))
      );
    } else if (!target.checked) {
      const filteredItems = this.state.ansChoice.filter(
        (temp) => temp != value
      );
      this.setState({ ansChoice: filteredItems });
    }
  }

  render() {
    console.log(this.state.ansChoice);

    return (
      <div>
        <Button
          variant="warning"
          onClick={this.handleShow}
          style={{
            marginLeft: "3px",
            fontWeight: "bolder",
          }}
        >
          Generate Tree
        </Button>

        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header
            style={{
              backgroundColor: "#ececec",
              fontWeight: "bolder",
            }}
            closeButton
          >
            <Modal.Title>Choose your statements</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#dedede",
            }}
          >
            <div className="card">
              <div className="card-body">
                <Form>
                  {this.state.choice.map((y, index) => (
                    <>
                      <Form.Check
                        inline
                        label={y.msg}
                        type="checkbox"
                        name="ansChoice"
                        value={y.id}
                        id={index}
                        onChange={(e) => this.handleSelect(e)}
                      />
                      <hr />
                    </>
                  ))}
                </Form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#ececec",
            }}
          >
            <Button variant="primary" onClick={this.handleSubmit}>
              Filter
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Tree1;
