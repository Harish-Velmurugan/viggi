import React from "react";

import Axios from "axios";
import { Redirect } from "react-router-dom";
import "../../Wallet/wallet.css";
import SortableTree from "react-sortable-tree";
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  FormCheck,
} from "react-bootstrap";
import { registerPlugin } from "react-filepond";
import { Multiselect } from "multiselect-react-dropdown";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

class PostProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("username"),
      title: "",
      description: "",
      img:'',
      filesss:'',
      logo: "",
      budget: "",
      deadline: "",
      file: "",
      skills: ["", "", "", ""],
      skill1: "",
      skill2: "",
      skill3: "",
      skill4: "",
      successMsg: "",
      options: [
        { name: "Algorithms", id: 1 },
        { name: "Cryptography", id: 2 },
        { name: "Distributed Computing", id: 3 },
        { name: "Cloud Computing", id: 4 },
        { name: "Computational Learning ", id: 5 },
        { name: "Computer Vision", id: 6 },
        { name: "Big Data ", id: 7 },
        { name: "Medicine ", id: 8 },
      ],
      selectedValue: [],
      select:[],
      redirect: "",
      show: false,
      showerror: false,
      balance: "",
      initial: '30',
      experts:[],
      wicked:[], 
      tree: '',
      treeSet:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogo = this.handleLogo.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handlePay = this.handlePay.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.handleTemplate = this.handleTemplate.bind(this)
    this.handleTree = this.handleTree.bind(this)
  }


  async handleTemplate(e){
    let target = e.target;
    let value = target.value;
    let name = target.name;

    let i =this.state.experts[value].img
    let j =this.state.experts[value].files

    let response = await fetch(this.state.experts[value].img);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let img = new File([data], "test.jpg", metadata);
    console.log(img)

    response = await fetch(this.state.experts[value].files);
    data = await response.blob();
    metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);
    console.log(file)

    this.setState({
      [name]: value,
      title : this.state.experts[value].title,
      description: this.state.experts[value].description,
      logo :  img,
      file: file,
      skills: JSON.parse(this.state.experts[value].skill),
      select: JSON.parse(this.state.experts[value].skill),
      img:i.substring(i.lastIndexOf('/')+1,i.length),
      filesss:j.substring(j.lastIndexOf('/')+1,j.length),
    });

    console.log(this.state.experts[value].skill)
    

  }

  async handleTree(e){

    let target = e.target;
    let value = target.value;
    let name = target.name;

    await Axios.get("/sol/getTree/" + this.state.wicked[value].postId + "/")
    .then(res =>{
      this.setState({
        tree :JSON.parse(res.data[0].treeBase), 
        treeSet:true
      })
      
    })

  }

  onSelect(selectedList, selectedItem) {
    this.setState({ skills: selectedList });
  }

  onRemove(selectedList, removedItem) {}
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount(){


    Axios.get('/sol/postProblemSeeker/'+ localStorage.getItem("username") + "/").then((res)=>{
      this.setState({
        experts:res.data[0],
        wicked:res.data[1]
      })
      console.log(res.data)
    })

  }

  // <script>
  // $(document).ready(function() {
  //     $('.mdb-select').materialSelect()});
  // </script>
  handleLogo(e) {
    let logo = e.target.files[0];
    this.setState({ logo: logo , img:logo.name});

    
  }
  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file, filesss:file.name });
  }

  handleWallet(e) {
    e.preventDefault();
    const url = "/";
    const method = "GET";
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
          if (this.state.balance < this.state.budget * 0.3)
            this.setState({ showerror: true });
          else this.setState({ redirect: "wallet" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePay(e) {
    e.preventDefault();
    this.setState({ redirect: "bid" });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      show: true,
      skill1: this.state.skills[0] ? this.state.skills[0].name : "",
      skill2: this.state.skills[1] ? this.state.skills[1].name : "",
      skill3: this.state.skills[2] ? this.state.skills[2].name : "",
      skill4: this.state.skills[3] ? this.state.skills[3].name : "",
    });
    localStorage.setItem("payment", this.state.budget);
    localStorage.setItem("state", this.state);
  }

  render() {
    if (this.state.redirect == "bid") {
      return (
        <Redirect push to={{ pathname: "/bid", state: { main: this.state } }} />
      );
    }

    if (this.state.redirect == "wallet") {
      return (
        <Redirect
          push
          to={{ pathname: "/walletpay", state: { main: this.state } }}
        />
      );
    }
    return (
      <div className="main_content">
        {/* <div
          className="card"
          style={{
            color: "snow",
            textAlign: "centre",
            paddingLeft: "25rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ textAlign: "centre", paddingTop: "4px" }}>
            Post Your Problem
          </h3>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>
            Post Your Problem
          </h3>
        </div>

        <div className="postproblem">
          <form onSubmit={this.handleSubmit}>
            <div className="" style={{ fontWeight: 600 }}>

            {this.state.treeSet && 
                <>
                <center>
                  <div
                className="card"
                style={{
                  height: "80vh",
                  margin: "50px",
                  backgroundColor: "white",
                }}
              >
                <div className="card-body" style={{ marginTop: "25px",marginRight:"400px" }}>
                  <SortableTree
                    treeData={this.state.tree}
                  />
                </div>
                </div>
                </center>
                </>
                }
              <table style={{ width: "100%" }}>
                <tbody>

                {this.state.experts.length > 0 &&
                <tr>
                    <td className="p-4">
                      <label
                        htmlFor="title"
                        className="form-label-lg"
                        style={{ fontSize: "20px" }}
                      > 
                        Use your template by Experts
                      </label>
                    </td>
                    <td className="p-4">
                      {" "}
                      <select 
                        className="form-control form-control-lg"
                        name="template"
                        id ="template"
                        value={this.state.template}
                        onChange={this.handleTemplate}>

                        <option selected>Select your template</option>
                        {this.state.experts.map((expert,i)=>
                          <option  value={i}>{expert.title}</option>
                        
                        )}
                      </select>
                    </td>
                  </tr>
                }

                {!this.state.treeSet && this.state.wicked.length > 0 &&
                <tr>
                    <td className="p-4">
                      <label
                        htmlFor="title"
                        className="form-label-lg"
                        style={{ fontSize: "20px" }}
                      > 
                        Use your wicked problem tree
                      </label>
                    </td>
                    <td className="p-4">
                      {" "}
                      <select 
                        className="form-control form-control-lg"
                        name="template"
                        id ="template"
                        value={this.state.template}
                        onChange={this.handleTree}>

                        <option selected>Select your template</option>
                        {this.state.wicked.map((expert,i)=>
                          <option  value={i}>{expert.title}</option>
                        
                        )}
                      </select>
                    </td>
                  </tr>
                }


                


                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="title"
                        className="form-label-lg"
                        style={{ fontSize: "20px" }}
                      >
                        Title of your Project
                      </label>
                    </td>
                    <td className="p-4">
                      {" "}
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="title"
                        required
                        placeholder="Your Project Name/Title"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="description">Describe your Project</label>
                    </td>
                    <td className="p-4">
                      <textarea
                        className="form-control"
                        required
                        placeholder="Describe your project here..."
                        rows={5}
                        id="description"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="problemlogo">Problem Logo</label>
                    </td>
                    <td className="p-4">
                  

                  <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    onChange={this.handleLogo}
                  />
                  <label class="custom-file-label" id="file">
                    {this.state.img}
                  </label>
                </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="budget">Research Budject</label>
                    </td>
                    <td className="p-4">
                      <input
                        style={{ width: "60%" }}
                        type="number"
                        className="form-control"
                        placeholder="Winning credit in US Dollars"
                        id="budget"
                        name="budget"
                        required
                        onChange={this.handleChange}
                        maxLength="5"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="skils">Skills Reqired</label>
                    </td>
                    <td className="p-4">
                      <Multiselect
                        options={this.state.options}
                        selectedValues={this.state.select}
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name"
                        showCheckbox={true} // Property name to display in the dropdown options
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="deadline" className="form-label">
                        Deadline for the Project
                      </label>
                    </td>
                    <td className="p-4">
                      <input
                        type="date"
                        required
                        className="form-control"
                        style={{ width: "50%" }}
                        id="deadline"
                        name="deadline"
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="attachments">
                        Documents for Reference
                      </label>
                    </td>
                    <td className="p-4">
                    <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    onChange={this.handleFile}
                  />
                  <label class="custom-file-label" id="file">
                    {this.state.filesss}
                  </label>
                </div>
                      {/* <FilePond id="attachments" name="attachments" onChange={this.handleFile} allowMultiple={true}/>  */}
                    </td>
                  </tr>
                  <br />
                  <br />
                  <br />
                  {/* <tr>  */}
                  <td className=" mt-5" style={{ color: "red" }}>
                    Note : Initially you have to deposit 30% of your budget
                    inorder to post your challange in our platform.
                  </td>
                  {/* </tr> */}
                  <br />
                  <tr>
                    <td colSpan={2} className="p-4">
                      <input
                        type="submit"
                        onClick={this.handleSubmit}
                        className="btn btn-success ml-5 mt-3 float-right"
                        style={{ width: "15%" }}
                        value="Post"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              {this.state.showerror && (
                <div className="red-alerts">
                  <p>Recharge Your Wallet or Pay Directly</p>
                </div>
              )}

              {this.state.show && (
                <div className="payment-post">
                  <button class="button-p" onClick={this.handleWallet}>
                    Pay With Wallet
                  </button>
                  <button class="button-p" onClick={this.handlePay}>
                    Pay Directly
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostProblem;
