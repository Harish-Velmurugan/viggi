import Navbar from "../Navbar/nav";
import { Link, Redirect } from "react-router-dom";
import React, { Component, PropTypes } from "react";
import RichTextEditor from "react-rte";
import axios from "axios";
import help from "./helpicon.png";
import IconButton, { IconToggle } from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";
import "./createWiki.css";

class createWiki extends Component {
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
      username: localStorage.getItem("username"),
      wno: this.props.location.state.query,
      // wno: 32,
      redirect: false,
    };
    this.save = this.save.bind(this);
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    formdata.append("username", Number(this.state.username));
    formdata.append("domain", this.state.domain);
    formdata.append("title", this.state.title);
    formdata.append("body", this.state.body);
    formdata.append("html", this.state.html);
    axios
      .post("/wiki/publish/" + this.state.wno + "/", formdata)
      .then((res) => {
        console.log(res.data);
        if (res.data.value == "success") {
          this.setState({ redirect: true });
        }
      });
  }

  save() {
    let formdata = new FormData();
    console.log(this.state.domain);
    formdata.append("username", Number(this.state.username));
    formdata.append("domain", this.state.domain);
    formdata.append("title", this.state.title);
    formdata.append("body", this.state.body);
    formdata.append("html", this.state.html);
    console.log(this.state.body);
    axios
      .post("/wiki/editWiki/" + this.state.wno + "/", formdata)
      .then((res) => {
        console.log(res.data);
      });
  }
  componentDidMount() {
    console.log(this.state.wno + "-- ");
  }
  onChange = (value) => {
    // console.log(this.state.value.toString('markdown'));
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
      // console.log(this.state.value.toString('markdown'))
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

    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
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
        <Link>
          <a
            class="float1"
            style={{ textecoration: "none", color: "black" }}
            onClick={() => this.save()}
          >
            Save
          </a>
        </Link>

        <Link>
          <a
            class="float"
            style={{ textecoration: "none", color: "black" }}
            onClick={() => this.publish()}
          >
            Publish
          </a>
        </Link>

        <span>
          {/* <Link>
            <a />
            <img
              class="float-right mr-5 mb-4 box1"
              style={{ display: "inline-block", transition: "1s" }}
              src={help}
              height="50px"
              width="50px"
            />
          </Link> */}

          <h4 className="ml-5" style={{ color: "grey" }}>
            Start Creating Your Wiki....
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
                maxlength="70"
                name="title"
                placeholder="Title of your wiki"
                onChange={this.handleChange}
              />
              {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            {/* <IconButton>
                  <MaterialIcon icon='favorite' />
                </IconButton>
                  */}
            Choose Domain
            <select
              class="form-control mb-4"
              placeholder="Choose domain"
              id="domain"
              name="domain"
              onChange={this.handleChange}
            >
              {<option selected>{this.state.domain}</option>}
              <option value="Algorithms">Algorithms</option>
              <option value="Cryptography">Cryptography</option>
              <option value="Distributed Computing">
                Distributed Computing
              </option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Computational Learning">
                Computational Learning
              </option>
              <option value="Computer Vision">Computer Vision</option>
              <option value="Big Data">Big Data</option>
              <option value="Block Chain">Block Chain</option>
            </select>
            <RichTextEditor
              toolbarClassName="demo-toolbar"
              editorClassName="demo-editor"
              // style={{width:"10%"}}
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
export default createWiki;

// import Navbar from "../Navbar/nav";
// import { Link, Redirect } from "react-router-dom";
// import React, {Component, PropTypes} from 'react';
// import RichTextEditor from 'react-rte';
// import axios from 'axios';
// import help from "./helpicon.png";
// import IconButton, { IconToggle } from "@material/react-icon-button";
// import MaterialIcon from "@material/react-material-icon";
// import "./createWiki.css";

// class createWiki extends Component {
//   static propTypes = {
//     // onChange: PropTypes.func,
//   };

//   constructor(props)
//      {
//       super(props);

//         this.state = {
//           value: RichTextEditor.createEmptyValue(),
//           html:'',
//           body:'',
//           title:'',
//           domain:'',
//           username:localStorage.getItem('username'),
//           // wno:this.props.location.state.query,
//           wno:32,
//           redirect:false,
//         };
//         this.save = this.save.bind(this);
//         this.publish = this.publish.bind(this);
//         this.handleChange=this.handleChange.bind(this);
//       }

//       handleChange(e) {
//         let target = e.target;
//         let value = target.value;
//         let name = target.name;

//         this.setState({
//           [name]: value,
//         });
//         console.log(this.state.domain)
//       }

//      publish(){
//         let formdata=new FormData();
//         console.log(this.state.domain);
//         formdata.append('username',Number(this.state.username))
//         formdata.append('domain',this.state.domain)
//         formdata.append('title',this.state.title)
//         formdata.append('body',this.state.body)
//         formdata.append('html',this.state.html)
//         axios.post('/wiki/publish/'+this.state.wno+'/',formdata)
//         .then((res=>{
//           console.log(res.data);
//           if(res.data.value=='success'){
//           this.setState({'redirect':true})
//           }
//         })
//         );
//         }

//     save(){
//       let formdata=new FormData();
//       console.log(this.state.domain);
//       formdata.append('username',Number(this.state.username))
//       formdata.append('domain',this.state.domain)
//       formdata.append('title',this.state.title)
//       formdata.append('body',this.state.body)
//       formdata.append('html',this.state.html)
//       console.log(this.state.body)
//       axios.post('/wiki/editWiki/'+this.state.wno+'/',formdata)
//       .then((res=>{
//         console.log(res.data);

//     this.state = {
//       value: RichTextEditor.createEmptyValue(),
//       html: "",
//       body: "",
//       title: "",
//       domain: "",
//       username: localStorage.getItem("username"),
//       // wno:this.props.location.state.query,
//       wno: 32,
//     };
//     this.save = this.save.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

// <<<<<<< HEAD
//   handleChange(e) {
//     let target = e.target;
//     let value = target.value;
//     let name = target.name;
// =======

//     render () {
//           if(this.state.redirect){
//             this.setState({'redirect':false})
//             return  <Redirect to={{pathname:"/wiki"}}></Redirect>;

//           }

//       const toolbarConfig = {
//         // Optionally specify the groups to display (displayed in the order listed).
//         display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS','a'],
//         INLINE_STYLE_BUTTONS: [
//           {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
//           {label: 'Italic', style: 'ITALIC'},
//           {label: 'Underline', style: 'UNDERLINE'}
//         ],
//         BLOCK_TYPE_DROPDOWN: [
//           {label: 'Normal', style: 'unstyled'},
//           {label: 'Heading Large', style: 'header-one'},
//           {label: 'Heading Medium', style: 'header-two'},
//           {label: 'Heading Small', style: 'header-three'}
//         ],
//         BLOCK_TYPE_BUTTONS: [
//           {label: 'UL', style: 'unordered-list-item'},
//           {label: 'OL', style: 'ordered-list-item'}
//         ],

//       };
//       return (
//         <div>
//           <Navbar/>
//           <br/><br/><br/><br/>
//           <Link >
//           <a class="float1" style={{ textecoration: 'none',color:'black'}} onClick={()=>this.save()}>
//           Save
//           </a>
//           </Link>
// >>>>>>> 1ce85000298f88785290c2b1bbb703b5bcbb945e

//     this.setState({
//       [name]: value,
//     });
//     console.log(this.state.domain);
//   }
//   save() {
//     let formdata = new FormData();
//     console.log(this.state.domain);
//     formdata.append("username", Number(this.state.username));
//     formdata.append("domain", this.state.domain);
//     formdata.append("title", this.state.title);
//     formdata.append("body", this.state.body);
//     formdata.append("html", this.state.html);
//     console.log(this.state.body);
//     axios
//       .post("/wiki/editWiki/" + this.state.wno + "/", formdata)
//       .then((res) => {
//         console.log(res.data);
//       });
//   }
//   componentDidMount() {
//     console.log(this.state.wno + "-- ");
//   }
//   onChange = (value) => {
//     // console.log(this.state.value.toString('markdown'));
//     this.setState({ value });
//     if (this.props.onChange) {
//       // Send the changes up to the parent component as an HTML string.
//       // This is here to demonstrate using `.toString()` but in a real app it
//       // would be better to avoid generating a string on each change.
//       this.props.onChange(value.toString("html"));
//       // console.log(this.state.value.toString('markdown'))
//     }
//     this.setState({ html: this.state.value.toString("html") });
//     this.setState({ body: this.state.value.toString("markdown") });
//     console.log(this.state.value.toString("markdown"));
//   };

// <<<<<<< HEAD
//   render() {
//     const toolbarConfig = {
//       // Optionally specify the groups to display (displayed in the order listed).
//       display: [
//         "INLINE_STYLE_BUTTONS",
//         "BLOCK_TYPE_BUTTONS",
//         "LINK_BUTTONS",
//         "BLOCK_TYPE_DROPDOWN",
//         "HISTORY_BUTTONS",
//         "a",
//       ],
//       INLINE_STYLE_BUTTONS: [
//         { label: "Bold", style: "BOLD", className: "custom-css-class" },
//         { label: "Italic", style: "ITALIC" },
//         { label: "Underline", style: "UNDERLINE" },
//       ],
//       BLOCK_TYPE_DROPDOWN: [
//         { label: "Normal", style: "unstyled" },
//         { label: "Heading Large", style: "header-one" },
//         { label: "Heading Medium", style: "header-two" },
//         { label: "Heading Small", style: "header-three" },
//       ],
//       BLOCK_TYPE_BUTTONS: [
//         { label: "UL", style: "unordered-list-item" },
//         { label: "OL", style: "ordered-list-item" },
//       ],
//     };
//     return (
//       <div>
//         <Navbar />
//         <br />
//         <br />
//         <br />
//         <br />
//         <Link>
//           <a
//             class="float1"
//             style={{ textecoration: "none", color: "black" }}
//             onClick={() => this.save()}
//           >
//             Save
//           </a>
//         </Link>
// =======
//           <Link >
//                   <a class="float" style={{ textecoration: 'none',color:'black'}} onClick={()=>this.publish()} >
// >>>>>>> 1ce85000298f88785290c2b1bbb703b5bcbb945e

//         <Link>
//           <a class="float" style={{ textecoration: "none", color: "black" }}>
//             Publish
//           </a>
//         </Link>

//         <span>
//           <Link>
//             <a />
//             <img
//               class="float-right mr-5 mb-4 box1"
//               style={{ display: "inline-block", transition: "1s" }}
//               src={help}
//               height="50px"
//               width="50px"
//             />
//           </Link>

//           <h4 className="ml-5" style={{ color: "grey" }}>
//             Start Creating Your Wiki....
//           </h4>
//         </span>

//         <div
//           class="shadow-lg bg-white rounded"
//           style={{
//             width: "75%",
//             heigth: "5%",
//             marginLeft: "10%",
//             marginTop: "0%",
//             padding: "auto",
//             backgroundColor: "#c0c0c0",
//           }}
//         >
//           <div
//             style={{
//               width: "73%",
//               marginLeft: "14%",
//               paddingTop: "4%",
//               paddingBottom: "4%",
//             }}
//           >
//             <div class="form-group">
//               <label for="exampleInputEmail1"></label>
//               <input
//                 type="text"
//                 class="form-control"
//                 id="title"
//                 maxlength="70"
//                 name="title"
//                 placeholder="Title of your wiki"
//                 onChange={this.handleChange}
//               />
//               {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
//             </div>
//             {/* <IconButton>
//                   <MaterialIcon icon='favorite' />
//                 </IconButton>
//                   */}
//             Choose Domain
//             <select
//               class="form-control mb-4"
//               placeholder="Choose domain"
//               id="domain"
//               name="domain"
//               onChange={this.handleChange}
//             >
//               {<option selected>{this.state.domain}</option>}
//               <option value="Algorithms">Algorithms</option>
//               <option value="Cryptography">Cryptography</option>
//               <option value="Distributed Computing">
//                 Distributed Computing
//               </option>
//               <option value="Cloud Computing">Cloud Computing</option>
//               <option value="Computational Learning">
//                 Computational Learning
//               </option>
//               <option value="Computer Vision">Computer Vision</option>
//               <option value="Big Data">Big Data</option>
//               <option value="Block Chain">Block Chain</option>
//             </select>
//             <RichTextEditor
//               toolbarClassName="demo-toolbar"
//               editorClassName="demo-editor"
//               // style={{width:"10%"}}
//               id="body"
//               name="body"
//               value={this.state.value}
//               onChange={this.onChange}
//               placeholder="Write the content here..."
// <<<<<<< HEAD
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default createWiki;
// =======

//             />
//             </div>
//             </div>
//             </div>
//           );
//         }
//       }
//       export default createWiki;
// >>>>>>> 1ce85000298f88785290c2b1bbb703b5bcbb945e
