import Navbar from "../Navbar/nav";
import { Link } from "react-router-dom";
import React, { Component, PropTypes } from "react";
import RichTextEditor from "react-rte";
import axios from "axios";
import help from "./helpicon.png";
import IconButton, { IconToggle } from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";
import "./createWiki.css";
import { Redirect } from "react-router";

let aaa = null;
class reEditWiki extends Component {
  static propTypes = {
    // onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: RichTextEditor.createEmptyValue(),
      html: "",
      body: "",
      title: "",
      domain: "",
      username: "",
      wno: this.props.location.state.query,
      //   wno:32,
      content: [],
      redirect: false,
    };
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
    aaa = this.state.wno;
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
    console.log(this.state.domain);
  }

  publish() {
    let formdata = new FormData();
    console.log(this.state.domain);
    formdata.append("username", this.state.username);
    formdata.append("domain", this.state.domain);
    formdata.append("title", this.state.title);
    formdata.append("body", this.state.body);
    formdata.append("html", this.state.html);
    axios
      .post(
        "/wiki/reEditPublish/" +
          this.state.wno +
          "/" +
          localStorage.getItem("username") +
          "/",
        formdata
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.value1 == "published") {
          document.getElementById("publish").innerHTML = "published";
          this.setState({ redirect: true });
        }
      });
  }

  componentDidMount() {
    axios.get("/wiki/reeditWiki/" + aaa + "/").then((res) => {
      console.log(res.data);
      this.setState({ content: res.data });
      this.setState({ title: res.data.title });
      this.setState({ username: res.data.username });
      this.setState({ domain: res.data.domain });
      this.setState({ body: res.data.body });
      this.setState({ html: res.data.html });
      this.setState({
        value: RichTextEditor.createValueFromString(res.data.body, "markdown"),
      });
    });
  }
  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value.toString("html"));
    }
    this.setState({ html: this.state.value.toString("html") });
    this.setState({ body: this.state.value.toString("markdown") });
    console.log(this.state.value.toString("markdown"));
  };

  render() {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to={{ pathname: "/wiki" }}></Redirect>;
    }

    console.log(this.state.content);
    const toolbarConfig = {
      display: [
        "INLINE_STYLE_BUTTONS",
        "BLOCK_TYPE_BUTTONS",
        "LINK_BUTTONS",
        "BLOCK_TYPE_DROPDOWN",
        "HISTORY_BUTTONS",
        "a",
      ],
      INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD", className: "custom-css-class" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: "Normal", style: "unstyled" },
        { label: "Heading Large", style: "header-one" },
        { label: "Heading Medium", style: "header-two" },
        { label: "Heading Small", style: "header-three" },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" },
      ],
    };
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <Link to={{ state: { query: this.state.wno } }}>
          <a
            class="float"
            style={{ textecoration: "none", color: "black" }}
            onClick={() => this.publish()}
          >
            <div id="publish"> Publish </div>
          </a>
        </Link>

        <span>
          <Link>
            <a />
            <img
              class="float-right mr-5 mb-4 box1"
              style={{ display: "inline-block", transition: "1s" }}
              src={help}
              height="50px"
              width="50px"
            />
          </Link>

          <h4 className="ml-5" style={{ color: "grey" }}>
            Edit the Wiki.....
          </h4>
        </span>

        <div
          class="shadow-lg bg-white rounded"
          style={{
            width: "75%",
            heigth: "5%",
            marginLeft: "10%",
            marginTop: "0%",
            padding: "auto",
            backgroundColor: "#c0c0c0",
          }}
        >
          <div
            style={{
              width: "73%",
              marginLeft: "14%",
              paddingTop: "4%",
              paddingBottom: "4%",
            }}
          >
            <div class="form-group">
              <label for="exampleInputEmail1"></label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                maxlength="70"
                placeholder="Title of your wiki"
                value={this.state.title}
                readOnly
              />
            </div>
            Choose Domain
            <select
              class="form-control mb-4"
              placeholder="Choose domain"
              id="domain"
              name="domain"
              disabled="true"
            >
              {<option selected>{this.state.domain}</option>}
              <option value="Block Chain">Block Chain</option>
              <option value="AI">AI</option>
              <option value="Big Data">Big Data</option>
            </select>
            <RichTextEditor
              toolbarClassName="demo-toolbar"
              editorClassName="demo-editor"
              id="body"
              name="body"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="Write the content here..."
            />
          </div>
        </div>
      </div>
    );
  }
}
export default reEditWiki;
