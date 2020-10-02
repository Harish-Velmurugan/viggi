import React from "react";
import "./SS.css";
import { Link } from "react-router-dom";

function SS(props) {
  return (
    <div>
      <div class="container">
        <div class="card" id={props.user.id}>
          <div class="media">
            <div class="img">
              <img
                src={props.user.img}
                alt="asd"
                class="mr-3"
                height="200"
                width="200"
              />
            </div>
            <div class="media-body">
              <h5>
                <b>{props.user.name}</b>
                <br />
                <small>{props.user.designation}</small>
              </h5>
              <div style={{ fontSize: "15px" }}>
                <p>
                  RATINGS : &nbsp;
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <br />
                  POINTS :{props.user.points}
                </p>
              </div>
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Points
                </button>
                <div class="dropdown-menu">
                  <Link class="dropdown-item" href="#">
                    50 Points
                  </Link>
                  <Link class="dropdown-item" href="#">
                    40 Points
                  </Link>
                  <Link class="dropdown-item" href="#">
                    30 Points
                  </Link>
                  <Link class="dropdown-item" href="#">
                    20 Points
                  </Link>
                  <Link class="dropdown-item" href="#">
                    10 Points
                  </Link>
                </div>
              </div>
            </div>
            {props.user.pro ? (
              <div
                className="text"
                style={{
                  width: "60%",
                  marginRight: "0.5rem",
                  padding: "1rem 0",
                }}
              >
                <p>{props.user.content}</p>
              </div>
            ) : (
              <div
                className="text"
                style={{
                  width: "55%",
                  marginRight: "0.5rem",
                  padding: "1rem 0",
                }}
              >
                <p>{props.user.content}</p>
              </div>
            )}
            {props.user.pro ? (
              <button
                class="btn btn-danger btn-sm"
                style={{ backgroundColor: "red" }}
                onClick={props.onClick}
              >
                Reject
              </button>
            ) : (
              <button
                class="btn btn-sm"
                style={{ backgroundColor: "orange" }}
                onClick={props.onClick}
              >
                Add Solution
              </button>
            )}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default SS;
