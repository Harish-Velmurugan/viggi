import React from "react";
import "./style.css";
import Axios from "axios";
import Navbar from "../Navbar/nav";

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
    };
  }

  componentDidMount() {
    Axios.get(`/users/v1/users/profile/${this.props.location.state.id}/`).then(
      (response) => {
        //   this.setState({problemsinvolved:response.data[0]})
        //    this.setState({problemsposted:response.data[1]})
        //    this.setState({personaldetails:response.data[2]})
        //    this.setState({professionaldetails:response.data[3]})
        //    this.setState({email:response.data[4].email})
        var dat2 = response.data[2];
        var ad = response.data[3][0].domains;
        this.setState({
          name: dat2[0].firstname + " " + dat2[0].lastname,
          phno: response.data[2][0].phone,
          //professionaldetails:response.data[3],
          problemsinvolved: response.data[0],
          problemsposted: response.data[1],
          email: response.data[4].email,
          rp: response.data[5][0].rp,
          qualification: response.data[3][0].qualification,
          specialization: response.data[3][0].specialization,
          img: dat2[0].img,
          skills: ad.split(","),
        });
      }
    );
  }

  render() {
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
                    REPUTATION POINTS: <span>{this.state.rp}</span>
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
                {/* <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" /> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  {/* <p>WORK LINK</p>
                        <a href>Website Link</a><br />
                        <a href>Bootsnipp Profile</a><br />
                        <a href>Bootply Profile</a> */}
                  <p>SKILLS</p>
                  <a href>{this.state.skills[0]}</a>
                  <br />
                  <a href>{this.state.skills[1]}</a>
                  <br />
                  <a href>{this.state.skills[2]}</a>
                  <br />
                  <a href>{this.state.skills[3]}</a>
                  <br />
                </div>
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
                      <div className="col-md-6">
                        {/* <label>Specialization</label> */}
                      </div>
                      <div className="col-md-6">
                        {/* <p>{this.state.specialization}</p> */}
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
          </form>
        </div>
      </div>
    );
  }
}

export default Profile2;
