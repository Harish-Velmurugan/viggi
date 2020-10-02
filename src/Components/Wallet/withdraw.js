import React from "react";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./withdraw.css";
import Popup from "reactjs-popup";
import success from "./success.png";
import Wallet1 from "./Wallet1.png";

class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      username: localStorage.getItem("un"),
      token: localStorage.getItem("token"),
      email: "",
      cnfemail: "",
      balance: this.props.location.state.balance,
      redirect: false,
      loggedIn: true,
      access: "",
      show: false,
      popup: false,
      date: "",
      orderid: "",
      place: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.logout = this.logout.bind(this);
    this.dashboard = this.dashboard.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({ show: false });
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    this.setState({ redirect: false });
    var qs = require("qs");
    var data = qs.stringify({
      grant_type: "client_credentials",
    });
    let place = "Max amount: $" + this.state.balance;
    this.setState({ place: place });

    axios({
      method: "post",
      url: "https://api.sandbox.paypal.com/v1/oauth2/token",
      headers: {
        Authorization:
          "Basic QVJjSG9XWjFwM1ZTZHZZVDNKeGQyWF9HcWt4SEhNUjY1QmRhRVZZb0ppaVFPMElGVXN3aEhDUlRDNXFFY1hEQ1FTQ3pDV3JlUEhVdFAzMWc6RUhvd3hxaDhmUk1tc2lXTkE3d0hCNldZZ3NYWWN0R3dWV1FYSWNOdkhlZHVVaGlKclhRdDFDSzZ2OVh1allsakNpMzZPRnFhVFE2R2NxczM=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    })
      .then((response) => {
        this.setState({ access: response.data.access_token });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Withdraw(e) {
    e.preventDefault();
    if (this.state.email == this.state.cnfemail) {
      this.process();
    } else this.setState({ show: true });
  }

  process() {
    let auth = "Bearer " + this.state.access;
    axios({
      method: "POST",
      url: "https://api.sandbox.paypal.com/v1/payments/payouts",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      data: {
        sender_batch_header: {
          sender_batch_id: Math.floor(Math.random() * 1000000000),
          email_subject: "You have a payout!",
          email_message:
            "You have received a payout! Thanks for using our service!",
        },
        items: [
          {
            recipient_type: "EMAIL",
            amount: {
              value: this.state.amount,
              currency: "USD",
            },
            note: "Thanks for your patronage!",
            sender_item_id: "201403140010",
            receiver: this.state.email,
          },
        ],
      },
    })
      .then((response) => {
        this.updateBalance(response.data.batch_header.payout_batch_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateBalance(id) {
    let auth = "Bearer " + this.state.access;
    axios({
      method: "GET",
      url:
        "https://api.sandbox.paypal.com/v1/payments/payouts/" +
        id +
        "?fields=batch_header",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    })
      .then((response) => {
        let time = response.data.batch_header.time_created;
        let amount =
          Number(response.data.batch_header.amount.value) +
          Number(response.data.batch_header.fees.value);
        let orderid = id;
        this.setState({ date: time });
        this.setState({ orderid: orderid });

        var url =
          "/wallet/walletwithdraw/" + this.state.username + "/" + amount + "/";
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
          orderid +
          "/" +
          time +
          "/" +
          this.state.email +
          "/" +
          amount +
          "/";
        fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer" + this.state.token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            this.setState({ redirect: true });
          })
          .catch(function (error) {
            console.log(error);
          });

        this.setState({ popup: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout(e) {
    e.preventDefault();
    this.setState({ loggedIn: false });
  }

  dashboard(e) {
    e.preventDefault();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/walletdashboard" />;
    }

    if (!this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    if (this.state.popup) {
      return (
        <div>
          <Popup
            modal
            closeOnDocumentClick
            onClose={this.handlesuccess}
            open={true}
          >
            <div className="arrange-details-ppp">
              <img src={success} alt="success "></img>
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

    return (
      <div>
        <div className="titlebar-wallet">
          <button class="button-dash" onClick={this.dashboard}>
            Dashboard
          </button>
          <button class="button-dash" onClick={this.logout}>
            Logout
          </button>
        </div>

        <div className="withdraw-card">
          <form onSubmit={this.Withdraw}>
            <div className="withdraw-wallet">
              <img
                src={Wallet1}
                height="150"
                width="150"
                style={{ borderRadius: "50%", marginTop: "-5%" }}
              />
              <input
                className="withdraw-input"
                type="number"
                name="amount"
                placeholder={this.state.place}
                id="money"
                min="0"
                max={this.state.balance}
                value={this.state.amount}
                onChange={this.handleChange}
                required
              />

              <input
                className="withdraw-input"
                type="email"
                name="email"
                placeholder="Enter the email linked to Paypal"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />

              <input
                className="withdraw-input"
                type="email"
                name="cnfemail"
                placeholder="Confirm email linked to Paypal"
                onChange={this.handleChange}
                value={this.state.cnfemail}
                required
              />

              <input
                className="withdraw-button"
                type="submit"
                value="Withdraw"
              />
            </div>
          </form>
          {this.state.show && (
            <div className="red-alert">
              <h5>Emails Dont Match! Please Check! </h5>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Withdraw;
