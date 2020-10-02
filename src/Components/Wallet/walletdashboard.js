import React from "react";
import { Component } from "react";
import "./walletdashboard.css";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import Wallet from "./Wallet.png";
import navLogo from "./navLogo.png";

import Axios from "axios";

class WalletDashboard extends Component {
  constructor(props) {
    super(props);

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    //let trans = localStorage.getItem('transactions')

    var loggedIn = false;

    if (token == null) {
      loggedIn = false;
    } else {
      loggedIn = true;
    }

    this.state = {
      list: [],
      length: 0,
      trans: [],
      username: "",
      token: token,
      email: email,
      loggedIn,
      visible: false,
      cash: 0,
      points: 0,
      Withdraw: false,
    };
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.setState({ loggedIn: false });
  }

  handleSubmit(e) {
    this.setState({ visible: true });
  }

  handleWithdraw(e) {
    this.setState({ Withdraw: true });
  }

  componentWillMount() {
    this.values();
  }

  values() {
    const url = "/";
    const method = "GET";
    Axios.request({
      baseURL: "/wallet/walletdetails/" + this.state.email,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.state.token,
      },
      url,
      method,
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ cash: response.data.cash });
          this.setState({ points: response.data.points });
          this.setState({ username: response.data.username });
          localStorage.setItem("un", this.state.username);
          this.details();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  details() {
    var transn = [];
    const url = "/";
    const method = "GET";
    Axios.request({
      baseURL: "/wallet/transactionDetails/" + this.state.username,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.state.token,
      },
      url,
      method,
    })
      .then((response) => {
        this.setState({ length: response.data.length });
        //let transactions = localStorage.setItem("transactions", response.data);

        var list = ["Time", "OrderId", "Recipient", "Amount"];
        this.setState({ list: list });

        for (var i = 0; i < this.state.length; i++) {
          transn.push(response.data[i]);
        }

        this.setState({ trans: transn });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var colorArray = ["white", "gray"];
    var color;
    if (!this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    if (this.state.visible == true) {
      return (
        <Redirect
          push
          to={{
            pathname: "/addfunds",
            state: { username: this.state.username, loggedIn: true },
          }}
        />
      );
    }

    if (this.state.Withdraw == true) {
      return (
        <Redirect
          push
          to={{
            pathname: "/withdrawfunds",
            state: { balance: this.state.cash },
          }}
        />
      );
    }

    return (
      <div className="global">
        <div className="titlebar-wallet">
          <button class="button-dash" onClick={this.handleSubmit}>
            Add Funds
          </button>
          <button class="button-dash" onClick={this.handleWithdraw}>
            Withdraw
          </button>
          <button class="button-dash" onClick={this.logout}>
            Logout
          </button>
        </div>

        <br></br>
        <div className="card-hello">
          <button className="button-dashb">
            <img
              src={navLogo}
              width="36"
              height="36"
              alt=""
              style={{ marginLeft: "20%" }}
            />
          </button>
        </div>
        <div className="dashboard-wallet">
          <div className="card-wallet">
            <img
              src={Wallet}
              height="125"
              width="35%"
              style={{ borderRadius: "50%", float: "left" }}
            />
            <div style={{ marginTop: "7%", marginLeft: "45%" }}>
              <h5>
                Cash Balance
                <br />
              </h5>
              <h1>
                <span>${this.state.cash}</span>
              </h1>
            </div>
          </div>

          <br />
          <br />

          <div className="card-transaction">
            <h3>Transaction History</h3>
            <br></br>

            <table style={{ width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "#4885ed" }}>
                  {this.state.list.map((head) => (
                    <div className="column-wallet">
                      <th className="heading-wallet">{head}</th>
                    </div>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.trans.map((transaction, index) =>
                  index % 2 == 0 ? (
                    <tr style={{ backgroundColor: "white" }}>
                      {transaction.map((content) => (
                        <div
                          className="column-wallet"
                          style={{ color: "black" }}
                        >
                          <td>{content}</td>
                        </div>
                      ))}
                    </tr>
                  ) : (
                    <tr style={{ backgroundColor: "gray" }}>
                      {transaction.map((content) => (
                        <div
                          className="column-wallet"
                          style={{ color: "white" }}
                        >
                          <td>{content}</td>
                        </div>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <hr />
            <p>
              * -&gt; The local time and date of the country during the payment
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default WalletDashboard;
