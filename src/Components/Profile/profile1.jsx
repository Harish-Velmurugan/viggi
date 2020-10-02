import React from "react";
import "./style.css";
import Axios from "axios";
import Navbar from "../Navbar/nav";
import { Link } from "react-router-dom";
import agriculture from "./badges/agriculture.jpeg";
import alpha from "./badges/alpha.jpeg";
import art_sports from "./badges/art_sports.jpeg";
import astute from "./badges/astute.jpeg";
import automobiles from "./badges/automobiles.jpeg";
import climate from "./badges/climate.jpeg";
import commando from "./badges/commando.jpeg";
import comrade from "./badges/comrade.jpeg";
import e_commerce from "./badges/e_commerce.jpeg";
import eco_friendly from "./badges/eco_friendly.jpeg";
import edu from "./badges/edu.jpeg";
import fashion from "./badges/fashion.jpeg";
import finance from "./badges/finance.jpeg";
import fmcg from "./badges/fmcg.jpeg";
import food from "./badges/food.jpeg";
import gem from "./badges/gem.jpeg";
import hattricker from "./badges/hattricker.jpeg";
import healthcare from "./badges/healthcare.jpeg";
import infrastructure from "./badges/infrastructure.jpeg";
import jack from "./badges/jack.jpeg";
import law from "./badges/law.jpeg";
import maestro from "./badges/maestro.jpeg";
import med_ent from "./badges/med_ent.jpeg";
import omnipotent from "./badges/omnipotent.jpeg";
import pharmaceuticals from "./badges/pharmaceuticals.jpeg";
import power from "./badges/power.jpeg";
import railways from "./badges/railways.jpeg";
import sci from "./badges/sci.jpeg";
import security from "./badges/security.jpeg";
import seeker from "./badges/seeker.jpeg";
import solver from "./badges/solver.jpeg";
import striker from "./badges/striker.jpeg";
import textile from "./badges/textile.jpeg";
import trade from "./badges/trade.jpeg";
import tt from "./badges/tt.jpeg";

class Profile2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personaldetails: [],
      qualification: "",
      specialization: "",
      email: "",
      img: "",
      name: "",
      skills: [],
      phno: "",
      rp: "",
      level: "",
      domains: [],
      count: [],
      badges: [],
      stcolr: "",
    };
    this.getLevel = this.getLevel.bind();
  }

  async componentDidMount() {
    await Axios.get(
      `/users/v1/users/profile/${localStorage.getItem("username")}/`
    ).then((response) => {
      //   this.setState({problemsinvolved:response.data[0]})
      //    this.setState({problemsposted:response.data[1]})
      //    this.setState({personaldetails:response.data[2]})
      //    this.setState({professionaldetails:response.data[3]})
      console.log(localStorage.getItem("mode"));
      var dat2 = response.data[2];
      if(localStorage.getItem("mode")!= "company"){
        var ad = response.data[3][0].domains;}
      else{ var ad = response.data[2][0].domains;}  
      var dd = response.data[6];

      var lv = response.data[5][0].level;
      var lvl = lv.charAt(0).toUpperCase() + lv.slice(1);

      switch (lvl) {
        case "Bronze":
          this.setState({ stcolr: "brown" });
          break;
        case "Silver":
          this.setState({ stcolr: "darkgrey" });
          break;
        case "Gold":
          this.setState({ stcolr: "#D4AF37" });
          break;
        case "Platinum":
          this.setState({ stcolr: "steelblue" });
          break;
        case "Diamond":
          this.setState({ stcolr: "red" });
          break;
        case "Jadiete":
          this.setState({ stcolr: "green" });
          break;
        default:
          this.setState({ stcolr: "brown" });
      }

      var f = dat2[0].firstname;
      var fn = f.charAt(0).toUpperCase() + f.slice(1);
      var l = dat2[0].lastname;
      var ln = l.charAt(0).toUpperCase() + l.slice(1);

      this.setState({
        name: fn + " " + ln,
        phno: response.data[2][0].phone,
        rp: response.data[5][0].rp,
        //professionaldetails:response.data[3],
        problemsinvolved: response.data[0],
        problemsposted: response.data[1],
        email: response.data[4].email,
        qualification: response.data[3][0].qualification,
        specialization: response.data[3][0].specialization,
        img: dat2[0].img,
        skills: ad.split(","),
        level: lvl,
        domains: response.data[6],
        count: response.data[7],
        badges: response.data[8],
      });
      console.log(this.state.domains);
      console.log(this.state.badges);
    });
  }

  getLevel() {
    let points = this.state.rp;

    return (this.state.rp / 20000) * 100;
  }

  render() {
    let percentRP = (this.state.rp / 20000) * 100;

    return (
      <div className="profileMain">
        <Navbar />
        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={this.state.img} alt="Profile" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5 className="name">{this.state.name}</h5>
                  <h6 className="Professional">{this.state.qualification}</h6>
                  <p className="proile-rating">
                    REPUTATION POINTS : <span> {this.state.rp}</span>
                  </p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                    {/* <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                        </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <Link
                  to={{ pathname: "/update", state: { sign: "false" } }}
                  className="profile-edit-btn"
                >
                  Edit profile
                </Link>
                {/* <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" /> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work"></div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.phno}</p>
                      </div>
                    </div>
                    <div className="row">
                      
                      {
                      (() => {
        if (localStorage.getItem("mode") != "company") {
          return (
            <div className="col-md-6">
            <label>Specialization</label>
            </div>
           
          )
        }  else {
          return (
            <div> </div>
          )
        }
      })()}
                      <div className="col-md-6">
                        <p>{this.state.specialization}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Your Bio</label>
                        <br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container" className="ml-5">
              <h3>
                Level:
                <span>
                  {" "}
                  {this.state.level}
                  <i
                    class="fa fa-star"
                    aria-hidden="true"
                    style={{ color: `${this.state.stcolr}` }}
                  ></i>
                </span>
              </h3>
              <br></br>
              <div class="col-md-12">
                <div class="progress" style={{ width: "100%" }}>
                  <div
                    class={`bronze ${
                      percentRP > 0 ? "primary-color" : "no-color"
                    }`}
                  ></div>
                  <div
                    class={`silver ${
                      percentRP > 2.5 ? "primary-color" : "no-color"
                    }`}
                  ></div>
                  <div
                    class={`gold ${
                      percentRP > 10 ? "primary-color" : "no-color"
                    }`}
                  ></div>
                  <div
                    class={`platinum ${
                      percentRP > 25 ? "primary-color" : "no-color"
                    }`}
                  ></div>
                  <div
                    class={`diamond ${
                      percentRP > 50 ? "primary-color" : "no-color"
                    }`}
                  ></div>
                  <div
                    class={`jadiete ${
                      percentRP > 97 ? "primary-color" : "no-color"
                    }`}
                  ></div>
                  <div
                    class="progress-bar"
                    style={{ width: `${(this.state.rp / 20000) * 100}%` }}
                  ></div>
                </div>
                <hr />
              </div>
            </div>

            <br></br>
            <div class="container" className="ml-5">
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title" style={{ color: "black" }}>
                      Badges
                    </h4>
                    <hr
                      style={{
                        color: "#000000",
                        backgroundColor: "#DCDCDC",
                        height: 0.01,
                        borderColor: "#DCDCDC",
                      }}
                    />

                    <div className="row ml-1">
                      {this.state.badges.map((badge, index) => {
                        return (
                          <div className="p-1">
                            {(() => {
                              switch (badge) {
                                case "agriculture":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={agriculture}
                                    />
                                  );
                                case "alpha":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={alpha}
                                    />
                                  );
                                case "art_sports":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={art_sports}
                                    />
                                  );
                                case "astute":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={astute}
                                    />
                                  );
                                case "automobiles":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={automobiles}
                                    />
                                  );
                                case "climate":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={climate}
                                    />
                                  );
                                case "commando":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={commando}
                                    />
                                  );
                                case "comrade":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={comrade}
                                    />
                                  );
                                case "e_commerce":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={e_commerce}
                                    />
                                  );
                                case "eco_friendly":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={eco_friendly}
                                    />
                                  );
                                case "edu":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={edu}
                                    />
                                  );
                                case "fashion":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={fashion}
                                    />
                                  );
                                case "finance":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={finance}
                                    />
                                  );
                                case "fmcg":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={fmcg}
                                    />
                                  );
                                case "food":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={food}
                                    />
                                  );
                                case "gem":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={gem}
                                    />
                                  );
                                case "hattricker":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={hattricker}
                                    />
                                  );
                                case "healthcare":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={healthcare}
                                    />
                                  );
                                case "infrastructure":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={infrastructure}
                                    />
                                  );
                                case "jack":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={jack}
                                    />
                                  );
                                case "law":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={law}
                                    />
                                  );
                                case "maestro":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={maestro}
                                    />
                                  );
                                case "med_ent":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={med_ent}
                                    />
                                  );
                                case "omnipotent":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={omnipotent}
                                    />
                                  );
                                case "pharmaceuticals":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={pharmaceuticals}
                                    />
                                  );
                                case "power":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={power}
                                    />
                                  );
                                case "railways":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={railways}
                                    />
                                  );
                                case "sci":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={sci}
                                    />
                                  );
                                case "security":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={security}
                                    />
                                  );
                                case "seeker":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={seeker}
                                    />
                                  );
                                case "solver":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={solver}
                                    />
                                  );
                                case "striker":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={striker}
                                    />
                                  );
                                case "textile":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={textile}
                                    />
                                  );
                                case "trade":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={trade}
                                    />
                                  );
                                case "tt":
                                  return (
                                    <img
                                      width="100px"
                                      height="100px"
                                      src={tt}
                                    />
                                  );
                              }
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br></br>
            <div class="container" className="ml-5">
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title" style={{ color: "black" }}>
                      Domain Progress:
                    </h4>
                    <hr
                      style={{
                        color: "#000000",
                        backgroundColor: "#DCDCDC",
                        height: 0.01,
                        borderColor: "#DCDCDC",
                      }}
                    />

                    <table>
                      {this.state.domains.map((dom, i) => (
                        <tr>
                          <td>
                            {" "}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {dom} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </td>
                          <br></br>
                          <td>{this.state.count[i]}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile2;
