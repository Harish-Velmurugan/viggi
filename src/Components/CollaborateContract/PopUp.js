import React from "react";

import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function PopUp(props) {
  return (
    <Modal
      {...props}
      //size="sm"
      dialogClassName="modal-50w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.desc}</p>
      </Modal.Body>

      <Link to={props.redir}>
        <Button
          style={{ width: "75px", marginBottom: "15px", marginLeft: "405px" }}
          onClick={props.onHide}
        >
          Ok
        </Button>
      </Link>
    </Modal>
  );
}
export default PopUp;
