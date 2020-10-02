import React from "react";
import { Component } from "react";
import "./bid.css";
import Pay from "./pay";
import Navbar from "../Navbar/nav";
import Wallet1 from "./Wallet1.png";

class bid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // usn: this.props.state.username,
      budget: this.props.location.state.main.budget,
      id: this.props.location.state.main.id,
      buckets: this.props.location.state.main.buckets,
      title: this.props.location.state.main.title,
      description: this.props.location.state.main.description,
      desc: this.props.location.state.main.desc,
      logo: this.props.location.state.main.logo,
      img: this.props.location.state.main.img,
      deadline: this.props.location.state.main.deadline,
      file: this.props.location.state.main.file,
      skill1: this.props.location.state.main.skill1,
      skill2: this.props.location.state.main.skill2,
      skill3: this.props.location.state.main.skill3,
      skill4: this.props.location.state.main.skill4,
      successMsg: this.props.location.state.main.successMsg,
      redirect: this.props.location.state.main.redirect,
      selectedValue: this.props.location.state.main.selectedValue,
      initial: this.props.location.state.main.initial,
      nid: this.props.location.state.main.nid,
      amount: "",
      choice: this.props.location.state.main.choice,
    };

    this.CalculateAmount = this.CalculateAmount.bind(this);
  }

  componentWillMount() {
    this.CalculateAmount();
  }

  CalculateAmount() {
    console.log(this.state.choice);
    if (this.state.initial == "30") {
      let amt = this.state.budget;
      this.setState({ amount: Number(amt * 0.3).toFixed(2) });
    } else if (this.state.initial == "70") {
      let amt = this.state.budget;
      this.setState({ amount: Number(amt * 0.7).toFixed(2) });
    } else if (this.state.initial == "expert") {
      let amt = this.state.budget;
      this.setState({ amount: Number(amt).toFixed(2) });
    } else if (this.state.initial == "forumpost") {
      let amt = this.state.budget;
      this.setState({ amount: Number(amt * 0.07).toFixed(2) });
    }
  }

  render() {
    const numberFormat = (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

    return (
      <div className="bidder-wallet">
        {console.log(this.state.initial)}
        <br></br>
        <br></br>
        <Navbar />
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
            {this.state.initial == "30" && (
              <h3>
                Money to post this problem:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
            )}
            {this.state.initial == "70" && (
              <h3>
                Money to view solution:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
            )}
            {this.state.initial == "forumpost" && (
              <h3>
                Money to post wicked problem:{" "}
                <span className="money-wallet">
                  {numberFormat(this.state.amount)}{" "}
                </span>
              </h3>
            )}
            {this.state.initial == "expert" && (
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
            <h3>
              Paypal Charges:{" "}
              <span className="money-wallet">
                {numberFormat(Number(this.state.amount) * 0.05)}{" "}
              </span>
            </h3>
            <hr></hr>
            <h3>
              Total Charges:
              <span className="money-wallet">
                {numberFormat(Number(this.state.amount * 1.05 + 3))}{" "}
              </span>
            </h3>
          </div>
        </div>
        <div className="payps-wallet">
          <Pay
            amount={Number(this.state.amount * 1.05 + 3).toFixed(2)}
            state={this.state}
          />
        </div>
      </div>
    );
  }
}

export default bid;
