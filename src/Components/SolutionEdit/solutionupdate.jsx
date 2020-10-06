import React from "react";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Axios from "axios";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

class SolutionUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemStatus: props.problemDetails.solved,
      problemId: props.solution.problemId,
      collaboration: props.solution.collaboration,
      agreed: props.solution.agreed,
      solutionId: props.solution.solutionId,
      username: props.solution.username,
      title: props.solution.title,
      abstract: props.solution.abstract,
      desc: props.solution.desc,
      image: props.solution.image,
      video: props.solution.video,
      docs: props.solution.docs,
      icon: props.solution.image,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleDocs = this.handleDocs.bind(this);
    this.update = this.update.bind(this);
  }
  handleChange(e, val) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    document.getElementById(val + "updateSuccess").innerHTML = "";
    this.setState({
      [name]: value,
    });
  }

  handleImage = (e, val) => {
    let logo = e.target.files[0];
    document.getElementById(val + "updateSuccess").innerHTML = "";
    this.setState({ image: logo });
    this.setState({ icon: URL.createObjectURL(e.target.files[0]) });
  };

  handleDocs(e, val) {
    let file = e.target.files[0];
    document.getElementById(val + "updateSuccess").innerHTML = " ";
    this.setState({ docs: file });
  }
  handleVideo(e, val) {
    let file = e.target.files[0];
    document.getElementById(val + "updateSuccess").innerHTML = " ";
    this.setState({ video: file });
  }

  update(a) {
    let formdata = new FormData();
    formdata.append("solutionId", Number(this.state.solutionId));
    formdata.append("problemId", Number(this.state.problemId));
    formdata.append("title", this.state.title);
    formdata.append("desc", this.state.desc);
    formdata.append("abstract", this.state.abstract);
    formdata.append("docs", this.state.docs);
    formdata.append("image", this.state.image);
    formdata.append("video", this.state.video);
    formdata.append("username", Number(this.state.username));

    Axios.post(
      "/dashboard/solUpdate/" + a + "/",
      formdata,

      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.status == 200) {
        document.getElementById(a + "updateSuccess").innerHTML =
          "Updated Successfully!";
      }
    });
  }

  render() {
    console.log("*=*=");
    return (
      <div id="accordion" className="ml-3">
        <div
          class="card"
          style={{
            minWidth: "200px",
          }}
        >
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <img
                alt="  hgc"
                src={this.state.icon}
                style={{
                  height: "100px",
                  width: "100px",
                  border: "2px solid grey",
                }}
                capture
              />
              &nbsp;<strong>{this.state.title}</strong>
              {this.state.collaboration ? (
                <p
                  className="float-right fas fa-hands-helping"
                  style={{ color: "#d99164" }}
                ></p>
              ) : (
                ""
              )}
              <div className="float-right mt-4">
                {" "}
                <i
                  class="fa fa-chevron-down"
                  data-toggle="collapse"
                  data-target={"#collapse".concat(this.props.index)}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style={{ fontSize: "30px" }}
                ></i>
              </div>
            </h5>
          </div>

          <div
            id={"collapse".concat(this.props.index)}
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
              <table style={{ width: "98%" }}>
                <tbody>
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
                        value={this.state.abstract}
                        onChange={(e) =>
                          this.handleChange(e, this.state.solutionId)
                        }
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
                        value={this.state.desc}
                        onChange={(e) =>
                          this.handleChange(e, this.state.solutionId)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="image">Images</label>
                    </td>
                    <td className="p-4">
                      {/* <FilePond files={this.state.image}/>  */}
                      <input
                        type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                        onChange={(e) =>
                          this.handleImage(e, this.state.solutionId)
                        }
                      />
                      <a href={this.state.image}>(View File)</a>
                      {/* <div class="custom-file">
              <input type="file" class="custom-file-input " id="image" name="image" onChange={this.handleImage}  />
        <label class="custom-file-label"  id={this.state.solutionId+"file"}>{this.state.image}</label>
            </div> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="document">Documents for Reference</label>
                    </td>
                    <td className="p-4">
                      {/* <FilePond  ref={ref => this.pond = ref} 
                                      
                                      onupdatefiles={fileItems => {
                                        // Set currently active file objects to this.state
                                        this.setState({
                                          'docs': fileItems.map(fileItem => fileItem.file)
                                        });
                                    }}
                                      //  onupdatefiles ={fileItems => this.setState({'docs':fileItems.file }) } 
                                       /> */}
                      <input
                        type="file"
                        className="form-control-file"
                        id="document"
                        name="document"
                        onChange={(e) =>
                          this.handleDocs(e, this.state.solutionId)
                        }
                      />
                      <a href={this.state.docs}>(View File)</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="video">Videos</label>
                    </td>
                    <td className="p-4">
                      {/* <FilePond files={this.state.video}/>  */}
                      {/*                                        
                                      <ReactFileReader  handleFiles={this.handleVideo}>
          <button className='btn'>Upload</button>
        </ReactFileReader> */}

                      <input
                        type="file"
                        className="form-control-file"
                        id="video"
                        name="video"
                        onChange={(e) =>
                          this.handleVideo(e, this.state.solutionId)
                        }
                      />
                      <a href={this.state.video}>(View File)</a>
                    </td>
                  </tr>
                  <tr>
                    {this.state.problemStatus ? (
                      ""
                    ) : this.state.username ==
                        localStorage.getItem("username") &&
                      this.state.agreed ? (
                      <td colSpan={2} className="p-4">
                        <button
                          type="submit"
                          className="btn btn-lg btn-success ml-5 mt-3 float-right"
                          onClick={() => this.update(this.state.solutionId)}
                        >
                          Update
                        </button>
                      </td>
                    ) : this.state.username ==
                        localStorage.getItem("username") &&
                      !this.state.agreed ? (
                      <td colSpan={2} className="p-4">
                        <button
                          className="btn ml-5 mt-3 float-right"
                          disabled="true"
                          style={{
                            backgroundColor: "#2b2b2b",
                            color: "#ffffff",
                          }}
                        >
                          Update
                        </button>
                        <h6
                          classname="ml-5 mt-3 float-right"
                          style={{ color: "red" }}
                        >
                          Completely create a collaboration contract with your
                          team members to update
                        </h6>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                  <tr>
                    <br />
                    <td colSpan={2} className="p-4">
                      <div
                        id={this.state.solutionId + "updateSuccess"}
                        className="ml-7  float-right"
                        style={{ width: "25%", color: "green" }}
                      ></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SolutionUpdate;
