import React from "react";
import { Button, Modal } from "react-bootstrap";

export default class Extenddays extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.handleModal()}>Extend Days</Button>
        <Modal show={this.state.show}>
          <Modal.Header>
            <Modal.Title>Days to be Extended</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              No. of Days:
              <input type="number" name="days" />
            </label>
            <br />
            <label htmlFor="description">Reason:</label>
            <textarea
              className="form-control"
              placeholder="Describe your reason here..."
              rows={5}
              id="description"
              required
              name="description"
              onChange={this.handleChange}
            />
            <br />

            <input type="file" name="file" onChange={(e) => this.onChange(e)} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.handleModal();
              }}
            >
              {" "}
              Send Request
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
