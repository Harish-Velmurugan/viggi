import React from "react";
import { Component } from "react";
import "./walletdashboard.css";
import WalletPay from "./walletpay";
import "./bid.css";
import { Redirect } from "react-router-dom";
import Wallet1 from "./Wallet1.png";

class Addfunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      def: "",
      stat: false,
      redirect: false,
      username: localStorage.getItem("un"),
      loggedIn: this.props.location.state.loggedIn,
    };
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.dashboard = this.dashboard.bind(this);
  }

  handleChange(e) {
    this.setState({ def: e.target.value });
    this.setState({ amount: e.target.value });
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
    if (this.state.redirect == true) {
      return <Redirect to="/WalletDashboard" />;
    }

    if (this.state.loggedIn == false) {
      return <Redirect to="/Wallet" />;
    }

    const numberFormat = (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

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

        <div className="bidder-wallet">
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
            Add Funds to your wallet{" "}
          </h5>
          <br></br>
          <div>
            <label>
              <input
                class="bidvalue-wallet"
                type="text"
                name="amount"
                placeholder="Enter the money to deposit"
                value={this.state.def}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="cart-wallet">
            <div className="inside-wallet">
              <h3>
                Money to deposit:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
              <h3>
                Paypal Charges:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount * 0.05)}{" "}
                </span>
              </h3>
              <hr></hr>
              <p class="total-wallet">
                Total Money to deposit ${this.state.amount}:
                <span className="money-wallet">
                  <h3 style={{ marginTop: "30%" }}>
                    {numberFormat(Number(this.state.amount * 1.05))}
                  </h3>{" "}
                </span>{" "}
              </p>
            </div>
          </div>
          <div className="payps-wallet">
            <WalletPay amount={Number(this.state.amount * 1.05).toFixed(2)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Addfunds;
