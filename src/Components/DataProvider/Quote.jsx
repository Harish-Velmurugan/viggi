import React from "react";
import axios from "axios";
import Axios from "axios";
import { Button,Badge } from "react-bootstrap";
import { Redirect } from "react-router";
class Quote extends React.Component {
  constructor() {
    super();
    this.state = {
      req: [],
      quote: [],
      redirect: null,
      nid: "",
      budget: "",
      id:"",
      accept:"",
      choice:"data",
      reqid:"",
      ven:"tech"
    };
    this.QuoteAccept = this.QuoteAccept.bind(this);
    this.SingleAccept = this.SingleAccept.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(
        "http://127.0.0.1:8000/helper/quoteView/" +
          localStorage.getItem("username") +
          "/"
      )
      .then((res) => {
        this.setState({ req: res.data[0] });
        console.log(res.data);
      });
    for (let i = 0; i < this.state.req.length; i++) {
      axios
        .get(
          "http://127.0.0.1:8000/helper/quoteView2/" +
            this.state.req[i].reqID +
            "/"
        )
        .then((res) => {
          let quote = this.state.quote.slice();
          quote[i] = res.data[0];
          this.setState({ quote: quote });
        });
    }
  }

  async SingleAccept(rid) {
    axios.get("/helper/singleaccept/" + rid + "/").then((response) => {
      this.setState({ acpt: response.data });
      console.log(response.data);
    });
  }
  async QuoteAccept(rid, name,id) {
    this.setState({ accept: true, reqid: rid ,id:id})
    let data = new FormData();
    data.append("reqID", rid);
    data.append("user", name);
    const headers = {
      "Content-Type": "multipart/form-data",
      // 'Authorization': token
    };
    console.log(name)
    await axios
      .post("http://127.0.0.1:8000/helper/dpagreed/"+ rid + "/", data, {
        headers: headers,
      })
      .then((response) => {
      console.log(response.data)
      }
      );
      
    //this.setState({accept:false})
  }

  expertPayProblem = (nid, amt = 0) => {
    let budget = 0;
    const url = "/";
    const method = "GET";

    budget = amt;
    console.log(budget)
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
          if (this.state.balance < budget * 0.3)
            this.setState({ showerror: true });
          else
            this.setState({
              redirect: "wallet",
              nid: nid,
              budget: budget,
              initial: "expert",
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  expertPay = (nid, amt = 0) => {
    let budget = "";
    budget = amt;
    console.log(budget)
    this.setState({ redirect: "bid", nid: nid, budget: budget });
  };
  s;

  render() {
    console.log(this.state.quote);
    if (this.state.redirect == "wallet") {
      return (
        <Redirect
          push
          to={{ pathname: "/walletpay", state: { main: this.state } }}
        />
      );
    }
    if (this.state.redirect == "bid") {
      return (
        <Redirect push to={{ pathname: "/bid", state: { main: this.state } }} />
      );
    }
    return (
      <div className="main_content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "5%",
            marginRight: "7%",
            backgroundColor: "#323754",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Technology Requests
          </h3>
        </div>
        <br />
        <br />
        {this.state.req.map((req, index) => (
          <>
            <div
              class="accordion"
              id="accordionExample"
              className="collapse show"
              style={{ margin: "auto", width: "85%" }}
            >
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#323754", color: "white" }}
                >
                  &nbsp;{index + 1}&nbsp;.&nbsp;&nbsp;
                  {req.title}
                  <a
                    class="card-link"
                    data-toggle="collapse"
                    href={"#collapse" + index}
                    aria-expanded="false"
                    aria-controls={"collapse" + index}
                  >
                    <i
                      class="fa fa-sort-desc"
                      aria-hidden="true"
                      style={{ fontSize: "20px", float: "right" }}
                    ></i>
                  </a>
                </div>
              </div>
              <div
                class="collapse"
                id={"collapse" + index}
                data-parent="#accordionExample"
              >
                {this.state.quote[index] != undefined && (
                  <div
                    class="card card-body"
                    style={{ backgroundColor: "#d3d3d3" }}
                  >
                    <div className="form-row">
                      {this.state.quote[index].map((y, index) => (
                        <div className="form-group col-md-3">
                          <div className="card">
                            <div className="card-body">
                              <h5>
                                <tr>
                                  <td>Name&nbsp;:</td>
                                  <td>{y.name}</td>
                                </tr>
                                <tr>
                                  <td>Budget&nbsp;:&nbsp;</td>
                                  <td>$&nbsp;{y.quote}</td>
                                </tr>
                              </h5>
                            </div>
                            
                             
                            {(this.state.accept && this.state.id == req.reqID.toString()+index.toString() )?(
                              <tr><td>
                              <Badge
                                variant="success"
                                style={{cursor:"pointer"}}
                                onClick={() => {
                                  this.expertPay(
                                    req.reqID,
                                      y.quote
                                  );
                                }}
                              >
                               <h5>Pay directly</h5>
                              </Badge>
                              </td>
                              <td></td>
                              <td>
                               <Badge
                               variant="success"
                               style={{cursor:"pointer"}}
                               onClick={() => {
                                this.expertPayProblem(
                                  req.reqID, 
                                  y.quote
                                );
                               }}
                             >
                             <h5> Pay with Wallet&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                             </Badge>
                             </td>
                             </tr>
                            ):
                            ( <Button
                              variant="success"
                              style={{ width: "100%" }}
                              onClick={() => {
                                this.QuoteAccept(y.reqID, y.name,req.reqID.toString()+index.toString());
                              }}
                            >
                              Accept
                            </Button>)
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <br />
          </>
        ))}
      </div>
    );
  }
}
export default Quote;
