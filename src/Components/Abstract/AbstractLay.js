import React, { Component } from "react";
import "./Abstract.css";
import { Badge } from "react-bootstrap";
import axios from "axios";
import AbstractCard from "./AbstractCard";
import Navbar from "../Navbar/nav";

import { Redirect } from "react-router-dom";
import Axios from "axios";

class AbstractLay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // question :{
      //   id:1,
      //   QuesTitle:'New vaccine for COVID-19',
      //   Ques:'Since COVID -19 has become a pandemic it is necessary to protect before it comes. The major community of children and youngsters must be protected...',
      //   photo:'covid1.png',
      //   days:'18 days left',
      // },
      // question :[],
      question: this.props.location.state.query,
      show: false,
      showerror: false,
      balance: "",
      redirect: "",
      budget: this.props.location.state.query.RnD_Budget,
      initial: false,
      id: this.props.location.state.query.problemId,
      title: this.props.location.state.query.title,
      paid: this.props.location.state.query.paid,
      seeker: this.props.location.state.seeker,
      QAabstract: [],
    };
    this.handlePay = this.handlePay.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props.location.state.query.paid);
  }

  async componentDidMount() {
    window.addEventListener("load", this.handleLoad());

    await this.setState({
      question: {
        id: this.props.location.state.query.problemId,
        QuesTitle: this.props.location.state.query.title,
        Ques: this.props.location.state.query.description,
        photo: this.props.location.state.query.img,
        days: this.props.location.state.query.deadline,
        budget: this.props.location.state.query.RnD_Budget,
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad());
  }

  async handleLoad() {
    axios
      .get(
        `/dashboard/ppo-view/${
          this.state.question.problemId
        }/${localStorage.getItem("username")}/`
      )
      .then((response) => {
        console.log(response.data);
        this.setState(
          (this.state.QAabstract = this.state.QAabstract.concat(response.data))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleWallet(e) {
    e.preventDefault();
    const url = "/";
    const method = "GET";
    Axios.request({
      baseURL: "/wallet/walletdetails/" + localStorage.getItem("email"),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.state.token,
      },
      url,
      method,
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ balance: response.data.cash });
          if (this.state.balance < this.state.budget)
            this.setState({ showerror: true });
          else {
            this.setState({ initial: "70" });
            this.setState({ redirect: "wallet" });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePay(e) {
    e.preventDefault();
    this.setState({ initial: "70" });
    this.setState({ redirect: "bid" });
  }

  async handleClick(e) {
    e.preventDefault();

    this.setState({ show: true });
    // localStorage.setItem('payment',this.state.budget)
    // localStorage.setItem('state',this.state)
  }

  render() {
    const question = this.state.question;
    const QAabstract = this.state.QAabstract;
    if (this.state.redirect == "bid") {
      return (
        <Redirect push to={{ pathname: "/bid", state: { main: this.state } }} />
      );
    }

    if (this.state.redirect == "wallet") {
      return (
        <Redirect
          push
          to={{ pathname: "/walletpay", state: { main: this.state } }}
        />
      );
    }
    return (
      <div>
        <Navbar />
        <section>
          <center>
            <div className="divSpace">
              <div class="diagonal">Challenge</div>
              <img
                alt="asd"
                src={question.photo}
                height="220"
                width="30%"
                style={{
                  minWidth: "50px",
                  marginLeft: "-5%",
                }}
              />

              <div className="innerDiv1" style={{ overflowWrap: "break-word" }}>
                <h3
                  style={{
                    fontSize: "25px",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  {question.QuesTitle}
                </h3>
                <hr />
                <p style={{ maxHeight: "90px", overflow: "hidden" }}>
                  {question.Ques}&nbsp;&nbsp;&nbsp;
                </p>
              </div>
              <Badge variant="danger" className="badgePos">
                RnD_Budget:&nbsp;{question.budget}
              </Badge>
            </div>
          </center>
          {!this.state.paid && (
            <div
              style={{
                background: "#323754",
                textAlign: "center",
                marginLeft: "10%",
                marginRight: "8%",
                marginTop: "3%",
                borderRadius: "25px 0px 25px 0px",
              }}
            >
              <i
                className="fas fa-frown-open"
                style={{
                  float: "left",
                  fontSize: "21px",
                  marginLeft: "10%",
                  color: "gold",
                }}
              ></i>
              <i
                className="fas fa-frown-open"
                style={{
                  float: "left",
                  fontSize: "21px",
                  marginLeft: "0.8%",
                  color: "gold",
                }}
              ></i>
              <i
                className="fas fa-frown-open"
                style={{
                  float: "left",
                  fontSize: "21px",
                  marginLeft: "0.8%",
                  color: "gold",
                }}
              ></i>
              {this.state.seeker ? (
                <p style={{ color: "white" }}>
                  {" "}
                  Oops.....You have not yet paid to view the solutions. You can
                  view it only after paying full RnD. Click to pay
                  <Badge
                    variant="warning"
                    style={{ marginLeft: "3%", cursor: "pointer" }}
                    onClick={this.handleClick}
                  >
                    &nbsp;&nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;
                  </Badge>
                </p>
              ) : (
                <p style={{ color: "white" }}>
                  {" "}
                  Oops.....Your seeker have not yet paid to view the solutions.
                  You can view it only after seeker pays full RnD.
                </p>
              )}
            </div>
          )}
          {this.state.showerror && (
            <div className="red-alerts">
              <p>Recharge Your Wallet or Pay Directly</p>
            </div>
          )}

          {this.state.show && (
            <div
              className="payment-post"
              style={{
                background: "white",
                marginLeft: "70%",
                marginTop: "",
                position: "absolute",
                maxWidth: "30%",
              }}
            >
              <button class="button-p" onClick={this.handleWallet}>
                Pay With Wallet
              </button>
              <button class="button-p" onClick={this.handlePay}>
                Pay Directly
              </button>
            </div>
          )}
          <div style={{ padding: "1.8%" }}>
            {QAabstract.map((Qa) => (
              <div>
                {console.log(this.state.seeker)}
                <AbstractCard
                  absParam={Qa}
                  allData={this.state.QAabstract}
                  paid={this.props.location.state.query.paid}
                  problemId={this.props.location.state.query.problemId}
                  seeker={this.state.seeker}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default AbstractLay;
//
