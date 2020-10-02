import React from "react";

import Axios from "axios";

import { Card, Button, CardDeck, Modal } from "react-bootstrap";

import { Redirect } from "react-router-dom";
import "../Wallet/wallet.css";

import { registerPlugin } from "react-filepond";
import { Multiselect } from "multiselect-react-dropdown";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

class ProblemRefiningPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id: localStorage.getItem("username"),
          title: "",
          desc: "",
          img: "",
          bucket: "",
          budget:"",
          file: "",
          imgname:"",
          filename: "",

          successMsg: "",
          options: [
            { name: "Agriculture", id: 1 },
            { name: "Arts & Sports", id: 2 },
            { name: "Automobiles", id: 3 },
            { name: "Climate", id: 4 },
            { name: "E-Commerce", id: 5 },
            { name: "Education & Training", id: 6 },
            { name: "Fashion", id: 7 },
            { name: "FMCG", id: 8 },
            { name: "Finance", id: 9},
            { name: "Healthcare", id: 10},
            { name: "Gems & Jewelery", id: 11},
            { name: "Infrastructure", id: 12},
            { name: "Law", id: 13},        
            { name: "Media & Entertainment", id: 14 },
            { name: "Pharmaceuticals", id: 15},
            { name: "Power & Energy", id: 16},
            { name: "Railways", id: 17},
            { name: "Science & Tech", id: 18},
            { name: "Security", id: 19},
            { name: "Textile", id: 20},
            { name: "Trade", id: 21},
            { name: "Travel & Tourism", id: 22},
        ],
          selectedValue: [],
          redirect: "",
          show: false,
          showerror: false,
          balance: "",
          initial: 'forumpost',
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
    
      // <script>
      // $(document).ready(function() {
      //     $('.mdb-select').materialSelect()});
      // </script>
      handleLogo(e) {
        let img = e.target.files[0];
        this.setState({ img: img,imgname:img.name });
      }
      handleFile(e) {
        let file = e.target.files[0];
        this.setState({ file: file,filename:file.name });
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
              if (this.state.balance < this.state.budget * 0.07)
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
                <table style={{ width: "100%" }}>
                  <tbody>  
                  

  
  
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
                        <label htmlFor="desc">Describe your Project</label>
                      </td>
                      <td className="p-4">
                        <textarea
                          className="form-control"
                          required
                          placeholder="Describe your project here..."
                          rows={5}
                          id="desc"
                          name="desc"
                          onChange={this.handleChange}
                          value={this.state.description}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <label htmlFor="img">Image</label>
                      </td>
                      <td className="p-4">
                    
  
                    <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      onChange={this.handleLogo}
                    />
                    <label class="custom-file-label" id="file">
                      {this.state.imgname}
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
                        <label htmlFor="bucket">Fields Reqired</label>
                      </td>
                      <td className="p-4">
                      <select
              id="buckets"
              placeholder="your"
              className="form-control"
              name="buckets"
              onChange={this.handleChange}
              required
            >
              {this.state.options.map((domains, index) => (
                <option value={domains.name}>{domains.name}</option>
              ))}
            </select>
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
                      {this.state.filename}
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
                      Note : You have to pay 7% of your budget
                      inorder to post your challange in our platform.
                    </td>
                    <br />
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
export default ProblemRefiningPost;