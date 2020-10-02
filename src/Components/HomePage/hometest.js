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
import Modal from "react-bootstrap/Modal";
import Brain from "./Brain2.jpeg";

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
      <div className="Home row">
        <header className="homepageheader col-12">
          <nav
            class="navbar navbar-expand-lg navbar-dark"
            style={{
              borderBottom: "1px solid black",
              backgroundColor: "#323754",
            }}
          >
            <div class="container-fluid">
              <div style={{ display: "flex" }}>
                <img
                  alt=""
                  src={logo}
                  width="36"
                  height="36"
                  style={{ marginLeft: "20%" }}
                />
                <img
                  alt=""
                  src={logo1}
                  width="96"
                  height="36"
                  style={{ marginLeft: "10%", marginRight: "20px" }}
                />
              </div>
              <div class="col-auto">
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav mr-auto" style={{ color: "white" }}>
                    <li class="nav-item ">
                      <Link class="nav-link">
                        Home<span class="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#Clients">
                        Clients
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#Challenges">
                        Challenges
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#Opportunities">
                        Opportunities
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#Us">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                  <ul class="navbar-nav">
                    <li
                      class="nav-item"
                      style={{ padding: "0px", margin: "0px" }}
                    >
                      <a
                        onClick={() => this.toggleModel("signin")}
                        class="nav-link"
                        style={{ padding: "0px", margin: "0px" }}
                      >
                        Login |{" "}
                      </a>
                    </li>
                    <li
                      class="nav-item"
                      style={{ padding: "0px", margin: "0px" }}
                    >
                      <a
                        onClick={() => this.toggleModel("signup")}
                        class="nav-link"
                        style={{ padding: "0px", margin: "0px" }}
                      >
                        &nbsp;Register
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div className="homepagecontent">
            {/* <h1><i><b>&emsp;&emsp;&emsp;&emsp;Be The Change</b></i></h1> */}
            <h3>
              <i>
                <b>“What is now proved was once only imagined.”</b>
              </i>
            </h3>
          </div>
        </header>
        <section
          className="homepageabout1 row"
          style={{ height: "61vh", backgroundColor: "#fcfcfc" }}
        >
          <div
            className="homepageabcontent col-sm-12 col-md-8"
            style={{ alignItems: "center" }}
          >
            <p className="homepagetext ">
              Ideas are of paramount importance because the world is run by
              them. Development in all walks of life can be seen as replacement
              of existing ideas with newer one or improvement of existing ideas
              brought about by the ingenious objectives.
              <br />
              <br />
            </p>

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
          <div className="col-sm-0 col-md-4">
            <img
              src={Brain}
              height="25%"
              width="100%"
              style={{ backgroundColor: "blue" }}
            />
          </div>
        </section>
        <section
          className="homeabout row"
          style={{ height: "40vh", backgroundColor: "lightblue" }}
        >
          <div className="homepageabcontent" style={{ alignItems: "center" }}>
            <br />
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
              <Link to="/signin">
                <button
                  type="submit"
                  class="btn btn-warning"
                  style={{ padding: "5px 55px" }}
                >
                  <b>Join Now</b>
                </button>
              </Link>
            </p>
          </div>
        </section>
        <section className="homepageabout" style={{ height: "70vh" }}>
          <p
            className="homepagetext"
            style={{ fontSize: "50px", textAlign: "center" }}
          >
            <b>We Are Providing</b>
          </p>
          <p className="homepagetext" style={{ textAlign: "center" }}>
            We provide a platform to connect various minds together for
            improving the quality of ideas and provide
            <br />
            the best solution for many significant challenges faced by our
            society.
          </p>
          <ul
            className="homepagetext"
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "center",
            }}
          >
            <li style={{ alignItems: "center", color: "#4792c4" }}>
              <img src={hand} height="150" width="150" alt="" />
              <br />
              <b>Collaborations</b>
            </li>
            <li
              style={{
                marginLeft: "9rem",
                alignItems: "center",
                color: "#4792c4",
              }}
            >
              &emsp;&emsp;
              <img src={coin} height="150" width="150" alt="" />
              <br />
              <b>Cryptocurrency System</b>
            </li>
            <li
              style={{
                marginLeft: "9rem",
                alignItems: "center",
                color: "#4792c4",
              }}
            >
              <img alt="" src={bag} height="150" width="150" />
              <br />
              <b>Corporate Affairs</b>
            </li>
          </ul>
        </section>

        <section
          className="homepageabout2"
          id="Clients"
          style={{ height: "75vh" }}
        ></section>

        <section id="Challenges" style={{ display: "flex", height: "110vh" }}>
          <div
            className="homepageabout3"
            style={{ width: "50%", paddingTop: "15rem" }}
          >
            <div
              id="carouselExampleControls"
              className="carousel slide"
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
                          width="100%"
                          height="95%"
                          alt=""
                        />
                      </div>
                      <div class="p-3" style={{ width: "50%" }}>
                        <h3>{this.state.challenges[0].title}</h3>
                        <p>{this.state.challenges[0].description}</p>
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

          <div
            style={{
              width: "50%",
              paddingTop: "9rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <p
              className="homepagetext"
              style={{ fontSize: "60px", textAlign: "center" }}
            >
              <b>Challenges</b>
            </p>
            <div
              className="homepagetext"
              style={{ textAlign: "center", fontFamily: "Helvetica" }}
            >
              <p>
                <br />
                Take a look at current projects from our clients.
                <br />
                With the unsolvable challenges, solvers represent their ideas on
                solving the problems and are rewarded from our clients.
                <br />
                Our platform provides an opportunity for solvers to collaborate
                their solutions effectively to bring out an ingenious solution
                to the challenges.
              </p>
            </div>
          </div>
        </section>
        <section
          id="Opportunities"
          style={{ display: "flex", height: "100vh" }}
        >
          <br />
          <br />
          <div
            style={{
              width: "50%",
              paddingTop: "11rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <p
              className="homepagetext"
              style={{ fontSize: "60px", textAlign: "center" }}
            >
              <b>Opportunities</b>
            </p>
            <div
              className="homepagetext"
              style={{ textAlign: "center", fontFamily: "Helvetica" }}
            >
              <p>
                <br />
                Our platform provides Career opportunities to the solvers who
                channel innovative ideas and solutions to the challenges posted
                by our clients with a view to bring about a change to this world
                driven by technology.
              </p>
            </div>
          </div>
          <div className="homepageabout4" style={{ width: "50%" }}></div>
        </section>
        <section
          className="homepageabout5"
          id="Us"
          style={{ backgroundColor: "lightgrey", height: "104vh" }}
        >
          <br />
          <br />
          <p
            className="homepagetext"
            style={{ fontSize: "40px", color: "#d5ed8c", fontFamily: "Serif" }}
          >
            <b>Contact Us</b>
          </p>
          <div className="homepagetext" style={{ alignContent: "center" }}>
            <p
              style={{
                fontSize: "23px",
                fontFamily: "Serif",
                width: "70%",
                color: "white",
                textAlign: "center",
                margin: "auto auto",
              }}
            >
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

        <section style={{ backgroundColor: "black", height: "10vh" }}>
          <div>
            <br />
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
                color: "orange",
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
          {this.state.goto == "signup" ? <SignUp /> : <SignIn />}
        </Modal>
      </div>
    );
  }
}
