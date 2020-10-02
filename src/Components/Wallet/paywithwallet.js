import React, { Component } from "react";
import "./bid.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Popup from "reactjs-popup";
import success from "./success.png";
import failed from "./failed.png";
import Navbar from "../Navbar/nav";
import Wallet1 from "./Wallet1.png";

class PayWithWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.location.state.main.budget || "",
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      redirect: false,
      popup: false,
      date: "",
      orderid: "",
      nid: this.props.location.state.main.nid,
      choice: this.props.location.state.main.choice,
      ven :this.props.location.state.main.ven,
    };

    this.data = {
      usn: localStorage.getItem("un"),
      budget: this.props.location.state.main.budget,
      buckets: this.props.location.state.main.buckets,
      RnD_Budget: this.props.location.state.main.budget,
      id: this.props.location.state.main.id,
      title: this.props.location.state.main.title,
      description: this.props.location.state.main.description,
      logo: this.props.location.state.main.logo,
      img: this.props.location.state.main.img,
      desc: this.props.location.state.main.desc,
      deadline: this.props.location.state.main.deadline,
      file: this.props.location.state.main.file,
      skill1: this.props.location.state.main.skill1,
      skill2: this.props.location.state.main.skill2,
      skill3: this.props.location.state.main.skill3,
      skill4: this.props.location.state.main.skill4,
      successMsg: this.props.location.state.main.successMsg,
      redirect: this.props.location.state.main.redirect,
      initial: this.props.location.state.main.initial,
      paid: true,
    };

    this.pay = this.pay.bind(this);
    this.handlesuccess = this.handlesuccess.bind(this);
  }

  componentWillMount() {
    this.CalculateAmount();
  }

  CalculateAmount() {
    if (this.data.initial == "30") {
      let amt = this.data.budget;
      this.setState({ amount: Number(amt * 0.3).toFixed(2) });
    } else if (this.data.initial == "70") {
      let amt = this.data.budget;
      this.setState({ amount: Number(amt * 0.7).toFixed(2) });
    } else if (this.data.initial == "forumpost") {
      let amt = this.data.budget;
      this.setState({ amount: Number(amt * 0.07).toFixed(2) });
    } else if (this.data.initial == "expert") {
      let amt = this.data.budget;
      this.setState({ amount: Number(amt).toFixed(2) });
    }
  }

  handlesuccess(e) {
    e.preventDefault();
    this.setState({ redirect: true });
  }
  post() {
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
    axios.post("/post/", formdata).then((response) => {});
  }

  forumpost() {
    let username = this.data.id;
    let title = this.data.title;
    let desc = this.data.desc;
    let RnD_Budget = this.data.budget;
    let buckets = this.data.buckets;
    let img = this.data.img;
    let file = this.data.file;

    console.log(username);

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
    axios.post("/forum/postSubmission/", formdata).then((response) => {});
  }

  pay() {
    console.log("hiii");
    let amt = Number(this.state.amount) + 3;
    var url = "/wallet/walletwithdraw/" + this.state.username + "/" + amt + "/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + this.state.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        let orderid = Math.floor(Math.random() * 1000000000);
        let date = moment().format("YYYY-MM-DD hh:mm:ss") + "*";
        var url = `/wallet/transactionUpdate/${this.state.username}/${orderid}/${date}/payment-${this.data.title}/${amt}/`;

        fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer" + this.state.token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (this.data.initial == "30") {
              this.post();
            } else if (this.data.initial == "70") {
              axios.post("/post/checkPaid/" + this.data.id + "/");
            } else if (this.data.initial == "expert") {

              if(this.state.choice == "data"){
                console.log(this.state.nid)
                axios.post("/helper/DPPaid/" + this.state.nid + "/"+this.state.ven + "/" );
              }
              else{
              axios
                .post("/api/expertPayProblem/" + this.state.nid + "/")
                .then((response) => {})
                .catch((error) => {
                  console.log("error");
                });
              }
            } else if (this.data.initial == "forumpost") {
              this.forumpost();
            }
            this.setState({ popup: "success" });
            this.setState({ date: date });
            this.setState({ orderid: orderid });
            this.setState({ amount: amt });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        this.setState({ popup: "failed" });
        console.log(error);
      });
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
      if( this.data.choice == "data"){
         return (
           <Redirect to={{ pathname: "/dashboard/helpers/", state: { query: this.data } }} />
         );
      }else{
        return (
          <Redirect to={{ pathname: "/dashboard/helpers/", state: { query: this.data } }} />
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

    if (this.state.popup == "success") {
      return (
        <div>
          <Popup
            modal
            closeOnDocumentClick
            onClose={this.handlesuccess}
            open={true}
          >
            <div className="arrange-details-p">
              <img src={success} alt="success " />
              <p>
                Payment Status: <span className="col-wallet">Completed</span>
              </p>
              <p>
                Time: <span className="col-wallet">{this.state.date}</span>
              </p>
              <p>
                Payment Amount:{" "}
                <span className="col-wallet"> {this.state.amount}</span>
              </p>
              <p>
                OrderId:{" "}
                <span className="col-wallet">{this.state.orderid}</span>
              </p>
              <p>Please Take a screenshot for future references!</p>
            </div>
          </Popup>
        </div>
      );
    }

    if (this.state.popup == "failed") {
      return (
        <div>
          <Popup modal closeOnDocumentClick open={true}>
            <div className="arrange-details">
              <img className="failed-wallet" src={failed} alt="failed" />
              <br></br>
              <br></br>
              <h3>Payment Status : Failed</h3>
              <h3>Last Transaction failed!</h3>
              <h3> Please repeat the payment process again to continue!</h3>
            </div>
          </Popup>
        </div>
      );
    }

    const numberFormat = (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

    return (
      <div className="bidder-wallet">
        <Navbar />
        <br />
        <br />
        <img
          src={Wallet1}
          height="150"
          width="150"
          style={{ borderRadius: "50%" }}
        />
        <h5
          style={{
            color: "#4885ed",
            fontWeight: "bolder",
            marginLeft: "3%",
            marginTop: "1.5%",
          }}
        >
          Kindly Check the Reward Money and continue the Transaction
        </h5>
        <br></br>
        <div>
          <p class="bidvalue-wallet"> {this.state.amount}</p>
        </div>
        <div className="cart-wallet">
          <div className="inside-wallet">
            {this.data.initial == "30" && (
              <h3>
                Money to post this problem:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
            )}
            {this.data.initial == "forumpost" && (
              <h3>
                Money to post this wicked problem:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
            )}
            {this.data.initial == "70" && (
              <h3>
                Money to view solution:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
            )}
            {this.data.initial == "expert" && (
              <>
                {this.state.choice == "solution" && (
                  <h3>
                    Money to decompose solution:{" "}
                    <span className="money-wallet">
                      {numberFormat(this.state.amount)}{" "}
                    </span>
                  </h3>
                )}

                {this.state.choice == "problem" && (
                  <h3>
                    Money to frame problem:{" "}
                    <span className="money-wallet">
                      {numberFormat(this.state.amount)}{" "}
                    </span>
                  </h3>
                )}

                {this.state.choice=="wicked" && 
                <h3>
                  Money to solve wicked problem:{" "}
                  <span className="money-wallet">
                    {numberFormat(this.state.amount)}{" "}
                  </span>
                </h3>
                 }

                 {this.state.choice=="data" && 
                <h3>
                  Money to view attachments:{" "}
                  <span className="money-wallet">
                    {numberFormat(this.state.amount)}{" "}
                  </span>
                </h3>
                 }
              </>
            )}
            <h3>
              Site Maintenance Fee:{" "}
              <span className="money-wallet">{numberFormat(3)} </span>
            </h3>
            <hr></hr>
            <h3>
              Total Charges:
              <span className="money-wallet">
                {numberFormat(Number(this.state.amount) + 3)}{" "}
              </span>
            </h3>
            <hr></hr>
          </div>
        </div>
        <button class="button-with-w" onClick={this.pay}>
          {" "}
          Pay With Wallet{" "}
        </button>
      </div>
    );
  }
}
export default PayWithWallet;
