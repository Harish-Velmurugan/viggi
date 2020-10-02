import React from "react";
import axios from "axios";
import { Badge } from "react-bootstrap";

class Invovled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   x: [{ doc: true }, { doc: false },{ doc: true }, { doc: false },{ doc: true }, { doc: false }],
      req: [],
      pblm: [],
      tempVer:true,
    };
   this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    console.log(id);
    axios.post("/helper/helperPayment/" + id + "/").then((res) => {
      console.log("over");
      this.setState({tempVer : false})
    });
  }

  async componentDidMount() {
    await axios
      .get("/helper/getFromVendor/" + localStorage.getItem("username") + "/")
      .then((response) =>
        this.setState({ pblm: response.data[1], req: response.data[0] })
      );
  }
  render() {
    console.log(this.state.pblm, this.state.req);
    return (
      <div style={{ margin: "5%" }}>
        <div className="row">
          {this.state.pblm.map((y, index) => (
            <>
              {y[0] != undefined && (
                <div className="col-md-3">
                  <div
                    className="card shadow-sm mb-4 bg-white"
                    // style={{ height: "80%" }}
                  >
                    <div
                      className="card-header bg-primary p-3"
                      style={{
                        color: "white",
                        fontSize: "15px",

                        overflow: "hidden",
                      }}
                    >
                      {this.state.req[index].vendor == "data" ? (
                        <>Resource</>
                      ) : (
                        <>Technology</>
                      )}
                      
                      {!this.state.req[index].verify && this.state.tempVer==true && y[0].doc !=null &&(
                        <i
                          class="fas fa-vote-yea"
                          size={100}
                          style={{
                            float: "right",
                            fontSize: "20px",
                            clickable: "true",
                            cursor: "pointer",
                          }}
                          onClick={()=>this.handleClick(y[0].reqID)}
                        ></i>
                      )}
                    </div>
                    <div className="card-body p-3">
                      <div
                        style={{
                          overflow: "hidden",
                          marginBottom: "5px",
                        }}
                      >
                        <h4
                          style={{
                            fontWeight: "bolder",
                            textDecoration: "underline",
                            marginBottom: "10px",
                          }}
                        >
                          Title
                        </h4>
                        <p>{this.state.req[index].title}</p>
                      </div>

                      {y[0].doc != null ? (
                        <>
                          <h5 style={{ color: "green", fontWeight: "bolder" }}>
                            Click Resource to download your data.
                          </h5>
                          <hr />
                          <Badge
                            variant="danger"
                            style={{ padding: "8px", marginRight: "1.5%" }}
                          >
                            Budget:&nbsp;$&nbsp;{this.state.req[index].budget}
                          </Badge>
                          <Badge variant="success" style={{ padding: "8px" }}>
                            <i className="fa fa-download"></i>&nbsp;&nbsp;
                            <a style={{ color: "white" }} href={y[0].doc}>
                              {this.state.req[index].vendor == "data" ? (
                                <>Resource</>
                              ) : (
                                <>Technology</>
                              )}
                            </a>
                          </Badge>
                        </>
                      ) : (
                        <>
                          <h5 style={{ color: "red", fontWeight: "bolder" }}>
                            Vendor has not yet uploaded your resource
                          </h5>
                          <hr />
                          <Badge
                            variant="danger"
                            style={{ padding: "8px", marginRight: "1.5%" }}
                          >
                            Budget:&nbsp;$&nbsp;{this.state.req[index].budget}
                          </Badge>

                          <Badge
                            style={{
                              padding: "8px",
                              background: "#76da79",
                              color: "white",
                            }}
                          >
                            <i className="fa fa-download"></i>
                            &nbsp;&nbsp;
                            {this.state.req[index].vendor == "data" ? (
                              <>Resource</>
                            ) : (
                              <>Technology</>
                            )}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }
}
export default Invovled;
