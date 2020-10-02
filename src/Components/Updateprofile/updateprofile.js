import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Navbar/nav";
import { Multiselect } from "multiselect-react-dropdown";
import "./update.css";
import { Redirect } from "react-router";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: false,
      loading: true,
      id: null,
      firstname: null,
      lastname: null,
      gender: null,
      dob: null,
      phone: null,
      nationality: null,
      pin: null,
      img: require("./man.png"),
      ima: require("./man.png"),
      // name:"Your name",
      qualification: null,
      specialization: null,
      domains: [],
      displaydomains: [],
      work_exp: null,
      profilecomplete: 0,
      editing: false,
      selectedValue: [],
      personal: false,
      professional: false,
      options: [
        { name: "Algorithms", id: 1 },
        { name: "Cryptography", id: 2 },
        { name: "Distributed Computing", id: 3 },
        { name: "Cloud Computing", id: 4 },
        { name: "Computational Learning", id: 5 },
        { name: "Computer Vision", id: 6 },
        { name: "Big Data", id: 7 },
        { name: "Block Chain", id: 8 },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangei = this.handleChangei.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  async componentDidMount() {
    console.log(localStorage.getItem("userMode"));
    let sig = JSON.parse(this.props.location.state.sign)
      ? JSON.parse(this.props.location.state.sign)
      : false;
    this.setState({
      signup: sig,
    });
    if (!sig) {
      let username = localStorage.getItem("username");
      let token = "Token " + localStorage.getItem("token");
      const url = `/api/user-personal-get-view/${Number(username)}/`;
      const url1 = `/api/user-professional-get-view/${Number(username)}/`;

      const response1 = await fetch(url1, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();
      const data1 = await response1.json();
      await this.setState({
        firstname: data.firstname,
        lastname: data.lastname,
        gender: data.gender,
        dob: data.dob,
        phone: data.phone,
        nationality: data.nationality,
        pin: data.pin,
        img: data.img,
        ima: data.img,
        qualification: data1.qualification,
        specialization: data1.specialization,
        domains: JSON.parse(data1.displaydomains),
        displaydomains: JSON.parse(data1.displaydomains),
        work_exp: data1.work_exp,
      });
      localStorage.setItem("ima", this.state.img);
      localStorage.setItem("userMode", "user");
    } else {
    }
  }
  onSelect(selectedList, selectedItem) {
    this.setState({ domains: selectedList });
    document.getElementById("prof").innerHTML = "Update";
    document.getElementById("prof").className = "btn btn-primary";
  }

  onRemove(selectedList, removedItem) {
    document.getElementById("prof").innerHTML = "Update";
    document.getElementById("prof").className = "btn btn-primary";
  }

  handleChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value,
    });
    document.getElementById("prof").innerHTML = "Update";
    document.getElementById("personal").innerHTML = "Update";
    document.getElementById("prof").className = "btn btn-primary";
    document.getElementById("personal").className = "btn btn-primary";
  }

  handleChangei = (event) => {
    this.setState({
      img: event.target.files[0],
      ima: URL.createObjectURL(event.target.files[0]),
    });
    document.getElementById("personal").innerHTML = "Update";
    document.getElementById("personal").className = "btn btn-primary";
    // let imag = localStorage.setItem('ima', URL.createObjectURL(event.target.files[0]))
    // document.getElementById("profileImage").src= imag
    // this.setState({img:imag})
  };

  handleSubmit1(e) {
    e.preventDefault();
    this.setState({
      profilecomplete: 50,
    });
    let username = localStorage.getItem("username");
    let token = "Token " + localStorage.getItem("token");
    let form_data = new FormData();
    form_data.append("firstname", this.state.firstname);
    form_data.append("lastname", this.state.lastname);
    form_data.append("gender", this.state.gender);
    form_data.append("dob", this.state.dob.toString());
    form_data.append("nationality", this.state.nationality);
    form_data.append("phone", this.state.phone);
    form_data.append("img", this.state.img);
    form_data.append("pin", this.state.pin);
    form_data.append("username", Number(username));
    form_data.append("user", "user");
    if (!this.state.signup) {
      var url = `/api/user-personal-update/${Number(username)}/`;
    } else {
      url = `/api/user-personal-create/`;
      var url2 = `/api/user-profile-view/`;
    }

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };

    axios
      .post(url, form_data, {
        headers: headers,
      })
      .then((response1) => {
        if (response1.status == 200) {
          console.log(response1);
          this.setState({ personal: true });
        }
        document.getElementById("personal").innerHTML = "Updated";
        document.getElementById("personal").className = "btn btn-success";
      });

    axios.post(url2, form_data, {
      headers: headers,
    });
  }

  handleSubmit2(e) {
    e.preventDefault();
    this.setState({
      profilecomplete: 100,
    });

    let domain = "";

    for (let i = 0; i < this.state.domains.length; i++) {
      domain += this.state.domains[i]["name"] + ",";
    }

    let form_data = new FormData();
    form_data.append("qualification", this.state.qualification);
    form_data.append("specialization", this.state.specialization);
    form_data.append("displaydomains", JSON.stringify(this.state.domains));
    form_data.append("domains", domain.substring(0, domain.length - 1));
    form_data.append("work_exp", this.state.work_exp);
    form_data.append("username", localStorage.getItem("username"));
    let username = localStorage.getItem("username");
    var url = "";
    if (!this.state.signup) {
      url = `/api/user-professional-update/${Number(username)}/`;
    } else {
      url = `/api/user-professional-create/`;
    }
    let token = "Token " + localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    axios
      .post(url, form_data, {
        headers: headers,
      })
      .then((response1) => {
        if (response1.status == 200) {
          console.log(response1);
          this.setState({ professional: true });
        }
        document.getElementById("prof").innerHTML = "Updated";
        document.getElementById("prof").className = "btn btn-success";
      });
  }

  render() {
    console.log(this.state.professional, this.state.personal);
    if (
      this.state.professional &&
      this.state.personal &&
      localStorage.getItem("signin") == "false"
    ) {
      window.localStorage.setItem("signin", "true");
      return <Redirect to="/dashboard/ProblemPosted"></Redirect>;
    }
    return (
      <div className="container-fluid update" style={{ fontFamily: "Arial" }}>
        <Navbar />
        <div className="container" style={{ width: "100%", marginTop: "5rem" }}>
          <div className="row">
            <div className="col-sm-12 col-md-3" style={{ padding: "0px" }}>
              <div className="container1" style={{ padding: "0px" }}>
                <label>
                  <input
                    id="imageUpload"
                    type="file"
                    name="profile_photo"
                    placeholder="Photo"
                    required=""
                    capture
                    onChange={this.handleChangei}
                  />
                  <img
                    id="profileImage"
                    src={this.state.ima}
                    alt="img"
                    width="150px"
                    height="150px"
                    style={{
                      borderRadius: "5rem",
                      border: "2px solid grey",
                      padding: "0px",
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="col-sm-12 col-md-8" style={{ padding: "0px" }}>
              <br />
              <div style={{ fontWeight: "bolder", fontSize: "16pt" }}>
                {this.state.firstname} {this.state.lastname}
              </div>
              <hr />
              <div
                className="Card"
                style={{ fontSize: "12pt", fontColor: "grey" }}
              >
                I am a solver/seeker and work on ingenious challenges to bring a
                change to our environment.
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className=" row">
          <div className="col-6 col-md-3 " style={{ marginTop: "0rem" }}>
            <div></div>

            <div className="card" style={{ marginLeft: "" }}>
              <div
                className="card-header text-white "
                style={{ backgroundColor: "#323754" }}
              >
                Menu
              </div>
              <div
                className="card-body"
                style={{ paddingLeft: "14pt", alignItems: "centre" }}
              >
                <a
                  className="card-link"
                  data-toggle="collapse"
                  href="#collapseOne"
                >
                  Personal Details{" "}
                </a>
                <br />
                <hr></hr>

                <a
                  className="collapsed card-link"
                  data-toggle="collapse"
                  href="#collapseTwo"
                >
                  Professional Details{" "}
                </a>
                <br />
                <hr></hr>
                {/* 
                <a className="collapsed card-link" data-toggle="collapse" href="#collapseThree">
                  Login Detail    </a> */}
              </div>
            </div>
          </div>

          <div
            className="col-12 col-md-8"
            style={{ marginTop: "0rem", padding: "0pt" }}
          >
            <div style={{ marginTop: "0rem" }}>
              <h4>Update Your Profile</h4>
              <hr style={{}}></hr>
              <div id="accordion">
                <div className="card">
                  <div className="card-header" onClick={this.icon}>
                    Personal Details
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseOne"
                      style={{
                        float: "right",
                        fontWeight: "bolder",
                        fontSize: "16pt",
                        color: "#323754",
                      }}
                    >
                      +
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <div className="card-body p-2">
                      <form
                        style={{ fontSize: "12spt" }}
                        onSubmit={(e) => this.handleSubmit1(e)}
                      >
                        <div className="form-group col-md-1">
                          {/* <label>

                            <input id="imageUpload" type="file" name="profile_photo" placeholder="Photo"  capture onChange={this.handleChangei} />
                            <img id="profileImage" src={this.state.img} alt="Profile pic uploaded" style={{ marginTop: "1rem", height: "100px", width: "100px" }} />
                          </label> */}
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="firstname">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              placeholder="Ex.Joey"
                              value={this.state.firstname}
                              name="firstname"
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastname"
                              placeholder="Tribiyani"
                              value={this.state.lastname}
                              name="lastname"
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="dob">Date Of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder={this.state.dob}
                              value={this.state.dob}
                              id="dob"
                              name="dob"
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="gender">Gender</label>
                            <select
                              style={{ width: "28%" }}
                              id="gender"
                              placeholder="Male/Female"
                              required
                              className="form-control"
                              name="gender"
                              onChange={this.handleChange}
                            >
                              {<option selected>{this.state.gender}</option>}
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone No</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phone"
                              placeholder="Ex. +91 XXXXXXXXXX"
                              value={this.state.phone}
                              onChange={this.handleChange}
                              pattern="+[0-9]{2} [0-9]{10}"
                              required
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="nationality">
                              Country of Residence
                            </label>
                            <select
                              id="nationality"
                              placeholder="your"
                              className="form-control"
                              name="nationality"
                              onChange={this.handleChange}
                              required
                            >
                              <option selected>{this.state.nationality}</option>
                              <option value="Afganistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American Samoa">
                                American Samoa
                              </option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Anguilla">Anguilla</option>
                              <option value="Antigua & Barbuda">
                                Antigua & Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bermuda">Bermuda</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bonaire">Bonaire</option>
                              <option value="Bosnia & Herzegovina">
                                Bosnia & Herzegovina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="British Indian Ocean Ter">
                                British Indian Ocean Ter
                              </option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Canada">Canada</option>
                              <option value="Canary Islands">
                                Canary Islands
                              </option>
                              <option value="Cape Verde">Cape Verde</option>
                              <option value="Cayman Islands">
                                Cayman Islands
                              </option>
                              <option value="Central African Republic">
                                Central African Republic
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Channel Islands">
                                Channel Islands
                              </option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Christmas Island">
                                Christmas Island
                              </option>
                              <option value="Cocos Island">Cocos Island</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo">Congo</option>
                              <option value="Cook Islands">Cook Islands</option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Cote DIvoire">Cote DIvoire</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Curaco">Curacao</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">
                                Czech Republic
                              </option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">
                                Dominican Republic
                              </option>
                              <option value="East Timor">East Timor</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Falkland Islands">
                                Falkland Islands
                              </option>
                              <option value="Faroe Islands">
                                Faroe Islands
                              </option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="French Guiana">
                                French Guiana
                              </option>
                              <option value="French Polynesia">
                                French Polynesia
                              </option>
                              <option value="French Southern Ter">
                                French Southern Ter
                              </option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Gibraltar">Gibraltar</option>
                              <option value="Great Britain">
                                Great Britain
                              </option>
                              <option value="Greece">Greece</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guadeloupe">Guadeloupe</option>
                              <option value="Guam">Guam</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Hawaii">Hawaii</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="India">India</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Isle of Man">Isle of Man</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Korea North">Korea North</option>
                              <option value="Korea Sout">Korea South</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">
                                Liechtenstein
                              </option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macau">Macau</option>
                              <option value="Macedonia">Macedonia</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">
                                Marshall Islands
                              </option>
                              <option value="Martinique">Martinique</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mayotte">Mayotte</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Midway Islands">
                                Midway Islands
                              </option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Nambia">Nambia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherland Antilles">
                                Netherland Antilles
                              </option>
                              <option value="Netherlands">
                                Netherlands (Holland, Europe)
                              </option>
                              <option value="Nevis">Nevis</option>
                              <option value="New Caledonia">
                                New Caledonia
                              </option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Niue">Niue</option>
                              <option value="Norfolk Island">
                                Norfolk Island
                              </option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau Island">Palau Island</option>
                              <option value="Palestine">Palestine</option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">
                                Papua New Guinea
                              </option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Phillipines">Philippines</option>
                              <option value="Pitcairn Island">
                                Pitcairn Island
                              </option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto Rico">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Republic of Montenegro">
                                Republic of Montenegro
                              </option>
                              <option value="Republic of Serbia">
                                Republic of Serbia
                              </option>
                              <option value="Reunion">Reunion</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="St Barthelemy">
                                St Barthelemy
                              </option>
                              <option value="St Eustatius">St Eustatius</option>
                              <option value="St Helena">St Helena</option>
                              <option value="St Kitts-Nevis">
                                St Kitts-Nevis
                              </option>
                              <option value="St Lucia">St Lucia</option>
                              <option value="St Maarten">St Maarten</option>
                              <option value="St Pierre & Miquelon">
                                St Pierre & Miquelon
                              </option>
                              <option value="St Vincent & Grenadines">
                                St Vincent & Grenadines
                              </option>
                              <option value="Saipan">Saipan</option>
                              <option value="Samoa">Samoa</option>
                              <option value="Samoa American">
                                Samoa American
                              </option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome & Principe">
                                Sao Tome & Principe
                              </option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Tahiti">Tahiti</option>
                              <option value="Taiwan">Taiwan</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Togo">Togo</option>
                              <option value="Tokelau">Tokelau</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad & Tobago">
                                Trinidad & Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Turks & Caicos Is">
                                Turks & Caicos Is
                              </option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Erimates">
                                United Arab Emirates
                              </option>
                              <option value="United States of America">
                                United States of America
                              </option>
                              <option value="Uraguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Vatican City State">
                                Vatican City State
                              </option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Virgin Islands (Brit)">
                                Virgin Islands (Brit)
                              </option>
                              <option value="Virgin Islands (USA)">
                                Virgin Islands (USA)
                              </option>
                              <option value="Wake Island">Wake Island</option>
                              <option value="Wallis & Futana Is">
                                Wallis & Futana Is
                              </option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zaire">Zaire</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                          </div>
                          <div className="form-group col-md-2">
                            <label htmlFor="pin">Zip Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="pin"
                              placeholder="Ex. 620012"
                              value={this.state.pin}
                              name="pin"
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="personal"
                              style={{ width: "20%" }}
                            >
                              &nbsp;Update&nbsp;
                            </button>
                            {/* style={{ backgroundColor: "#323754", border: "none"  */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    Professional Details
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseTwo"
                      style={{
                        float: "right",
                        fontWeight: "bolder",
                        fontSize: "16pt",
                        color: "#323754",
                      }}
                    >
                      +
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    data-parent="#accordion"
                  >
                    <div className="card-body p-2">
                      <form
                        style={{ fontSize: "12pt" }}
                        onSubmit={this.handleSubmit2}
                      >
                        <div className="form-row">
                          <div className="col-sm-6">
                            <label htmlFor="qualification">
                              Highest Qualification
                            </label>
                            <select
                              id="qualification"
                              className="form-control"
                              name="qualification"
                              onChange={this.handleChange}
                            >
                              {
                                <option selected>
                                  {this.state.qualification}
                                </option>
                              }
                              <option value="No formal education">
                                No formal education
                              </option>
                              <option value="Primary education">
                                Primary education
                              </option>
                              <option value="Secondary education">
                                Secondary education or high school
                              </option>
                              <option value="GED">GED</option>
                              <option value="Vocational qualification">
                                Vocational qualification
                              </option>
                              <option value="Bachelor's degree">
                                Bachelor's degree
                              </option>
                              <option value="Master's degree">
                                Master's degree
                              </option>
                              <option value="Doctorate or higher">
                                Doctorate or higher
                              </option>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="specialization">
                              Specialization
                            </label>
                            <select
                              id="specialization"
                              className="form-control"
                              name="specialization"
                              onChange={this.handleChange}
                            >
                              <option selected>
                                {this.state.specialization}
                              </option>
                              <option>Computer Science Engineering</option>
                              <option>Aeronautical Engineering</option>
                              <option>Electrical Engineering</option>
                              <option>Civil Engineering</option>
                              <option>Mining Engineering</option>
                              <option>Chemical Engineering</option>
                              <option>Biotechnology</option>
                              <option>Textile Engineering</option>
                              <option>Environmental Engineering</option>
                              <option>Robotics Engineering</option>
                              <option>Instrumentation Engineering</option>
                              <option>Mechanical Engineering</option>
                              <option>Aerospace Engineering</option>
                              <option>Marine Engineering</option>
                              <option>Metallurgical Engineering</option>
                              <option>
                                Electronics and Communications Engineering
                              </option>
                              <option>Ceramic Engineering</option>
                              <option>Biomedical Engineering</option>
                              <option>Industrial Engineering</option>
                              <option>Petroleum Engineering</option>
                              <option>Structural Engineering</option>
                              <option>Production Engineering</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="work_exp">Employment Status</label>
                            <select
                              id="work_exp"
                              className="form-control"
                              name="work_exp"
                              onChange={this.handleChange}
                            >
                              <option selected>{this.state.work_exp}</option>
                              <option value="Employed">Employed</option>
                              <option value="Self-employed">
                                Self-employed
                              </option>
                              <option value="Out of work">Out of work</option>
                              <option value="Homemaker">Homemaker</option>
                              <option value="Student">Student</option>
                              <option value="Retired">Retired</option>
                              <option value="Unable to work">
                                Unable to work
                              </option>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="domains">Interested Domains</label>
                            {/* {this.state.domains.map((domains,index) =>(  */}
                            <Multiselect
                              options={this.state.options} // Options to display in the dropdown
                              selectedValues={this.state.displaydomains} // Preselected value to persist in dropdown
                              onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={this.onRemove} // Function will trigger on remove event
                              displayValue="name"
                              showCheckbox={true}
                              //  style={{backgroundColor:"purple"}}    // Property name to display in the dropdown options
                            />
                            {/* ))} */}
                            {/* <select id="domains" className="form-control" name='domains' onChange={this.handleChange}>
                              <option selected>{this.state.domains}</option>
                             ctures</option>
                              <option>EE - Power</option> <option>CS - Computer Theory</option>
                              <option>CS - Algorithms </option>
                              <option>CS - Cryptography</option>
                              <option>CS - Distributed Computing</option>
                              <option>CS - Cloud Computing </option>
                              <option>CS - Computational Learning </option>
                              <option>CS - Computer Vision </option>
                              <option>CS - Big Data </option>
                              <option>CS - Neural Networks</option>
                              <option>AE - Fluid Dynamics</option>
                              <option>AE - Materials sciences</option>
                              <option>AE - Structural Analysis</option>
                              <option>AE - Propulsion</option>
                              <option>AE - Automatic Control and Guidance</option>
                              <option>AE - Aircraft Performance and Aircraft Stru
                              <option>EE - Electronics</option>
                              <option>EE - Microelectronics and nanoelectronics</option>
                              <option>EE - Signal processing</option>
                              <option>EE - Telecommunications</option>
                              <option>EE - Instrumentation</option>
                              <option>EE - Computers</option>
                              <option>CI - Geotechnical Engineering</option>
                              <option>CI - Structural Engineering</option>
                              <option>CI - Transport Engineering</option>
                              <option>CI - Environmental Engineering</option>
                              <option>CI - Urban and Community Planning</option>
                              <option></option>

                            </select> */}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="prof"
                              style={{ width: "20%" }}
                            >
                              &nbsp;Update&nbsp;
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card">
                  {/*  <div className="card-header">
                  Login Details
                    <a className="card-link" data-toggle="collapse" href="#collapseThree" style={{float:"right", fontWeight: "bolder", fontSize: "16pt", color: "#323754" }} >
                      +</a> 

              </div>
                  <div id="collapseThree" className="collapse" data-parent="#accordion">
                    <div className="card-body">
                      <form style={{ fontSize: '12pt' }}>
                        {/* <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">UserId</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputEmail3" />
                      </div>
                    </div> 
                        <div className="form-group row">
                          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                          <div className="col-sm-10">
                            <br/>
                            <input type="Password" className="form-control" id="txtNewPassword" placeholder="min 8 character" required />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
                          <div className="col-sm-10">
                            <input type="Password" className="form-control" id="txtConfirmPassword" //onChange="checkPasswordMatch();"
                             />
                          </div>
                        </div>
                        <div className="registrationFormAlert" id="divCheckPasswordMatch" />
                        <div className="form-group row">
                          <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#323754", border: "none" }}>Update Profile</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
