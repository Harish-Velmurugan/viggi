import React, { Component } from "react";
import PayPalBtn from "./paypal";
import "./pay.css";
import Popup from "reactjs-popup";
import success from "./success.png";
import failed from "./failed.png";
import { Redirect } from "react-router-dom";

export default class WalletPay extends Component {
  constructor(props) {
    super(props);

    //let user = localStorage.getItem('un');

    this.state = {
      status: "In",
      email: "",
      amount: 0,
      time: "",
      orderId: "",
      redirect: false,
      addfunds: false,
      username: localStorage.getItem("un"),
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
    this.update();
  };
  onCancel = (data) => {
    this.setState({ status: "Cancelled" });
  };
  handleclose() {
    this.setState({ status: "Incomplete" });
  }

  handlesuccess() {
    this.setState({ addfunds: true });
    this.setState({ redirect: true });
  }

  update() {
    var amt = this.state.amount / 1.05;
    var url = "/wallet/walletupdate/" + this.state.username + "/" + amt + "/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + this.state.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });

    url =
      "/wallet/transactionUpdate/" +
      this.state.username +
      "/" +
      this.state.orderId +
      "/" +
      this.state.time +
      "/" +
      this.state.email +
      "/" +
      amt +
      "/";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + this.state.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/walletdashboard" />;
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
            <div className="arrange-details-pp">
              <img src={success} className="success-wallet" alt="success " />
              <br />
              <br />
              <br />
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
