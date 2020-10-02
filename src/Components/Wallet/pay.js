import React, { Component } from "react";
import PayPalBtn from "./paypal";
import "./pay.css";
import Popup from "reactjs-popup";
import success from "./success.png";
import failed from "./failed.png";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Pay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "Incomplete",
      email: "",
      amount: 0,
      time: "",
      orderId: "",
      redirect: false,
      username: localStorage.getItem("username"),
      nid: this.props.state.nid,
      choice: this.props.state.choice,
    };

    this.data = {
      budget: this.props.state.budget,
      usn: this.props.state.username,
      buckets: this.props.state.buckets,
      RnD_Budget: this.props.state.budget,
      id: this.props.state.id,
      title: this.props.state.title,
      description: this.props.state.description,
      desc: this.props.state.desc,
      logo: this.props.state.logo,
      img: this.props.state.img,
      deadline: this.props.state.deadline,
      file: this.props.state.file,
      skill1: this.props.state.skill1,
      skill2: this.props.state.skill2,
      skill3: this.props.state.skill3,
      skill4: this.props.state.skill4,
      successMsg: this.props.state.successMsg,
      redirect: this.props.state.redirect,
      initial: this.props.state.initial,
      paid: true,
    };
    this.handleclose = this.handleclose.bind(this);
    this.handlesuccess = this.handlesuccess.bind(this);
  }

  paymentHandler = (details, data) => {
    /** Here you can call your backend API
        endpoint and update the database */
    this.setState({ status: "Completed" });
    this.setState({ time: details.create_time });
    this.setState({ email: details.purchase_units[0].payee.email_address });
    this.setState({ amount: details.purchase_units[0].amount.value });
    this.setState({ orderId: data.orderID });
  };
  onCancel = (data) => {
    this.setState({ status: "Cancelled" });
  };
  handleclose() {
    this.setState({ status: "Incomplete" });
  }

  async handlesuccess() {
    if (this.data.initial == "30") {
      let username = this.data.id;
      let title = this.data.title;
      let description = this.data.description;
      let RnD_Budget = this.data.budget;
      let d = new Date(this.data.deadline);
      let skill =
        this.data.skill1 +
        "," +
        this.data.skill2 +
        "," +
        this.data.skill3 +
        "," +
        this.data.skill4;
      let logo = this.data.logo;
      let file = this.data.file;

      let deadline =
        d.getFullYear() +
        "-" +
        d.getMonth() +
        "-" +
        d.getDate() +
        "T" +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getMilliseconds() +
        "Z";

      let formdata = new FormData();

      formdata.append("username", username);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("RnD_Budget", RnD_Budget);
      formdata.append("deadline", deadline);
      formdata.append("skill", skill);
      formdata.append("img", logo);
      formdata.append("files", file);

      /*for (var value of formdata.values()) {
  
         }*/

      await axios.post("/post/", formdata).then((response) => {});
    }
    if (this.data.initial == "forumpost") {
      let username = this.data.id;
      let title = this.data.title;
      let desc = this.data.desc;
      let RnD_Budget = this.data.budget;
      let buckets = this.data.buckets;
      let img = this.data.img;
      let file = this.data.file;

      let formdata = new FormData();

      formdata.append("username", username);
      formdata.append("title", title);
      formdata.append("desc", desc);
      formdata.append("budget", RnD_Budget);
      formdata.append("buckets", buckets);
      formdata.append("img", img);
      formdata.append("files", file);

      /*for (var value of formdata.values()) { 
           }*/
      await axios
        .post("/forun/postSubmission/", formdata)
        .then((response) => {});
    } else if (this.data.initial == "70") {
      axios.post("/post/checkPaid/" + this.data.id + "/");
    } else if (this.data.initial == "expert") {
      if (this.state.choice == "data") {
        await axios.post("/helper/DPPaid/" + this.state.nid + "/");
      } else {
        await axios
          .post("/api/expertPayProblem/" + this.state.nid + "/")
          .then((response) => {})
          .catch((error) => {
            console.log("error");
          });
      }
    }
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect && this.data.initial == "30") {
      return <Redirect to="/dashboard/ProblemPosted" />;
    }
    if (this.data.initial == "70" && this.state.redirect) {
      return (
        <Redirect to={{ pathname: "/abstract", state: { query: this.data } }} />
      );
    }
    if (this.data.initial == "expert" && this.state.redirect) {
      if (this.data.choice == "data") {
        return (
          <Redirect to={{ pathname: "/dashboard/helpers/", state: { query: this.data } }} />
        );
      } else {
        return (
          <Redirect to={{ pathname: "/chat/", state: { query: this.data } }} />
        );
      }
    }
    if (this.data.initial == "forumpost" && this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard/problemRefining",
            state: { query: this.data },
          }}
        />
      );
    }

    if (this.state.status == "Cancelled") {
      return (
        <div>
          <Popup
            modal
            closeOnDocumentClick
            onClose={this.handleclose}
            open={true}
          >
            <div className="arrange-details" style={{ background: "none" }}>
              <img className="failed-wallet" src={failed} alt="failed" />
              <br></br>
              <br></br>
              <h3>Payment Status : {this.state.status}</h3>
              <h3>Last Transaction failed!</h3>
              <h3> Please repeat the payment process again to continue!</h3>
            </div>
          </Popup>
        </div>
      );
    }
    if (this.state.status == "Completed") {
      return (
        <div>
          <Popup
            modal
            closeOnDocumentClick
            onClose={this.handlesuccess}
            open={true}
          >
            <div className="arrange-details">
              <img src={success} alt="success " />
              <p>
                Payment Status:{" "}
                <span className="col-wallet">{this.state.status}</span>
              </p>
              <p>
                Time: <span className="col-wallet">{this.state.time}</span>
              </p>
              <p>
                Payee Email:
                <span className="col-wallet"> {this.state.email}</span>
              </p>
              <p>
                Payment Amount:{" "}
                <span className="col-wallet"> {this.state.amount}</span>
              </p>
              <p>
                OrderId:{" "}
                <span className="col-wallet">{this.state.orderId}</span>
              </p>
              <p>Please Take a screenshot for future references!</p>
            </div>
          </Popup>
        </div>
      );
    }
    return (
      <div>
        <PayPalBtn
          amount={this.props.amount}
          currency={"USD"}
          onSuccess={this.paymentHandler}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
