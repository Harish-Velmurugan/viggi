import React from "react";
import "../Contract/contract.css";
import Navbar from "../Navbar/nav";
//import TC from '../T&C/TC'
import { Redirect } from "react-router-dom";
import axios from "axios";
import TC from "../T&C/TC";

class Contract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sol_name: null,
      sol_mail: null,
      sol_phoneno: null,
      sol_gender: null,
      sol_nationality: null,
      sol_location: null,
      sol_DOB: null,
      sol_ID: null,

      sek_name: null,
      sek_mail: null,
      sek_phoneno: null,
      sek_location: null,

      sol: false,
      sek: false,
      redirect: false,
      sek_probId: this.props.location.state.problemId,

      cn: this.props.location.state.contractNumber,

      //not_cn:this.props.location.state.contract,
      //seeker wait
      final: false,
      //solver
      solverView: false,
      agree: false,

      check: false,
    };

    // this.handle_sol=this.handle_sol.bind(this);
    // this.handle_sek=this.handle_sek.bind(this);
    // this.check=this.check.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    console.log(this.props.location.state.solId);
  }

  componentDidMount() {
    window.removeEventListener("load", this.handleLoad());
  }

  async handleLoad() {
    // axios.get(`/users/v1/users/seekerDetails/${this.state.sek_probId}/`).
    // then(response =>  {
    //     this.setState({
    //         sek_name:response.data[0][0].firstname+" "+response.data[0][0].lastname,
    //         sek_mail:response.data[2].email,
    //         sek_phoneno:response.data[0][0].phone,
    //         sek_gender:response.data[0][0].gender,
    //         sek_location:response.data[0][0].nationality,
    //         sek_DOB:response.data[0][0].dob,
    //     })

    // }
    // )
    // axios.get(`/users/v1/users/solverDetails/${this.state.sek_probId}/`).
    // then(response=> {
    //     this.setState({
    //         sol_name:response.data[0][0].firstname+" "+response.data[0][0].lastname,
    //         sol_mail:response.data[2].email,
    //         sol_phoneno:response.data[0][0].phone,
    //         sol_gender:response.data[0][0].gender,
    //         sol_nationality:response.data[0][0].nationality,
    //         sol_DOB:response.data[0][0].dob,

    //     })
    // })

    //agree
    axios
      .get(`/contract/view-description/${this.state.cn}/`)

      .then((response) => {
        this.setState({
          sek_name:
            response.data[4].firstname + " " + response.data[4].lastname,
          sek_mail: response.data[2].email,
          sek_phoneno: response.data[4].phone,
          sek_gender: response.data[4].gender,
          sek_location: response.data[4].nationality,
          sek_DOB: response.data[4].dob,

          sol_name:
            response.data[2][0].firstname + " " + response.data[2][0].lastname,
          sol_mail: response.data[2].email,
          sol_phoneno: response.data[2][0].phone,
          sol_gender: response.data[2][0].gender,
          sol_nationality: response.data[2][0].nationality,
          sol_DOB: response.data[2][0].dob,
          sol_ID: response.data[1][0].username,
        });

        console.log(response.data);

        this.setState({ agree: response.data[1][0].agreed });
        if (response.data[1][0].username == localStorage.getItem("username")) {
          this.setState({ solverView: true });
        }
        if (!response.data[0].agreed) {
          this.setState({ check: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/contract/view-description/${this.state.cn}/`)

      .then((response) => {
        this.setState({
          sek_name:
            response.data[4].firstname + " " + response.data[4].lastname,
          sek_mail: response.data[2].email,
          sek_phoneno: response.data[4].phone,
          sek_gender: response.data[4].gender,
          sek_location: response.data[4].nationality,
          sek_DOB: response.data[4].dob,

          sol_name:
            response.data[2][0].firstname + " " + response.data[2][0].lastname,
          sol_mail: response.data[2].email,
          sol_phoneno: response.data[2][0].phone,
          sol_gender: response.data[2][0].gender,
          sol_nationality: response.data[2][0].nationality,
          sol_DOB: response.data[2][0].dob,
        });

        this.setState({ agree: response.data[1][0].agreed });
        if (response.data[1][0].username == localStorage.getItem("username")) {
          this.setState({ solverView: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/tc" />;
    }

    return (
      <div>
        <Navbar />
        <div
          className="inner0"
          style={{
            minWidth: "300px",
            padding: "2.3%",
            marginTop: "100px",
            marginLeft: "5.5%",
            width: "90%",
            backgroundColor: "white",
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>
              Vignatree Seeker - Solver Contract
            </h3>
          </div>
          <hr />
          <div>
            <div class="ctable">
              <div
                className="inner0"
                style={{
                  backgroundColor: "#323754",
                  color: "white",
                  width: "37%",
                  marginLeft: "10%",
                  minWidth: "250px",
                  padding: "3%",
                }}
              >
                <table>
                  <th style={{ color: "gold" }}>
                    <strong>
                      <u>
                        <h4>SOLVER INFORMATION</h4>
                      </u>
                    </strong>
                  </th>

                  <tr>
                    <td>
                      <b>Name :</b> {this.state.sol_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Phone No :</b> {this.state.sol_phoneno}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Country of Residense :</b> {this.state.sol_nationality}
                    </td>
                  </tr>
                  {/* <tr>
              <td>
                <b>DOB :</b> {this.state.sol_DOB}
              </td>
              </tr>
              <tr>
              <td>
                <b>Gender :</b> {this.state.sol_gender}
              </td>
              </tr> */}
                </table>
              </div>
              <div
                className="inner0"
                style={{
                  backgroundColor: "#323754",
                  color: "white",
                  width: "37%",
                  minWidth: "250px",
                  padding: "3%",
                  marginLeft: "10%",
                  marginBottom: "50px",
                }}
              >
                <table>
                  <th id="h2" style={{ color: "gold" }}>
                    <strong>
                      <u>
                        <h4>SEEKER INFORMATION</h4>
                      </u>
                    </strong>
                  </th>
                  <tr>
                    <td>
                      <b>Company Name :</b> {this.state.sek_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Phone No :</b> {this.state.sek_phoneno}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Location :</b> {this.state.sek_location}
                    </td>
                  </tr>
                </table>
              </div>

              <br />

              {/* <tr id="size">
                        <td><b>Email ID :</b> {this.state.sol_mail}</td>
                        <td><b>Email ID :</b> {this.state.sek_mail}</td>
                    </tr> */}

              <tc id="size">
                <br />

                <br />
              </tc>
              <br />
              <br />
              {this.check}
            </div>
            <br />
          </div>
          <div>
            <TC
              agree={this.state.agree}
              solID={this.state.sol_ID}
              final={this.state.final}
              solverView={this.state.solverView}
              contractNumber={this.state.cn}
              solnID={this.props.location.state}
              check={this.state.check}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Contract;

//    async handle_sol(){
//     // document.getElementById('sol').style.backgroundColor="green";
//     // this.state.sol=true;
//     let name = localStorage.getItem("username")
//      if(!this.state.agree){
//      await axios.post('/contract/agree/'+name+'/'+this.state.Contract.contractNumber+'/')
//      .then((response)=>{
//         if(response.status == 200 ){
//           //document.getElementById("btn"+index).style.background = "green";
//           this.setState({agree:true})

//          }
//     });
// }

//     }

// handle_sek(){
//     // document.getElementById('sek').style.backgroundColor="green";
//     // this.state.sek=true;
//     // this.handleLoad()
// }

// check(){
//     // if(this.state.sol==true && this.state.sek==true)
//     // {  this.setState({redirect:true})

//     // }
// }
