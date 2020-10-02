import { Modal } from "react-bootstrap";
import React from "react";
import Navbar from "../Navbar/nav";
import axios from "axios";
// import "./badge.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

// import 'mdbreact/dist/css/mdb-free.css';
// import "./assets/scss/mdb-free.scss"

class TemplateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      skills: JSON.parse(props.location.state.skill),
      nid: props.location.nid,
      img: props.location.state.img,
      desc : props.location.state.description,
      title: props.location.state.title, 
      files:props.location.state.files
    };

    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    
  }

  accept(){
    axios.post("/sol/templateAccept/" + this.state.nid + "/")
      .then((response) => {})
      .catch((error) => {
        console.log("error");
      });
  }

  reject(){
    axios.post("/sol/templateReject/" + this.state.nid + "/")
      .then((response) => {})
      .catch((error) => {
        console.log("error");
      });
  }


  render() {
    console.log(this.state.skills)

    return (
      <div className="container-fluid">
        <Navbar />

        <div
          className=""
          style={{ width: "75%", marginLeft: "10%", paddingTop: "5%" }}
        >
          <div className="description pt-5 d-flex row justify-content-start pb-3">
            
         
          </div>
          <div
            className="border border-info p-4 rounded"
            style={{ backgroundColor: "white" }}
          >
          <center>
          <div
              className="details p-3  col-sm-12 col-md-7"
              style={{ width: "100%" }}
            >
            
              <div className="title">
              
                <p style={{ fontSize: "20px", fontWeight: 650 }}>
                  {this.state.title}
                </p>
                
              </div>
              
            </div>
            </center>
            
            
            <div className="tab-content">
              <div
                className="tab-pane container active"
                id="problemdescription"
              >
                <div className="skills ml-5" style={{ width: "65%" }}>
                  <br />
                  <h5 style={{ fontWeight: "600" }}>Skills required</h5>
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontSize: "13px" }}
                  >
                    <div />
                    <span class="badge p-2" style={{background:"#1299b0", color:"white", fontSize:"14px", fontFamily:"monospace"}}>
                    {/* border rounded-rectangle p-2 */}
                      {this.state.skills[0].name}
                    </span>
                    {this.state.skills[1] ?
                    <span className="border rounded-circle p-2">
                      {this.state.skills[1].name}
                    </span>
                    :
                    <div></div>
                    }
                    {this.state.skills[2] ?
                    <span className="border rounded-circle p-2">
                      {this.state.skills[2].name}
                    </span>
                    :
                    <div></div>
                    }
                    {this.state.skills[3] ?
                    <span className="border rounded-circle p-2">
                      {this.state.skills[3].name}
                    </span>
                    :
                    <div></div>
                    }
                  </div>
                </div>
                <br />
   
              </div>
 
            </div>

            <div>

                    <br>

                    </br>
                    <br></br>

            
            <div className="row ml-5">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={this.state.img} alt="Profile" />
                  
          
                </div>
                <br></br>
                <a href={this.state.files} type="button" className="btn btn-info">
                  View Docs Attached
                </a>
              </div>
              <div className="col-md-7">
                <div className="profile-head">
                <h4 style={{ fontWeight: "600" }}>Description</h4>
                <p style={{ fontWeight: 500 }}>{this.state.desc}</p>

                </div>
                </div>
                </div>



            <center>

            <br/>
            <br/>

         
            <button
            type="button"
            onClick={() => {this.accept()}}
            class="btn btn-success"
            id="a1"
            >
            Accept
            </button>

            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;


            <button
            type="button"
            onClick={() => {this.reject()}}
            class="btn btn-danger"
            id="a1"
            >
            Reject
            </button>
            </center>
            </div>
            
         

          </div>



        </div>
      </div>
    );
  }
}

export default TemplateView;
