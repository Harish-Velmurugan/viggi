import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import Navbar from "../Navbar/nav";
import { Container, Row, Col,OverlayTrigger,Tooltip,Button } from "react-bootstrap";
import Tree1 from "./Tree1"

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postData:[],
      treeData: [
        { title: "vaccine for covid-19", children: [{ title: "medical" }] },
        {
          title: "biotechnology",
          children: [{ title: "trending", children: [{ title: "required" }] }],
        },
      ],
      oldData: [
        {
          title: "vaccine for covid-19",
          children: [{ title: "medical" }],
          expanded: true,
        },
        {
          title: "biotechnology",
          children: [
            {
              title: "trending",
              children: [{ title: "required" }],
              expanded: true,
            },
          ],
          expanded: true,
        },
       ],
    };
    this.formatChange(this.state.treeData)
    this.formatChange = this.formatChange.bind(this);
  }
  componentDidMount(){
    

  }
  
  formatChange(x){
    let i ;
    let Base = '1';
    let str;
    for (i=0;i<x.length;i++){
      let nonBase = 1
      str = Base + (nonBase+1)
      this.setState(
        this.state.postData = this.state.postData.concat([x[i],str])
      )
      if(x[i].children != undefined){
        Base = (parseInt(Base)+1).toString()
        nonBase = 1
        this.formatChange(x[i].children)
      }
      console.log(Base,str)

    }
    
  }
  renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} >
      Drag and drop the contents to change the tree
    </Tooltip>
  );
  render() {
    
   console.log(this.state.treeData)
    return (
      <div style={{ backgroundColor: "#ececec", height: "100vh" }}>
        <Navbar />

        <Container style={{ marginTop: "50px" }}>
          <Tree1/>
          <Row>
            <Col>
              <div
                className="card"
                style={{
                  height: "80vh",
                  marginTop: "50px",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#323754", color: "white" }}
                >
                  <div className="card-title">
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={this.renderTooltip}
                    >
                      <h3 style={{ marginLeft: "3%" }}>New Tree</h3>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="card-body" style={{ marginTop: "25px" }}>
                  <SortableTree
                    treeData={this.state.treeData}
                    onChange={(treeData) => this.setState({ treeData })}
                  />
                </div>
                <div className="card-footer">
                <Button variant="primary" style={{float:"right"}}>
              Submit
            </Button>
                </div>
              </div>
            </Col>
            <Col>
              <div
                className="card"
                style={{
                  height: "80vh",
                  marginTop: "50px",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#323754", color: "white" }}
                >
                  <div className="card-title">
                  <OverlayTrigger
                      placement=""
                      delay={{ show: 250, hide: 400 }}
                      overlay={this.renderTooltip}
                    >
                    <h3 style={{ marginLeft: "3%" }}>Old Tree</h3>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="card-body" style={{ marginTop: "25px" }}>
                  <SortableTree treeData={this.state.oldData} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
