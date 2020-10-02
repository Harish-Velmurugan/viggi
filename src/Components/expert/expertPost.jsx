import React from "react";

import Axios from "axios";
import { Redirect } from "react-router-dom";
import SortableTree from "react-sortable-tree";

import { registerPlugin } from "react-filepond";
import { Multiselect } from "multiselect-react-dropdown";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

class ExpertPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.location.state.username,
      sol: props.location.state.sid,
      bucket: props.location.state.bucket,
      tree: props.location.state.tree,
      treeSet: props.location.state.treeSet,
      id: localStorage.getItem("username"),
      title: "",
      description: "",
      logo: "",
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
      redirect: "",
      show: false,
      showerror: false,
      balance: "",
      initial: "30",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogo = this.handleLogo.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onSelect = this.onSelect.bind(this);
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
  handleLogo = (e) => {
    let logo = e.target.files[0];
    console.log(logo);
    this.setState({ logo: logo });
  };
  handleFile = (e) => {
    let file = e.target.files[0];
    console.log(file);
    this.setState({ file: file });
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      show: true,
      skill1: this.state.skills[0] == "" ? this.state.skills[0].name : "",
      skill2: this.state.skills[1] == "" ? this.state.skills[1].name : "",
      skill3: this.state.skills[2] == "" ? this.state.skills[2].name : "",
      skill4: this.state.skills[3] == "" ? this.state.skills[3].name : "",
    });

    let skill =
      this.state.skill1 +
      "," +
      this.state.skill2 +
      "," +
      this.state.skill3 +
      "," +
      this.state.skill4;
    localStorage.setItem("payment", this.state.budget);
    localStorage.setItem("state", this.state);
    console.log(this.state);

    let username = localStorage.getItem("username");
    let form_data = new FormData();

    form_data.append("username", this.state.username);
    form_data.append("expertHelp", this.state.sol);
    form_data.append("title", this.state.title);
    form_data.append("description", this.state.description);
    form_data.append("skill", JSON.stringify(this.state.skills));
    form_data.append("files", this.state.file);
    form_data.append("img", this.state.logo);
    form_data.append("bucket", this.state.bucket);

    Axios.post("/sol/expertPost/", form_data)
      .then((response1) => {
        console.log(response1);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div className="main_content">
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
              {this.state.treeSet && (
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
                      <div
                        className="card-body"
                        style={{ marginTop: "25px", marginRight: "400px" }}
                      >
                        <SortableTree treeData={this.state.tree} />
                      </div>
                    </div>
                  </center>
                </>
              )}
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
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="problemlogo">Problem Logo</label>
                    </td>
                    <td className="p-4">
                      <input
                        type="file"
                        required
                        className="form-control-file"
                        id="problemlogo"
                        name="problemlogo"
                        onChange={this.handleLogo}
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
                        selectedValues={this.state.skils}
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name"
                        showCheckbox={true} // Property name to display in the dropdown options
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
                      <input
                        type="file"
                        className="form-control-file"
                        required
                        id="attachments"
                        name="attachments"
                        onChange={this.handleFile}
                      />
                      {/* <FilePond id="attachments" name="attachments" onChange={this.handleFile} allowMultiple={true}/>  */}
                    </td>
                  </tr>
                  <br />
                  <br />
                  <br />
                  {/* <tr>  */}
                  <td className=" mt-5" style={{ color: "red" }}>
                    Note : Problem framed by experts will not be posted on this
                    platform until payment is done by seekers.
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
                        value="Frame"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ExpertPost;
