import React from "react";
import "../Abstract/Abstract.css";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

class CollabCard extends React.Component {
  // constructor(props){
  //     super(props)
  // }

  render() {
    return (
      <div className="inner0" id={this.props.collData.solutionId}>
        <div>
          <span style={{ float: "left", marginLeft: "20%" }}>
            Vote:&nbsp;{this.props.collData.votes}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i
            class="material-icons"
            onClick={this.props.click2}
            style={{
              color: "red",
              float: "right",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            cancel
          </i>
        </div>
        <img
          src={this.props.collData.image}
          height="125"
          width="125"
          className="profile"
          style={{ float: "left" }}
          alt="img"
        />
        <div className="inner3">
          <hr />
          <h5>{this.props.collData.title}</h5>
          <Link
            to={{
              pathname: "/viewsolution",
              state: {
                absParam: this.props.collData,
                allData: this.props.allData,
                problemId: this.props.collData.problemId,
              },
            }}
          >
            <Badge variant="dark">View More</Badge>
          </Link>
          <i
            class="material-icons"
            id={"add" + this.props.collData.solutionId}
            onClick={this.props.click1}
            style={{
              position: "relative",
              cursor: "pointer",
              marginLeft: "80%",
              marginTop: "-25px",
              fontSize: "40px",
              color: this.props.add,
            }}
          >
            add_circle
          </i>
        </div>
      </div>
    );
  }
}

export default CollabCard;
