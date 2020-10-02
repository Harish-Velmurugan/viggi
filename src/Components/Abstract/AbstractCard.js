import React from "react";

import { Link } from "react-router-dom";
import { Badge, Container } from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import StarRatings from 'react-star-ratings';

function AbstractCard(props) {
  return (
    <div>
      <div>
        <Container className="Answers1" style={{ width: "39%", height: "20%" }}>
          <h3 style={{ marginLeft: "1.5%", fontSize: "25px" }}>
            {props.absParam.title}
          </h3>

          <hr />
          <img
            src={props.absParam.image}
            height="125"
            alt="asd"
            width="20%"
            className="profile"
          />
          <div className="innerDiv2">
            <div style={{ maxHeight: "70px", overflow: "hidden" }}>
              {props.absParam.desc}
            </div>
            {/* <SSSobj absParam={props.absParam} allData={props.allData} problemId={props.problemId}><Badge variant="dark" >View More</Badge></SSSobj> */}
            {/* <Link to={{pathname:"/viewsolution", state:{absParam:props.absParam,allData:props.allData,problemId:props.problemId}}}>
                      <Badge variant="dark" >View More</Badge>
                    </Link> */}
                    {console.log(props.seeker)}
            {props.paid ? (
              <Link
                to={{
                  pathname: "/viewsolution",
                  state: {
                    absParam: props.absParam,
                    allData: props.allData,
                    problemId: props.problemId,
                    seeker: props.seeker
                  },
                }}
              >
                <Badge variant="dark">View solution</Badge>
              </Link>
            ) : (
              <Badge variant="dark">View More</Badge>
            )}
            <br />
            <hr />
            <span style={{ float: "left" }}>
              Votes:&nbsp;{props.absParam.votes}
            </span>
            <br/>
            <span>
            {props.absParam.expert.length > 0 ? 
          
                  <StarRatings
                  rating={props.absParam.rating/2}
                  starRatedColor="orange"
                  name='rating'
                  starDimension="30px"
                  starSpacing="1px"
                  />
                  :
                  <div></div>
                  }
                  </span>
            {/*<Badge variant="danger" style={{textAlign:"right"}}>{props.absParam.level}</Badge> */}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AbstractCard;
