import React from "react";
// import { Link } from "react-router-dom";
// import Axios from "axios";
import Navbar from "../Navbar/nav";
// import n1 from "./b.png";

import axios from "axios";
import n from "./a.jpeg";
import { Stepper,Step } from 'react-form-stepper';
import "./lor.css";
import { Link } from "react-router-dom";
import {
  Form,

} from "react-bootstrap";
import { Page, Text, View,Font, Document, StyleSheet } from '@react-pdf/renderer';


Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  br:{
    border:'2px solid black',
    margin:"19px",
    height:'100%',
  },

  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Oswald',
    
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  
});

class Lor extends React.Component {
constructor(props) {
      super(props)
      this.state = {
        requestId:this.props.location.state.reason.id,
        aName:null,
        aDesignation:null,
        arequestingFirm:null,
        askills:null,
        projectTitle:null,
        sname:null,
        sDesignation:null,
        sOrganization:null,
        sIndustry:null,
        smobileNumber:null,
        semailId:null,
        sSealImage:'',
        sSealName:'',
        sLinkedIn:null,
        rReason:null,
        trait1:null,
        trait2:null,
        trait3:null,
        rejectReason:null,
        date:'',
        yoe:null,
        gender:this.props.location.state.obj.gender,


        currentStep: 1, 
        stepper:0,
        projectTitle:"",
        obj:this.props.location.state.obj,
        problem:this.props.location.state.problem,
        sol:this.props.location.state.sol,
        reason:this.props.location.state.reason,
        seeker:this.props.location.state.seeker,
        sender:this.props.location.state.sender,
        skill:this.props.location.state.problem.skill.split(","),
        icon:null,
        nid:this.props.location.state.nid,
      }
      console.log(this.state.sender);
      // this.handleChange = this.handleChange.bind(this);
      // this.handleChange = this.onC.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleImage = this.handleImage.bind(this);
      this.Provide = this.Provide.bind(this);
      this.Step1 = this.Step1.bind(this);
      this.step2 = this.Step2.bind(this);
      this.step3 = this.Step3.bind(this);
    }

    
   componentDidMount(){
     this.setState({
        requestId:this.state.reason.id,
        aName:this.state.obj.name,
        aDesignation:this.state.reason.designation,
        arequestingFirm:this.state.reason.firm,
        askills:this.state.skill.filter(x => x).join(','),
        projectTitle:this.state.problem.title,
        sname:this.state.seeker.name,
        smobileNumber:this.state.seeker.mobile,
        semailId:this.state.seeker.email,
     })
   }
  
   Reject=(e)=>{
    e.preventDefault();
    let formdata1=new FormData();
    formdata1.append("requestId",this.state.requestId);
    formdata1.append("rejectReason",this.state.rejectReason);
    formdata1.append("projectTitle",this.state.projectTitle);
    var url="/lor/lorReject/"+this.state.nid+"/"+this.state.reason.id+"/"+localStorage.getItem("username")+"/"+this.state.sender+"/"
    let token = "Token " + localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };

    axios
    .post(url, formdata1, {
      headers: headers,
    })
    .then((response1) => {
      if (response1.status == 200) {
        console.log(response1.data.state);
        if(response1.data.state=="success")
        {
          window.location = "/notify";
        }

        // window.alert("Rejected")
        // this.setState({ professional: true });
      }
      // document.getElementById("prof").innerHTML = "Updated";
      // document.getElementById("prof").className = "btn btn-success";
    });
   }

   Provide=(e)=>{
     var d=new Date();
     var dat=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
     e.preventDefault();
     let formdata=new FormData();
     formdata.append("requestId",this.state.requestId);
     formdata.append("aName",this.state.aName);
     formdata.append("aDesignation",this.state.aDesignation);
     formdata.append("arequestingFirm",this.state.arequestingFirm);
     formdata.append("askills",this.state.askills);
     formdata.append("projectTitle",this.state.projectTitle);
     formdata.append("sname",this.state.sname);
     formdata.append("sDesignation",this.state.sDesignation);
     formdata.append("sOrganization",this.state.sOrganization);
     formdata.append("sIndustry",this.state.sIndustry);
     formdata.append("smobileNumber",this.state.smobileNumber);
     formdata.append("semailId",this.state.semailId);
     formdata.append("sSealImage",this.state.sSealImage);
     formdata.append("sSealName",this.state.sSealName);
     formdata.append("sLinkedIn",this.state.sLinkedIn);
     formdata.append("rReason",this.state.rReason);
     formdata.append("trait1",this.state.trait1);
     formdata.append("trait2",this.state.trait2);
     formdata.append("trait3",this.state.trait3);
     formdata.append("date",dat)
     formdata.append("yoe",this.state.yoe)
     formdata.append("gender",this.state.gender);


    var url="/lor/lorAccept/"+this.state.nid+"/"+this.state.reason.id+"/"+localStorage.getItem("username")+"/"+this.state.sender+"/"
    let token = "Token " + localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    axios
      .post(url, formdata, {
        headers: headers,
      })
      .then((response1) => {
        if (response1.status == 200) {
          console.log(response1.data.state);
          if(response1.data.state=="success")
          {
            window.location = "/notify";
          }
  
          // window.alert("Rejected")
          // this.setState({ professional: true });
        }
        // document.getElementById("prof").innerHTML = "Updated";
        // document.getElementById("prof").className = "btn btn-success";
      });
      
  }

// console.log("56858");
  //  }
   handleImage = (e) => {
    let file = e.target.files[0];
    this.setState({ sSealImage: file });
    this.setState({ icon: URL.createObjectURL(e.target.files[0]) });
  };


   handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
    console.log(value);

  }

  //   updateValue(val) {
  //     this.setState({ value: val });
  //  }
   
  //  onChange(e) {
  //     var val = e.target.value;
  //     this.props.updateValue(val);
  //  }
     
 
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
      this.setState({stepper:this.state.stepper+1});
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
      this.setState({stepper:this.state.stepper-1});
    }
   

  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
       <div>

        <button 
          className="btn btn-primary mt-1" style={{marginLeft:"14%"}}
          type="button" onClick={this._prev}>
         &lt; Previous
        </button>
        </div>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <3){
      return (
        <div>
        
        <button 
          className="btn btn-primary  mt-1"  style={{marginLeft:"78%"}}
          type="button" onClick={this._next}>
        &nbsp;&nbsp;Next &gt;&nbsp;&nbsp;
        </button>        
        <br/><br/>
        </div>
      )
    }
    return null;
  }
    
    render() {    
      return (
            <div style={{backgroundColor:"#FCFAE4"}}>
            <Navbar/>
            <br/><br/><br/>
  
            <Stepper styleConfig={{activeBgColor:'#000b73',completedBgColor:"#4682b4"}}
  steps={[{ label: 'Reason' }, { label: 'Solution' }, { label: 'LOR' }]}
  activeStep={this.state.stepper}
/>     
{/* styleConfig={{activeBgColor:'#0f52ba',completedBgColor:"#4682b4"} */}
        <React.Fragment>
  
        <form onSubmit={this.handleSubmit}>
        {/* 
          render the form steps and pass required props in
        */}
          <this.Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
                   />{console.log(this.state.reason) } 
           <this.Step2 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            username={this.state.username}
          />
          <this.Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            password={this.state.password}
          />
        <span >  {this.previousButton()}
          {this.nextButton()}</span>
  
        </form>
        </React.Fragment>
        </div>
      );
    }
  
  
  Step1(props) {
    var a=this.state.problem.skill.split(",")
    console.log(a);

    if (props.currentStep !== 1) {
      return null
    } 
    return(
    
      <div>
     
        <div class="card ml-5 mr-5"  style={{position:"static",right:"10%",left:"10%",down:"10%"}}>

            <div class="card-body">
              <div class="card">
            <div class="card-header">
              <strong>Reason for Requesting LOR</strong>
            </div>
            <div class="card-body">
              <h5 class="card-title">{this.state.reason.reason}</h5>
              <Link
                            to={{
                              pathname: "/profile",
                              state: { id:this.state.sol[0].username},
                            }}
                >
              <div class="btn btn-primary float-right" onClick={this.viewProfile}>View Profile</div>
              </Link>
            </div>
          </div><br/><br/>

          <div class="card" style={{color:"blue"}}>
            <div class="card-header">
          <strong>Requesting for the post of {this.state.reason.designation} in {this.state.reason.firm}</strong>
            </div>
            </div><br/><br/>


          <div class="card">
            <div class="card-header">
              <strong>SKILLS</strong>
            </div>
             <div class="card-body">
          {a.map((a, index) => (
            
            <span>
              {a!="" ?<p id="rcorners2" class ="mr-3">{a}</p>:""}
            </span>             
            ))}
          </div>
          </div><br/><br/>
       
            <div class="card">
            <div class="card-header">
              <strong>Your Problem Statement</strong>
            </div>
            <div class="card-body">
            <h5 class="card-title"><strong style={{textDecoration:"underline" }}>Title:</strong><br/><p class="mt-1">{this.state.problem.title}</p></h5>
              
            <h5 class="card-title"><strong  style={{textDecoration:"underline" }}>Description:</strong><br/><p class="mt-1">{this.state.problem.description}</p></h5> 

            <a href={this.state.problem.files} type="button" className="btn btn-info">
                  Docs Attached
                </a>

            </div>
          </div>
           
          

</div>
</div>
</div>
    );
  }
  
 Step2=(props) => {
  //  var b=this.state.sol;
  //  console.log(b);
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div>
        

    
    

 <div class="card  ml-5 mr-5"  style={{position:"static",right:"10%",left:"10%"}}>

            <div class="card-body">
            {this.state.sol.map((sol, index) => (
            <div id="accordion" className="ml-3 mr-4">
        <div class="card" style={{backgroundColor:"#EFF9F9"}}>
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <img
                alt="SolutionImage"
                src={sol.image}
                style={{
                  height: "100px",
                  width: "100px",
                  border: "2px solid grey",
                  borderRadius: "5rem", border: "2px solid grey" 
                }}
                capture
              />
              &nbsp;<strong>{sol.title}</strong>
              {sol.collaboration ? (
                <p
                  className="float-right fas fa-hands-helping"
                  style={{ color: "#d99164" }}
                ></p>
              ) : ""
                
              }
              <div className="float-right mt-4">
                {" "}
                <i
                  class="fa fa-chevron-down"
                  data-toggle="collapse"
                  data-target={"#collapse".concat(index)}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style={{ fontSize: "30px" }}
                ></i>
              </div>
            </h5>
          </div>
          
          <div
            id={"collapse".concat(index)}
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
             <div class="card-body">
              <div class="card">
            <div class="card-header">
              <strong>Abstract</strong>
            </div>
            <div class="card-body">
            <h5 class="card-title">{sol.abstract}</h5>
            </div>
          </div>
          </div>

          <div class="card-body">
              <div class="card">
            <div class="card-header">
              <strong>Description</strong>
            </div>
            <div class="card-body">
            <h5 class="card-title">{sol.desc}</h5>
            </div>
          </div>
          </div>
          <span>
          <a href={sol.docs} type="button" className="btn btn-info mt--3" style={{marginLeft:"30%"}}>
                  Docs Attached
                </a> 

                <a href={sol.video} type="button" className="btn btn-info ml-3">
                  Video Attached 
                </a>
          </span><br/><br/>
             
              </div>
</div>

        </div>
          

          ))}
           <br/><br/>
           
          </div>
 </div>

  </div>

    );
  }

Step3=(props) => {
  var d=new Date();
    if (props.currentStep !== 3) {
      return null
    } 
    return(
    
      
      <div>
 <div class="card  ml-5 mr-5" style={{position:"static",right:"10%",left:"10%"}} >

<div class="card-body">


            <strong  class="ml-5" style={{color:"blue",fontSize:"120%"}}>Provide LOR</strong>
            <hr/>
           
<form onSubmit={(e) => this.Provide(e)}  method="POST">
<div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3px",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Applicant Details
          </h3>
        </div>
<br/>
  <div class="form-group ml-5 mr-5" style={{display:"inline-block",width:"40%"}}>
    <strong  class="bmd-label-floating">Applicant Name</strong>
    <input type="text" class="form-control" id="aName" name="aName" onChange={this.handleChange} required value={this.state.aName}/>
 
  </div>
  <div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong   class="bmd-label-floating">Designation</strong>
    <input type="text" class="form-control" required placeholder="designation" id="aDesignation" name="aDesignation" 

     onChange={this.handleChange} required value={this.state.aDesignation}
     />
  </div><br/>
  <div class="form-group ml-5 mr-5"  style={{display:"inline-block",width:"40%"}}>
  <strong class="bmd-label-floating">Requesting Firm</strong>
    <input type="text" class="form-control" placeholder="Requesting Firm Name" id="arequestingFirm" name="arequestingFirm" onChange={this.handleChange} required value={this.state.arequestingFirm}/>
  </div>
  <div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong class="bmd-label-floating">Skills</strong>
    <input type="text" class="form-control" placeholder="Skills" id="askills" name="askills"
      onChange={this.handleChange} required value={this.state.askills}
    />
  </div>
<br/>
<div class="form-group ml-5 mr-5"  style={{display:"inline-block",width:"89%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">Project Title</strong>
    <input type="text" class="form-control" placeholder="Key Topic" id="projectTitle" name="projectTitle"
     onChange={this.handleChange} required value={this.state.projectTitle}
    />
  </div>
<hr/>
<div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3px",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Your Details
          </h3>
        </div>

<br/>
<div class="form-group ml-5 mr-5" style={{display:"inline-block",width:"40%"}}>
    <strong  class="bmd-label-floating">Name</strong>
    <input type="text" class="form-control" id="sname" name="sname" placeholder="Your Name" 
     onChange={this.handleChange} required value={this.state.sname} />
 
  </div>
  <div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">Designation</strong>
    <input type="text" class="form-control" placeholder="Your designation" id="sDesignation" name="sDesignation"
     onChange={this.handleChange} required value={this.state.sDesignation}
    />
  </div><br/>

  <div class="form-group  ml-5 mr-5" style={{display:"inline-block",width:"40%"}}>
    <strong  class="bmd-label-floating">Organization</strong>
    <input type="text" class="form-control" id="sOrganization" name="sOrganization" placeholder="Your Organization Name"
     onChange={this.handleChange} required value={this.state.sOrganization}
    />
  </div>

  <div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">Academic Focus/Industry</strong>
    <input type="text" class="form-control" placeholder="Your Academic Focus or Industry" id="sIndustry" name="sIndustry"
     onChange={this.handleChange} required value={this.state.sIndustry}
    />
  </div><br/>

  <div class="form-group ml-5 mr-5" style={{display:"inline-block",width:"40%"}}>
    <strong  class="bmd-label-floating">Mobile Number</strong>
    <input type="text" class="form-control" id="smobileNumber" name="smobileNumber" placeholder="Your Mobile Number" 
     onChange={this.handleChange} required value={this.state.smobileNumber}
    />
  </div>

  <div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">Email</strong>
    <input type="email" class="form-control" placeholder="Your Email-Id" id="semailId" name="semailId"
    onChange={this.handleChange} required value={this.state.semailId}
    />
  </div><br/>

  
  <div class="form-group  ml-5 mr-5"  style={{display:"inline-block",width:"40%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">LinkedIn Profile</strong>
    <input type="text" class="form-control" placeholder="Your Linked
    In Profile" id="sLinkedIn" name="sLinkedIn"
        onChange={this.handleChange} 
    />
</div>
<div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong class="bmd-label-floating">Years of Experience</strong>
    <input type="number" class="form-control" placeholder="Your years of Experience" id="yoe" name="yoe"
        onChange={this.handleChange} value={this.state.yoe} required
    />
  </div><br/>

  <div class="form-group ml-5 mr-5" style={{display:"inline-block",width:"40%"}}>
    <div><strong>Company Seal(Optional)</strong></div>
    <input type="file" id="sSealImage" name="sSealImage" onChange={this.handleImage}/>
  </div>

  <div class="form-group ml-5"  style={{display:"inline-block",width:"40%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">Displaye Name(Optional)</strong>
    <input type="text" class="form-control" placeholder="Name to be displayed in custom stamp" id="sSealName" name="sSealName"
        onChange={this.handleChange}
    />
  </div><br/>


<hr/>
<div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3px",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Recommending Reason
          </h3>
        </div>


<br/>

  <div class="form-group ml-5 mr-5"  style={{display:"inline-block",width:"89%"}}>
  <strong  for="exampleInputPassword1" class="bmd-label-floating">Describe Your View </strong>
    <textarea type="text" class="form-control"  rows={5} placeholder="Insert Personal Story Elaborating on Key Skills, Trait, Experience. Mention relevant character traits through specific examples. Kindly be very particular in giving instances of when the candidate displayed such a behaviour." id="rReason" name="rReason"  maxlength="350" value={this.state.rReason}
onChange={this.handleChange} required
/>
  </div><br/>

  <div class="form-group ml-5 mr-5" style={{display:"inline-block",width:"25%"}}>
    <strong  class="bmd-label-floating">Positive Trait</strong>
    <input type="text" class="form-control" id="trait1" placeholder="Positive Trait 1" name="trait1"
    onChange={this.handleChange} required
    />
  </div>
  <div class="form-group ml-5 mr-4" style={{display:"inline-block",width:"25%"}}>
    <input type="text" class="form-control" id="trait2" placeholder="Positive Trait 2" name="trait2"
    onChange={this.handleChange} required
    />
  </div>
  <div class="form-group ml-5" style={{display:"inline-block",width:"25%"}}>
    <input type="text" class="form-control" id="trait3" placeholder="Positive Trait 3" name="trait3"
    onChange={this.handleChange} required
    />
  </div> 
 <br/>




        <input 
          class="btn btn-success float-right ml-4"  style={{marginRight:"8%"}}
          type="submit" value="Submit" />
        {/* &nbsp;&nbsp;Submit&nbsp;&nbsp; */}
        {/* </input>   */}
        <input 
          class="btn btn-info float-right" type="button" value="Preview"  data-toggle="modal" data-target=".bd-example-modal-xl" />

<div class="modal lor fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog lor modal-xl"  style={{height:"60%"}}>
    <div class="modal-content lor">
      <div style={styles.br}>
    <Document >
    <Page style={styles.body } >
      <Text style={styles.header} fixed>
    
    </Text><br/><br/>
      <center><Text style={styles.title} className="mx-auto">Letter of Recommendation</Text></center>
      
      <span><p  className="ml-5"><Text><br/><br/>
      Dear Sir/Madam,
      </Text>
    
        <p className="float-right mr-4">{d.getDate()}/{d.getMonth()}/{d.getFullYear()}</p>
        </p>
      </span>
    <br/>  
    <h6  className="ml-5 mr-4"><strong>Sub:</strong>&nbsp;Letter of Recommendation for the post of <span><input type="text" name="aDesignation" class ="" value="aDesignation" onChange={this.handleChange} value={this.state.aDesignation}/></span></h6>
    <p className="ml-5">
    It is my pleasure to strongly recommend&nbsp; {this.state.aName}&nbsp;
    for &nbsp;
    <input type="text" class="" placeholder="Requesting Firm Name" id="arequestingFirm" name="arequestingFirm" onChange={this.handleChange} required value={this.state.arequestingFirm}/>

      </p>
      <p className="ml-5 mr-4">
      &nbsp;I am &nbsp;
    
      &nbsp; 
      <input type="text" class="" id="sname" name="sname" placeholder="Your Name" 
     onChange={this.handleChange} required value={this.state.sname} />,&nbsp;working as&nbsp;
         <input type="text" class="" placeholder="Your designation"  id="sDesignation" name="sDesignation"
     onChange={this.handleChange} required value={this.state.sDesignation}
    />  
       &nbsp;at  &nbsp;
       <input type="text" class="" placeholder="Your Organization" id="sOrganization" name="sOrganization"
     onChange={this.handleChange} required value={this.state.sOrganization}
    /> .
       I have {this.state.yoe} years of experience experience in the &nbsp;
       <input type="text" class="" placeholder="Your academic focus " id="sIndustry" name="sIndustry"
     onChange={this.handleChange} required value={this.state.sIndustry} 
    /> &nbsp;
      sector and have seen many young professionals come and go. 

       {this.state.aName}  &nbsp;is an individual who stands out from the crowd through
       {this.state.gender=="Male"?" his ":" her "} extradinory contributions.
        I worked with {this.state.aName}&nbsp;
        through the Open Innovation Platform "Vignatree".The name of the project &nbsp;{this.state.aName}&nbsp; was involved in is as given below. 
        <br/>&nbsp;&nbsp;&nbsp;
        1.{this.state.projectTitle}

        </p>
         <p className="ml-5 mr-4"> 
         {this.state.aName}&nbsp;
         displayed a thorough understanding of &nbsp;
         {this.state.askills.includes(",")?   <Text>{this.state.askills.substring(0,this.state.askills.lastIndexOf(","))+' & '+this.state.askills.substring(this.state.askills.lastIndexOf(",")+ 1)} </Text>:<Text>{this.state.askills}</Text>}.

          When we first met, I was immediately impressed with 
          &nbsp;{this.state.aName}&nbsp;
           and during the time we worked together, 
           {this.state.gender=="Male"?
           " his ":" her "
           }
           understanding of the project scope outgrew that of

           {this.state.gender=="Male"?
           " his ":" her "
           }
            
            peers.


         </p>
         <textarea type="text" className="ml-5 mr-4"  rows={2} placeholder="Insert Personal Story Elaborating on Key Skills, Trait, Experience. Mention relevant character traits through specific examples. Kindly be very particular in giving instances of when the candidate displayed such a behaviour." id="rReason" name="rReason" style={{width:"80%"}} maxlength="350"
onChange={this.handleChange} required value={this.state.rReason}
/>         
<p className='ml-5 mr-4'>
It’s not just
{this.state.gender=="Male"?
           " his ":" her "
           }
 
  technical skills that impressed me.
        {this.state.aName} &nbsp; was a joy to work with because of
       {this.state.gender=="Male"?
           " his ":" her "
           }
        
         amazingly positive attitude and
        <strong> {this.state.trait1} </strong>.    {this.state.gender=="Male"?
           "His ":"Her "
           }<strong> {this.state.trait2} </strong> and  <strong> {this.state.trait3} </strong> were also necessary and valued not just by myself, but by 
           
           {this.state.gender=="Male"?
           " his ":" her "
           }
            peers, who often relied on 
            {this.state.gender=="Male"?
           " him ":" her "
           }
            to get the job done.
        
I am absolutely confident that {this.state.aName} would be a great fit for your company.
Not only will 
{this.state.gender=="Male"?
           " he ":" she "
           }

 bring the kind of skills and experiences you’re looking for in an applicant, but also
 {this.state.gender=="Male"?
           " he ":" she "
           }
  will quickly become an asset and help your firm grow in any way 
  {this.state.gender=="Male"?
           " he ":" she "
           }
   can.
</p>
<p className='ml-5 mr-4'>

If you need more information or specific examples, please do not hesitate to contact me through my email-id: <strong>{this.state.semailId}</strong> or  hand phonenumber: <strong> {this.state.smobileNumber} </strong>. As a recommendation letter likely only provides a snapshot of 
{this.state.gender=="Male"?
          " his ":" her "
           }

 talents and achievements, I would be happy to further elaborate on my experience of working with 
 {this.state.gender=="Male"?
           " him ":" her "
           }
 .

</p>
<br/>
<h6 className="ml-5 mr-4">
Sincerely,
</h6>
<p  className="ml-5 mr-4">
  {this.state.sname},
  

<br/>  {this.state.sOrganization}
<br/> {this.state.sLinkedIn}
  </p>
        {this.state.sSealName!=''?
        <span class="ml-5 mr-4 is-approved">{this.state.sSealName}</span>
        :
        this.state.sSealImage!=''?
        <img
        class="ml-5 mr-4"
        alt="  hgc"
        src={this.state.icon}
        style={{
          height: "50px",
          width: "50px",
          // border: "2px solid grey",
        }}
        capture
      />
        :
        ""
        }

        <h6 className="my-auto" style={{color:"blue",bottom:"0",position:'relative',textAlign:"center"}}>Vignatree Inc. Chennai</h6>
      </Page>
      </Document>
    </div>









    </div>
  </div>
</div>

        {/* <button 
          className="btn btn-info float-right" 
          type="button" onClick={this._next}>
        &nbsp;&nbsp;Preview&nbsp;&nbsp; */}
        {/* </button>  */}
        <br/><br/> <hr/>
  </form>
  <form  onSubmit={(e) => this.Reject(e)}  method="POST">
  <strong class="ml-5" style={{color:"blue",fontSize:"120%"}}>Not willing to provide LOR</strong>
        
        <div class="form-group ml-5 mr-5"  style={{display:"inline-block",width:"89%"}}>
        <strong  for="exampleInputPassword1" class="bmd-label-floating">Reason </strong>
          <textarea type="text" class="form-control"  maxlength="300" rows={3} placeholder="Describe your reason for not providing LOR here..." id="rejectReason" name="rejectReason"
          onChange={this.handleChange} required
          />
        </div><br/>
      
      
              
        <input 
          class="btn btn-success float-right ml-4"  style={{marginRight:"8%"}}
          type="submit" value="Submit" />
      
    </form>
      </div>
      </div>
      
      </div>
      

    );
}
}

export default Lor;
