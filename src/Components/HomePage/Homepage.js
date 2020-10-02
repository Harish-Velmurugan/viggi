import React, { Component } from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./navLogo.png";
import logo1 from "./navVignatree.png";
import hand from "./hands.jpg";
import coin from "./coin.jpg";
import bag from "./bag.jpg";
import Model from "react-modal";
import SignIn from "../SignIn/signInTest";
import SignUp from "../SignUp/singupTest";
import Register from "../SignUp/Creg";
import Modal from "react-bootstrap/Modal";
import clientImage from "./clients.png";
import bulidingImage from "./o3.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SignIn: true,
      challenges: [],
      active: true,
      modelOpen: false,
      goto: "",
    };
    this.toggle = this.toggle.bind(this);
    this.fetchTask = this.fetchTask.bind(this);
    this.getActive = this.getActive.bind(this);
  }

  toggle() {
    this.setState({ SignIn: false });
  }
  getActive() {
    if (this.state.active) {
      this.setState({ active: false });
      return true;
    } else {
      return false;
    }
  }

  async fetchTask() {
    await axios.get("/dashboard/topChallangesHomePage/").then((response) => {
      this.setState({ challenges: response.data });
    });
  }

  async componentDidMount() {
    this.fetchTask();
  }

  toggleModel(to) {
    this.setState({ goto: to });
    this.setState({ modelOpen: !this.state.modelOpen });
  }
  closeMode() {
    this.setState({ modelOpen: !this.state.modelOpen });
  }

  render() {
    return (
      <div className="row">
        <header className="homepageheader col-sm-12">
          <nav
            class="navbar fixed-top navbar-expand-lg navbar-dark"
            style={{
              borderBottom: "1px solid black",
              backgroundColor: "#323754",
            }}
          >
            <div className="ml-4 mr-5" style={{ display: "flex" }}>
              <img
                alt=""
                src={logo}
                width="36"
                height="36"
                style={{ marginLeft: "10%" }}
              />
              <img
                alt=""
                src={logo1}
                width="96"
                height="36"
                style={{ marginLeft: "5%" }}
              />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="container-fluid ml-5">
              <div className="col-auto ml-5">
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo01"
                >
                  <ul className="navbar-nav" style={{ color: "white" }}>
                    <li className="nav-item ">
                      <Link className="nav-link">
                        Home<span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#Clients">
                        Clients
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#Challenges">
                        Challenges
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#Opportunities">
                        Opportunities
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#Us">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        class="nav-link"
                        href="#"
                        onClick={() => this.toggleModel("register", "company")}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Join as Company
                      </a>
                    </li>
                    <li className="nav-item " style={{ marginRight: "0px" }}>
                      <a
                        onClick={() => this.toggleModel("signin")}
                        className="nav-link ml-5"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ marginRight: "0px" }}
                      >
                        Login &nbsp;&nbsp;&nbsp;|
                      </a>
                    </li>
                    <li className="nav-item ">
                      <a
                        class="nav-link"
                        href="#"
                        onClick={() => this.toggleModel("signup")}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div className="homepagecontent">
            {/* <h1><i><b>&emsp;&emsp;&emsp;&emsp;Be The Change</b></i></h1> */}
            <p>
              <i>
                <b>“What is now proved was once only imagined.”</b>
              </i>
            </p>
          </div>
        </header>
        <section
          className="homepageabout1 col-sm-12"
          style={{ backgroundColor: "#fcfcfc" }}
        >
          <div className="homepageabcontent">
            <p className="homepagetext ">
              Ideas are of paramount importance because the world is run by
              them. Development in all walks of life can be seen as replacement
              of existing ideas with newer one or improvement of existing ideas
              brought about by the ingenious objectives.
            </p>
            <br />
            <br />
            <p className="homepagetext">
              <small>
                A basic idea can take an overwhelming number of different forms
                and can be applied in many different ways. Although the
                difference between a successful business venture and a failed
                one lies in the execution, it’s important to acknowledge the
                significance of a great idea for <b>--</b> even the most
                proficient executor can’t thrive and flourish without the seed
                of an excellent idea.
              </small>
            </p>
          </div>
        </section>
        <section
          className="homeabout col-sm-12"
          style={{ backgroundColor: "lightblue" }}
        >
          <div style={{ alignItems: "center", padding: "3rem" }}>
            <br />
            <p
              className="homepagetext"
              style={{ textAlign: "center", color: "black" }}
            >
              Imagine the power of the capability to solve any problem by making
              the world's best
              <br /> and brightest minds to work on the issue.
              <br />
              You can always get the solution what you are looking for.
            </p>
            <br />
            <p style={{ textAlign: "center" }}>
              <Link to="">
                <button
                  type="submit"
                  class="btn btn-warning"
                  style={{ padding: "5px 55px" }}
                  onClick={() => this.toggleModel("signup")}
                >
                  <b>Join Now</b>
                </button>
              </Link>
            </p>
          </div>
        </section>
        <section className="homepageabout col-sm-12">
          <div className="col-sm-12">
            <p className="homepagetext" style={{ textAlign: "center" }}>
              <h1 style={{ fontWeight: "600" }}>We Are Providing</h1>
            </p>
            <p className="homepagetext" style={{ textAlign: "center" }}>
              We provide a platform to connect various minds together for
              improving the quality of ideas and provide
              <br />
              the best solution for many significant challenges faced by our
              society.
            </p>
          </div>
          <ul
            className="homepagetext col-sm-12 row justify-content-center"
            style={{ color: "#4792c4" }}
          >
            <li className="col-sm-12 col-md-3">
              <div className="ml-5">
                <img src={hand} height="150" width="150" alt="" />
                <br />
                <b>Collaborations</b>
              </div>
            </li>
            <li className="col-sm-12 col-md-3">
              <div className="ml-5">
                <img src={coin} height="150" width="150" alt="" />
                <br />
                <b>Cryptocurrency System</b>
              </div>
            </li>
            <li className="col-sm-12 col-md-3">
              <div className="ml-5">
                <img alt="" src={bag} height="150" width="150" />
                <br />
                <b>Corporate Affairs</b>
              </div>
            </li>
          </ul>
        </section>

        {/* <section
          className="homepageabout2 col-sm-12"
          id="Clients"
          style={{ height: "70vh" }}
        ></section> */}
        <section id="Clients row col-sm-12" style={{ width: "100%" }}>
          <img
            src={clientImage}
            className="col-sm-12"
            style={{ height: "70vh" }}
          />
        </section>

        <section id="Challenges" className="col-sm-12">
          <div className="row">
            <div className="homepageabout3 col-sm-12 col-md-6 challenges">
              <div
                id="carouselExampleControls"
                className="carousel slide col-sm-12"
                data-ride="carousel"
                style={{
                  width: "100%",
                  height: "50%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <div className="carousel-inner">
                  {this.state.challenges[0] !== undefined && (
                    <div class="carousel-item active">
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "35%", paddingTop: "1rem" }}>
                          <img
                            src={this.state.challenges[0].img}
                            class="rounded float-left p-3"
                            width="50"
                            height="50"
                            alt=""
                          />
                        </div>
                        <div class="p-3" style={{ width: "50%" }}>
                          <h3>{this.state.challenges[0].title}</h3>
                          {/* <p>{this.state.challenges[0].description}</p> */}
                          <p>
                            <b>DeadLine</b> :{" "}
                            {this.state.challenges[0].deadline.split("", 10)}
                          </p>
                          <h4>&#8377; {this.state.challenges[0].RnD_Budget}</h4>
                          <h5>
                            <span className="badge badge-pill badge-warning">
                              Ongoing
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.challenges[1] !== undefined && (
                    <div class="carousel-item">
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "35%", paddingTop: "1rem" }}>
                          <img
                            src={this.state.challenges[1].img}
                            class="rounded float-left p-3"
                            width="100%"
                            height="95%"
                            alt=""
                          />
                        </div>
                        <div class="p-3">
                          <h3>{this.state.challenges[1].title}</h3>
                          <p>{this.state.challenges[1].description}</p>
                          <p>
                            <b>DeadLine</b> :{" "}
                            {this.state.challenges[1].deadline.split("", 10)}
                          </p>
                          <h4>&#8377; {this.state.challenges[1].RnD_Budget}</h4>
                          <h5>
                            <span className="badge badge-pill badge-warning">
                              Ongoing
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.challenges[2] !== undefined && (
                    <div class="carousel-item">
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "35%", paddingTop: "1rem" }}>
                          <img
                            src={this.state.challenges[2].img}
                            class="rounded float-left p-3"
                            width="100%"
                            height="95%"
                            alt=""
                          />
                        </div>
                        <div class="p-3">
                          <h3>{this.state.challenges[2].title}</h3>
                          <p>{this.state.challenges[2].description}</p>
                          <p>
                            <b>DeadLine</b> :{" "}
                            {this.state.challenges[2].deadline.split("", 10)}
                          </p>
                          <h4>&#8377; {this.state.challenges[2].RnD_Budget}</h4>
                          <h5>
                            <span className="badge badge-pill badge-warning">
                              Ongoing
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.challenges[3] !== undefined && (
                    <div class="carousel-item">
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "35%", paddingTop: "1rem" }}>
                          <img
                            src={this.state.challenges[3].img}
                            class="rounded float-left p-3"
                            width="100%"
                            height="95%"
                            alt=""
                          />
                        </div>
                        <div class="p-3">
                          <h3>{this.state.challenges[3].title}</h3>
                          <p>{this.state.challenges[3].description}</p>
                          <p>
                            <b>DeadLine</b> :{" "}
                            {this.state.challenges[3].deadline.split("", 10)}
                          </p>
                          <h4>&#8377; {this.state.challenges[3].RnD_Budget}</h4>
                          <h5>
                            <span className="badge badge-pill badge-warning">
                              Ongoing
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 challenges">
              <p className="homepagetext" style={{ textAlign: "center" }}>
                <h1 style={{ fontWeight: "600" }}>Challenges</h1>
              </p>
              <div
                className="homepagetext"
                style={{ textAlign: "center", fontFamily: "Helvetica" }}
              >
                <p>
                  <br />
                  Take a look at current projects from our clients.
                  <br />
                  With the unsolvable challenges, solvers represent their ideas
                  on solving the problems and are rewarded from our clients.
                  <br />
                  Our platform provides an opportunity for solvers to
                  collaborate their solutions effectively to bring out an
                  ingenious solution to the challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="col-sm-12"
          id="Opportunities"
          style={{ display: "flex" }}
        >
          <div className="row">
            <div
              className="col-sm-12 col-md-6 opportunities"
              style={{ textAlign: "center" }}
            >
              <h1 style={{ fontWeight: "600" }}>Opportunities</h1>
              <p className="homepagetext" style={{ fontFamily: "Helvetica" }}>
                <br />
                Our platform provides Career opportunities to the solvers who
                channel innovative ideas and solutions to the challenges posted
                by our clients with a view to bring about a change to this world
                driven by technology.
              </p>
            </div>
            <div className="homepageabout4 col-md-6 col-sm-0"></div>
          </div>
        </section>
        <section
          className="homepageabout5 col-sm-12"
          id="Us"
          style={{ backgroundColor: "lightgrey", fontFamily: "Serif" }}
        >
          <br />
          <br />
          <p className="homepagetext" style={{ color: "#d5ed8c" }}>
            <h1>Contact Us</h1>
          </p>
          <div className="homepagetext" style={{ alignContent: "center" }}>
            <p className="contactus">
              <br />
              Distributed in a previously unsearchable crowd are insights,
              flashes of genius and ideas that would never have been evident
              from job applications, resumes or consulting brochures. VignaTree
              provides the network, methodology, platform, and expert support
              for the innovative potential of this connected world to be fully
              realized.
            </p>
            <br />
            <br />
            <br />
            <p
              style={{
                textAlign: "center",
                margin: "auto auto",
                color: "white",
              }}
            >
              OUR OFFICE
            </p>
            <br />
            <p
              style={{
                textAlign: "center",
                margin: "auto auto",
                color: "white",
              }}
            >
              VignaTree,Inc
              <br />
              Chennai
              <br />
              India
              <br />
              Phone: +91XXXXXXXXXX
            </p>
          </div>
        </section>

        <section className="col-sm-12" style={{ backgroundColor: "black" }}>
          <div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
                color: "orange",
                padding: "1rem",
              }}
            >
              <li
                style={{
                  borderRight: "1px solid white",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                Services
              </li>
              <li
                style={{
                  borderRight: "1px solid white",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                Support
              </li>
              <li
                style={{
                  borderRight: "1px solid white",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                Terms and Conditions
              </li>
              <li style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                Privacy Policy
              </li>
            </ul>
          </div>
        </section>
        <Modal
          show={this.state.modelOpen}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => this.closeMode()}
        >
          {(() => {
            if (this.state.goto == "signup") {
              return <SignUp />;
            } else if (this.state.goto == "register") {
              return <Register />;
            } else {
              return <SignIn />;
            }
          })()}
        </Modal>
      </div>
    );
  }
}
