import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { render } from "@testing-library/react";
import { Card, Button, CardDeck } from "react-bootstrap";
import DataProviderReq from "./DataRequest"
import Invovled from "./Invovled"
import TechReq from "./TechRequest"

class Helper extends React.Component {
  constructor(props) {
    super(props);
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
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Helpers</h3>
        </div>

        <CardDeck className="card-display m-5" style={{ width: "90%" }}>
          <Card>
            <Card.Header className="bg-warning text-white" as="h4">Data and Information Providers</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                They provide industry reports, data, case studies, best
                practices, state of-art knowledge and other similar know-how or
                codiﬁed experience.
              </Card.Text>
              <br />
              <DataProviderReq/>
              {/* <Link>
                <Button style={{ float: "right" }}>Request</Button>
              </Link> */}
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="bg-warning text-white" as="h4">Technology Providers</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                They are needed to design and delivery of solutions, products,
                and provide artifacts useful to support the process of solution
                generation and implementation.
              </Card.Text>
              <br></br>
              <TechReq/>
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
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Requested Data or Technology</h3>
        </div>
        <Invovled/>
        
      </div>
    );
  }
}
export default Helper;
