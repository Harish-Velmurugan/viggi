import React from "react";
import SSSlay from "./viewsolutioncard";
import Navbar from "../Navbar/nav";
import axios from "axios";

class SSSobj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      absParam: props.location.state.absParam,
      allData: props.location.state.allData,
      problemId: props.location.state.problemId,
      selectedsoln: [],
      i: props.location.state.absParam.solutionId - 1,
      acpt: "ACCEPT",
      contractNumber: 0,
      seeker: props.location.state.seeker,
    };
    this.nxtSolution = this.nxtSolution.bind(this);
    this.prevSolution = this.prevSolution.bind(this);
    this.acceptsoln = this.acceptsoln.bind(this);
    this.submitsoln = this.submitsoln.bind(this);
    console.log(this.state);
  }

  
  nxtSolution() {
    if (this.state.i > 0) {
      console.log(this.state.allData);
      this.setState({ i: this.state.i - 1 });
      this.setState({ absParam: this.state.allData[this.state.i] });
    } else {
      alert("No more solutions");
    }
  }

  prevSolution() {
    console.log(this.state.allData);
    if (this.state.i < this.state.allData.length - 1) {
      this.setState({ i: this.state.i + 1 });
      this.setState({ absParam: this.state.allData[this.state.i] });
    } else {
      alert("No more solutions");
    }
  }

  acceptsoln() {
    var flag = 0;
    for (var i = 0; i < this.state.selectedsoln.length; i++) {
      if (
        this.state.absParam.solutionId == this.state.selectedsoln[i].solutionId
      ) {
        alert("Solution already accepted!");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.state.selectedsoln.push(this.state.absParam);
      alert("Solution accepted!");
    }
    //document.getElementById(this.state.absParam.solutionId).innerHTML="ACCEPTED"
    // if(this.state.absParam.status){
    //     document.getElementById(this.state.absParam.solutionId).innerHTML="ACCEPTED"
    // }

    //   let x=this.state.absParam.solutionId
    //     if(this.state.selectedsoln!=null){
    //     for(var i=0 ;i<this.state.allData.length; i++){
    //         if(x!=null ){
    //         if(x==this.state.allData[i].solutionId){
    //             //document.getElementById(this.state.absParam.solutionId).innerHTML="ACCEPTED"
    //             this.setState({acpt:"ACCEPTED"})
    //         }
    //     }

    //     }
    // }

    //     if(this.state.absParam!=null){
    //     var x = this.state.absParam.solutionId

    //     for(var i=0 ;i<=this.state.selectedsoln.length; i++)
    //      {  if(this.state.selectedsoln[i].solutionId!=null)
    //         {
    //         }
    //         // if(x==this.state.selectedsoln[i].solutionId-1){
    //         //  document.getElementById("accept").innerHTML="ACCEPTED"
    //     }
    // }
    // }

    // if(this.state.absparam.solutionId==this.state.selectedsoln[0].solutionId){
    // document.getElementById("accept").innerHTML="ACCEPTED"
    // }

    // //document.getElementById("accept").innerHTML="ACCEPTED"
    // if(this.state.absparam.solutionId==x){

    // }
    // else
    // {
    //     document.getElementById("accept").innerHTML="AXX"
    // }
  }

  async submitsoln(selected) {
    // if (this.state.selectedsoln.length == 0) {
    //   alert("Please select atleast one solution.");
    //   //<Redirect to ="/viewsolution"/>
    // }
  }

  render() {
    return (
      <div className="SSSobj">
        <Navbar />
        <SSSlay
          but={this.state.acpt}
          submit={() => this.submitsoln()}
          user={this.state.absParam}
          selected={this.state.selectedsoln}
          alldata={this.state.allData}
          problemId={this.state.problemId}
          next={() => this.nxtSolution()}
          prev={() => this.prevSolution()}
          accept={() => this.acceptsoln()}
          seeker={this.state.seeker}
        />
      </div>
    );
  }
}

export default SSSobj;
