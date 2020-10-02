import React from "react";
import "../Abstract/Abstract.css";
import "../Collaborate/Collaborate.css";

import CollabCard from "../Collaborate/CollabCard";
import { Button } from "react-bootstrap";
import Navbar from "../Navbar/nav";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Try extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected:this.handleClick2(),
      absParam: props.location.state.absParam,
      allData: props.location.state.allData,
      problemId: props.location.state.problemId,
      selectedID: [],
      Redirect: false,
      contractNumber: 0,
    };
    this.state.selectedID.push(this.state.absParam);
    this.submit = this.submit.bind(this);
  }

  handleClick1 = (all) => {
    document
      .getElementById("CollDiv1")
      .appendChild(document.getElementById(all.solutionId));
    this.state.selectedID.push(all);
  };

  //  handleClick2 = (all) => {
  //    document.getElementById("CollDiv2").appendChild(
  //     document.getElementById(all.solutionId)
  //   );
  //   const filteredItems = this.state.selectedID.filter(id => id != all)
  //   this.setState(this.state.selectedID = filteredItems)
  //   }
  componentDidMount() {
    this.submit();
  }

  async submit() {
    await axios
      .post("/contract/create-contract/" + this.state.problemId + "/")
      .then((response) => {
        if (response.status == 200) {
          this.setState({ contractNumber: response.data.contractNumber });

          let data = new FormData();

          data.append("username", this.state.selectedID[0].username);
          data.append("contract", this.state.contractNumber);
          data.append("solution", this.state.selectedID[0].solutionId);
          data.append("revenue", 100);

          let name = this.state.selectedID[0].username;
          const headers = {
            "Content-Type": "multipart/form-data",
            // 'Authorization': token
          };
          axios
            .post("/contract/create-description/", data, {
              headers: headers,
            })
            .then((response) => {
              if (response.status == 200) {
                axios
                  .post(
                    "/contract/seekerCollaboration/" +
                      this.state.contractNumber +
                      "/" +
                      name +
                      "/"
                  )
                  .then((response) => {
                    this.setState({ Redirect: true });
                  });
              }
            });
        }
      });
  }

  render() {
    const allData = this.state.allData;
    console.log(allData);
    return (
      <div>
        <Navbar />
        <section>
          <div className="outerDiv" id="CollDiv1">
            <div class="diagonal1">Accepted</div>
            {allData.map((all, key = all.solutionId) => (
              <div>
                {this.state.absParam.solutionId == all.solutionId && (
                  <CollabCard
                    collData={all}
                    click1={() => this.handleClick1(all)}
                  />
                )}
              </div>
            ))}
          </div>
          {/* <Link to={{pathname:"/contract",state:{selectedID:this.state.selectedID,absParam:this.state.absParam,problemId:this.state.problemId}}}> */}
          <Button
            style={{
              float: "right",
              marginTop: "10px",
              marginRight: "60px",
              backgroundColor: "green",
            }}
            onClick={this.submit}
          >
            Submit
          </Button>
          {/* </Link>  */}

          {/* <div id="CollDiv2" style={{marginTop:"60px",marginLeft:"30px",marginRight:"30px",width: "1290px"}}>
   {
      allData.map(
        all => 
        <div>
     {
       this.state.absParam.solutionId != all.solutionId &&
        
          <CollabCards collData={all} click1={()=>this.handleClick1(all)} click2={()=>this.handleClick2(all)}/>
          

     }
  </div>
      )
   }
  </div> */}
        </section>
        {this.state.Redirect && (
          <Redirect
            to={{
              pathname: "/contract",
              state: {
                selectedID: this.state.selectedID,
                absParam: this.state.absParam,
                problemId: this.state.problemId,
                contract: this.state.contractNumber,
              },
            }}
          ></Redirect>
        )}
      </div>
    );
  }
}

export default Try;
