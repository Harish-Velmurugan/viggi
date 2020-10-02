import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import Navbar from "../Navbar/nav";
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  FormCheck,
} from "react-bootstrap";
import Axios from "axios";
import Tree1 from "./Tree1";

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expert: this.props.location.state.main.expert,
      treeData: [],
      treeCommon: [],
      username: this.props.location.state.main.username,
      forumID: this.props.location.state.main.postId,
      id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCommon = this.handleCommon.bind(this);
    this.expandCheck = this.expandCheck.bind(this);
    this.copyTree = this.copyTree.bind(this);
  }
  async componentDidMount() {
    await Axios.get(
      "/sol/getTree/" + this.state.forumID + "/"
    ).then((res) => {
      if (res.data.length > 0) {
        this.setState({
          treeData: JSON.parse(res.data[0].treeBase),
          treeCommon: JSON.parse(res.data[0].treeCommon),
          id: res.data[0].id,
          username: res.data[0].username,
        });
      }
    });
  }

  copyTree() {
    this.setState({ treeData: this.state.treeCommon });
  }

  async handleCommon() {
    let form_data = new FormData();
    form_data.append("id", this.state.id);
    form_data.append("treeBase", JSON.stringify(this.state.treeCommon));

    await Axios.post(
      "/sol/setTreeCommon/",
      form_data
    ).then((res) => {});
  }

  async handleChange() {
    var tree = this.state.treeData;

    await this.expandCheck(tree);

    let form_data = new FormData();
    form_data.append("id", this.state.id);
    form_data.append("treeBase", JSON.stringify(tree));

    await Axios.post("/sol/setTree/", form_data).then(
      (res) => {
        this.setState({ treeCommon: tree, treeData: tree });
      }
    );
  }

  expandCheck(val) {
    for (var i = 0; i < val.length; i++) {
      val[i].expanded = true;
      if (val[i].children.length > 0) {
        this.expandCheck(val[i].children);
      }
    }
  }

  renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Drag and drop the contents to change the tree
    </Tooltip>
  );
  render() {
    return (
      <div style={{ backgroundColor: "#ececec", height: "100vh" }}>
        <Navbar />

        <Container style={{ marginTop: "50px" }}>
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
                      <h3 style={{ marginLeft: "3%" }}>Expert Tree</h3>
                    </OverlayTrigger>
                  </div>
                </div>

                {this.state.username == localStorage.getItem("username") ||
                this.state.expert ? (
                  <>
                    <div className="card-body" style={{ marginTop: "25px" }}>
                      <SortableTree
                        treeData={this.state.treeData}
                        onChange={(treeData) => this.setState({ treeData })}
                      />
                    </div>
                    <div className="card-footer">
                      <Button
                        variant="primary"
                        style={{ float: "right" }}
                        onClick={this.handleChange}
                      >
                        Finalise
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="card-body" style={{ marginTop: "25px" }}>
                    <SortableTree treeData={this.state.treeData} />
                  </div>
                )}
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
                  <SortableTree
                    treeData={this.state.treeCommon}
                    onChange={(treeCommon) => this.setState({ treeCommon })}
                  />
                </div>
                <div className="card-footer">
                  <Button
                    variant="primary"
                    style={{ float: "right" }}
                    onClick={this.handleCommon}
                  >
                    Submit
                  </Button>
                  {this.state.username == localStorage.getItem("username") ||
                    (this.state.expert && (
                      <Button
                        variant="primary"
                        style={{ marginRight: "10px", float: "right" }}
                        onClick={this.copyTree}
                      >
                        Copy
                      </Button>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
