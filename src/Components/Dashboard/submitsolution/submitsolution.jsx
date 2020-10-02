import React from "react";
import Navbar from "../../Navbar/nav";
import axios from "axios";

class SubmitSolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      title: "",
      desc: "",
      abstract: "",
      image: null,
      video: "",
      document: "",
      problemId: localStorage.getItem("currentproblem"),
      successMsg: "",
      collaboration: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleDocument = this.handleDocument.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleImage(e) {
    let logo = e.target.files[0];
    this.setState({ successMsg: "" });
    await this.setState({ image: logo });
  }
  async handleDocument(e) {
    let file = e.target.files[0];
    this.setState({ successMsg: "" });
    await this.setState({ document: file });
  }
  async handleVideo(e) {
    let file = e.target.files[0];
    this.setState({ successMsg: "" });
    await this.setState({ video: file });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let formdata = new FormData();

    formdata.append("username", this.state.username);
    formdata.append("problemId", this.state.problemId);
    formdata.append("title", this.state.title);
    formdata.append("desc", this.state.desc);
    formdata.append("abstract", this.state.abstract);
    formdata.append("image", this.state.image);
    formdata.append("video", this.state.video);
    formdata.append("docs", this.state.document);
    formdata.append("collaboration", this.state.collaboration);

    // for (var value of formdata.values()) {
    //  }

    axios.post("/sol/solution/", formdata).then((response) => {
      if (response.data.value == "Uploadvalidfile") {
        this.setState({
          successMsg: "Check the details entered and the uploaded files...!",
        });
      } else if (response.data.value == "Successfully Saved") {
        this.setState({
          successMsg: "Submitted Succuessfully...!",
          title: "",
          desc: "",
          abstract: "",
          image: null,
          video: "",
          document: "",
        });
        window.location = "/dashboard/ProblemInvolved";
      }
    });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <Navbar />
        <div
          className="postproblem col-sm-12 col-md-8"
          style={{ width: "100%", marginTop: "5%", padding: "10px" }}
        >
          <h4 className="p-4">Submit Solution</h4>
          <br />
          <form onSubmit={async (e) => await this.handleSubmit(e)}>
            <div style={{ fontWeight: 600 }}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td className="p-4">
                      <label
                        htmlFor="title"
                        className="form-label-lg"
                        style={{ fontSize: "20px" }}
                      >
                        Title of your Solution
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
                      <label htmlFor="abstract">Solution Abstract</label>
                    </td>
                    <td className="p-4">
                      <textarea
                        className="form-control"
                        placeholder="Describe your project here..."
                        rows={5}
                        id="abstract"
                        required
                        name="abstract"
                        onChange={this.handleChange}
                        value={this.state.abstract}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="description">
                        Describe your Solution
                      </label>
                    </td>
                    <td className="p-4">
                      <textarea
                        className="form-control"
                        placeholder="Describe your project here..."
                        rows={5}
                        id="description"
                        required
                        name="desc"
                        onChange={this.handleChange}
                        value={this.state.desc}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="image">Images</label>
                    </td>
                    <td className="p-4">
                      <input
                        type="file"
                        className="form-control-file"
                        id="image"
                        required
                        name="image"
                        onChange={this.handleImage}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="document">Documents for Reference</label>
                    </td>
                    <td className="p-4">
                      <input
                        type="file"
                        className="form-control-file"
                        required
                        id="document"
                        name="document"
                        onChange={this.handleDocument}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="video">Videos</label>
                    </td>
                    <td className="p-4">
                      <input
                        type="file"
                        className="form-control-file"
                        required
                        id="video"
                        name="video"
                        onChange={this.handleVideo}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="FormField_Checkbox"
                        id="collaboration"
                        name="collaboration"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="video" className="ml-3">
                        Wish to colloborate this solution with others?
                      </label>
                    </td>
                  </tr>
                  <span className="float-right text-danger">
                    {this.state.successMsg}
                  </span>
                  <tr>
                    <td colSpan={2} className="p-4">
                      <button
                        type="submit"
                        className="btn btn-success ml-5 mt-3 float-right"
                        style={{ width: "15%" }}
                      >
                        Submit
                      </button>
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

export default SubmitSolution;
