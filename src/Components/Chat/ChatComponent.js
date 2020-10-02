import React, { Component } from "react";
import "./css/Chat.scss";
import WebSocketInstance from "./WebSocket";
import chat1 from "./chat1.jpeg";
import { Link } from "react-router-dom";
import logo from "./logo1.png";
import prototype from "./prototype.jpg";
import Axios from "axios";

class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: [],
      sid: "",
      pid: "",
      chat: [],
      expert: [],
      members: "",
      ab: false,
      chatTitle: "",
      prev: "",

      prototypeTest: [],
      prototypeTestTitle: [],
    };
    this.chatroom = this.chatroom.bind(this);
    this.expertroom = this.expertroom.bind(this);
    this.prototypeRoom = this.prototypeRoom.bind(this);
    this.waitForSocketConnection(() => {
      // WebSocketInstance.initChatUser(this.props.currentUser);
      // WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this));
      // WebSocketInstance.fetchMessages(this.props.currentUser);
    });
  }
  chatroom(k) {
    this.setState({ messages: [] });
    this.setState({ ab: true });
    this.setState({ chatTitle: this.state.chat[k].title });
    this.setState({ sid: this.state.chat[k].solutionId });
    this.setState({ pid: this.state.chat[k].problemId });
    this.setState({ members: this.state.chat[k].members });
    WebSocketInstance.state.sol = this.state.chat[k].solutionId;
    WebSocketInstance.state.choice = "false";
    WebSocketInstance.state.pblm = this.state.chat[k].problemId;
    WebSocketInstance.state.mem = this.state.chat[k].members;
    WebSocketInstance.state.user = this.state.chat[k].username;

    WebSocketInstance.initChatUser(this.props.currentUser);

    WebSocketInstance.addCallbacks(
      this.setMessages.bind(this),
      this.addMessage.bind(this)
    );
    WebSocketInstance.fetchMessages(this.props.currentUser);
  }

  expertroom(k) {
    this.setState({ messages: [] });
    this.setState({ ab: true });
    this.setState({ chatTitle: this.state.expert[k].bucket });
    // this.setState({ sid: this.state.chat[k].solutionId });
    // this.setState({ pid: this.state.chat[k].problemId });
    this.setState({ members: this.state.expert[k].chat });
    WebSocketInstance.state.sol = this.state.expert[k].id;
    WebSocketInstance.state.choice = "true";
    // WebSocketInstance.state.pblm = this.state.chat[k].problemId;
    WebSocketInstance.state.mem = this.state.expert[k].chat;
    WebSocketInstance.state.user = this.state.expert[k].username;
    WebSocketInstance.state.bucket = this.state.expert[k].bucket;

    WebSocketInstance.initChatUser(this.props.currentUser);

    WebSocketInstance.addCallbacks(
      this.setMessages.bind(this),
      this.addMessage.bind(this)
    );
    WebSocketInstance.fetchMessages(this.props.currentUser);
  }

  prototypeRoom(k) {
    this.setState({ messages: [] });
    this.setState({ ab: true });

    var stage = this.state.prototypeTest[k].step;
    console.log(stage);
    var stagename;
    if (this.state.prototypeTest[k].step == 0)
      stagename =
        this.state.prototypeTestTitle[k].title + " - " + "Planning Phase";
    else if (this.state.prototypeTest[k].step == 1)
      stagename =
        this.state.prototypeTestTitle[k].title +
        " - " +
        "Prototype Submmission Phase";
    else if (this.state.prototypeTest[k].step == 2)
      stagename =
        this.state.prototypeTestTitle[k].title + " - " + "Implementation Phase";
    else if (this.state.prototypeTest[k].step == 3)
      stagename =
        this.state.prototypeTestTitle[k].title +
        " - " +
        "Implementation Completed";
    else if (this.state.prototypeTest[k].step == 4)
      stagename =
        this.state.prototypeTestTitle[k].title + " - " + "Rejected/Stopped";
    else stagename = this.state.prototypeTestTitle[k].title;

    this.setState({ chatTitle: stagename });
    // this.setState({ sid: this.state.chat[k].solutionId });-
    // this.setState({ pid: this.state.chat[k].problemId });-
    // this.setState({ members: this.state.expert[k].chat });
    WebSocketInstance.state.sol = this.state.prototypeTest[k].id;
    WebSocketInstance.state.choice = "prototype";
    // WebSocketInstance.state.pblm = this.state.chat[k].problemId;-
    // WebSocketInstance.state.mem = this.state.expert[k].chat;
    // WebSocketInstance.state.user = this.state.expert[k].username;
    // WebSocketInstance.state.bucket = this.state.expert[k].bucket;

    WebSocketInstance.initChatUser(this.props.currentUser);

    WebSocketInstance.addCallbacks(
      this.setMessages.bind(this),
      this.addMessage.bind(this)
    );
    WebSocketInstance.fetchMessages(this.props.currentUser);
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state1() === 1) {
        callback();
        return;
      } else {
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  scrollToBottom = () => {
    // let s=document.getElementById()
    if (this.state.ab) {
      const chat = this.messagesEnd;
      const scrollHeight = chat.scrollHeight;
      const height = chat.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  addMessage(message) {
    if (message.soln.toString() == WebSocketInstance.state.sol.toString()) {
      if (message.created_at.toString() != this.state.prev) {
        this.setState({
          messages: [...this.state.messages, message],
          prev: message.created_at.toString(),
        });
      }
    }
  }

  setMessages(messages) {
    this.setState({
      messages: messages.reverse(),
      //    userprofile:messages.reverse()[0]['content']
    });
  }

  messageChangeHandler = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  sendMessageHandler = (e, message) => {
    const messageObject = {
      from: this.props.currentUser,
      text: message,
    };
    WebSocketInstance.newChatMessage(messageObject);

    this.setState({
      message: "",
      members: "",
    });

    e.preventDefault();
  };

  renderMessages = (messages, members) => {
    let a;
    const currentUser = this.props.currentUser.toString();
    // a=(Object.values(this.state.message).sort()[0])

    return messages.map((message, i) => {
      a = Object.values(this.state.message).sort()[0];
      return (
        <li
          key={message.id}
          className={message.author.toString() === currentUser ? "me" : "her"}
        >
          <img
            className="profilepic"
            src={message.img}
            alt="user img"
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
          ></img>{" "}
          &nbsp;&nbsp;
          <p style={{ display: "inline" }}>{message.content}</p>
        </li>
      );
    });
  };

  componentDidMount() {
    this.scrollToBottom();
    Axios.get(`/sol/discussionList/${localStorage.getItem("username")}/`)
      .then((response) => {
        this.setState({ chat: response.data });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get(`/api/expertChat/${localStorage.getItem("username")}/`)
      .then((response) => {
        this.setState({ expert: response.data });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // http://127.0.0.1:8000/prototypetest/chat/2/
    Axios.get(`/prototypetest/chat/${localStorage.getItem("username")}/`)
      .then((response) => {
        this.setState({ prototypeTestTitle: response.data[1] });
        this.setState({ prototypeTest: response.data[0] });
        console.log(this.state.prototypeTest[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state.prototypeTest);
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const messages = this.state.messages;
    // const members = this.state.members;
    // const currentUser = this.props.currentUser;

    return (
      <div className="bg">
        {this.state.ab ? (
          <div
            className="chat col-lg-8"
            style={{
              float: "right",
              fontFamily: "Abel verdana arial sans-serif",
            }}
          >
            <div
              style={{
                marginTop: "80px",
                backgroundImage:
                  "linear-gradient(to left bottom, #0d192d, #172a48, #223d65, #2d5084, #3864a4)",
                width: "110%",
                marginLeft: "-110px",
                height: "50pt",
                borderRadius: "15px",
              }}
            >
              <img
                alt="asd"
                src={chat1}
                height="50px"
                width="50px"
                style={{
                  float: "left",
                  borderRadius: "50%",
                  marginLeft: "3%",
                  marginRight: "2%",
                  marginTop: "8px",
                }}
              />
              <h4 style={{ color: "white", marginTop: "5px" }}>
                {this.state.chatTitle}
              </h4>

              <h6 style={{ color: "white" }}>(Displaying last 50 messages)</h6>

              {WebSocketInstance.state.choice ? (
                <div
                  className="btn-group dropleft"
                  style={{
                    float: "right",
                    marginRight: "1.6%",
                    marginTop: "-40px",
                  }}
                >
                  <Link
                    class="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{
                      textDecoration: "none",
                      color: "transparent",
                      marginRight: "10pt",
                    }}
                  >
                    <i class="fa fa-ellipsis-v" style={{ color: "white" }} />
                  </Link>

                  <div
                    class="dropdown-menu"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <Link
                      to={{
                        pathname: "dashboard/expertpost",
                        state: {
                          sid: WebSocketInstance.state.sol,
                          username: WebSocketInstance.state.user,
                          bucket: WebSocketInstance.state.bucket,
                          treeSet: false,
                        },
                      }}
                      className="dropdown-item"
                      style={{ color: "#000000" }}
                    >
                      POST PROBLEM
                    </Link>
                  </div>
                </div>
              ) : localStorage.getItem("username") ==
                WebSocketInstance.state.user ? (
                <div
                  className="btn-group dropleft"
                  style={{
                    float: "right",
                    marginRight: "1.6%",
                    marginTop: "-40px",
                  }}
                >
                  <Link
                    class="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{
                      textDecoration: "none",
                      color: "transparent",
                      marginRight: "10pt",
                    }}
                  >
                    <i class="fa fa-ellipsis-v" style={{ color: "white" }} />
                  </Link>

                  <div
                    class="dropdown-menu"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <Link
                      to={{
                        pathname: "/solverRevenueSplit",
                        state: {
                          sid: WebSocketInstance.state.sol,
                          members: WebSocketInstance.state.mem,
                          pid: WebSocketInstance.state.pblm,
                        },
                      }}
                      className="dropdown-item"
                      style={{ color: "#000000" }}
                    >
                      FINALISE
                    </Link>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div
              className="container"
              style={{
                marginLeft: "-110px",
                marginTop: "2pt",
                width: "110%",
                borderRadius: "15px",
                backgroundImage:
                  "radial-gradient(circle, #cdeff8, #d3eff8, #d8eef8, #ddeef7, #e2eef6, #e0ecf5, #dee9f5, #dce7f4, #d4e2f5, #cbddf5, #c4d7f6, #bdd2f6)",
              }}
            >
              {/* background:"linear-gradient(to bottom left, #000099 -27%, #33ccff 57%)" */}
              {/* backgroundColor:"#05728f" */}
              {/* backgroundImage: "linear-gradient(to right top, #051937, #052d4e, #024365, #005a7b, #05728f)" */}
              <ul
                className="custom-scrollbar-css"
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              >
                {messages && this.renderMessages(messages)}
              </ul>

              {/*<div className="container message-form " style={{marginLeft:"-3%",marginTop:"10px"}}>*/}
              <form
                onSubmit={(e) => this.sendMessageHandler(e, this.state.message)}
                className="form"
              >
                <input
                  type="text"
                  onChange={this.messageChangeHandler}
                  value={this.state.message}
                  placeholder="Start Typing"
                  required
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                />
                &nbsp;
                <button
                  type="submit"
                  className="submit"
                  value="Submit"
                  style={{ borderRadius: "10px" }}
                >
                  <i class="fa fa-send" />
                </button>
              </form>
              {/* </div>  */}
            </div>

            {/* <div class="d-flex justify-content-start mb-4">
								<div class="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" width="40pt" height="40pt"></img>
								</div>
								<div class="msg_cotainer">
									Hi, how are you samim?
									<span class="msg_time">8:40 AM, Today</span>
								</div>
							</div> */}

            {/* <div className="container message-form " style={{marginLeft:"-10%",marginTop:"10px"}}>
                        <form 
                        onSubmit={(e) => this.sendMessageHandler(e, this.state.message)}
                        className="form">
                            <input 
                            type="text"
                            onChange={this.messageChangeHandler}
                            value={this.state.message}
                            placeholder="Start Typing"
                            required
                            style={{backgroundColor:"#CCCCFF",borderRadius:"10px"}} /> 
                            &nbsp;
                            <button type="submit" className="submit" value="Submit" style={{borderRadius:"10px"}}>
                                <i class="fa fa-send"/>
                            </button>
                        </form>
                    </div>  */}
          </div>
        ) : (
          //if ab=false
          <div
            className="chat col-lg-8 container"
            style={{
              float: "right",
              fontFamily: "Abel verdana arial sans-serif",
            }}
          >
            <div
              style={{
                opacity: "0",
                marginTop: "80px",
                backgroundImage:
                  "linear-gradient(to left bottom, #0d192d, #313d55, #586680, #8192ae, #acc0de)",
                width: "110%",
                marginLeft: "-110px",
                height: "50pt",
                borderRadius: "15px",
              }}
            >
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <div
              style={{
                backgroundImage:
                  "radial-gradient(circle, #e9f6cd, #dcfbe2, #dbfcf3, #e4fcfe, #f2fbff, #f5fbff, #f8fcfe, #fbfcfd, #f9fbfc, #f7fafc, #f6fafa, #f4f9f9)",
                height: "73vh",
                marginTop: "-20pt",
                borderRadius: "15px",
                width: "110%",
                marginLeft: "-110px",
              }}
            >
              <center>
                <img alt="asd" src={logo} />
                <h4
                  style={{
                    color: "black",
                    fontFamily: "Playball",
                    fontStyle: "oblique",
                  }}
                >
                  For good ideas and true innovation, You need human
                  interaction...
                </h4>
              </center>
            </div>
          </div>
        )}

        <div
          className=""
          style={{
            height: "50pt",
            backgroundImage:
              "linear-gradient(to left bottom, #0d192d, #172a48, #223d65, #2d5084, #3864a4)",
            marginTop: "80px",
            marginLeft: "20px",
            float: "left",
            width: "50vh",
            borderRadius: "15px",
          }}
        >
          <center>
            <h5
              style={{
                color: "white",
                fontFamily: "Abel verdana arial sans-serif",
                marginTop: "15px",
                fontSize: "1.5em",
              }}
            >
              Discussion Forum
            </h5>
          </center>
        </div>

        <div
          style={{
            backgroundImage:
              "linear-gradient(to left bottom, #0d192d, #172a48, #223d65, #2d5084, #3864a4)",
            cursor: "pointer",
            height: "73vh",
            marginLeft: "20px",
            marginTop: "2pt",
            float: "left",
            width: "50vh",
            borderRadius: "15px",
          }}
        >
          {this.state.prototypeTest.map((prototypeTest, index) => (
            <div
              className="mt-3"
              style={{
                marginTop: "5px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
              onClick={() => {
                this.prototypeRoom(index);
              }}
            >
              <img
                src={prototype}
                alt="problem img"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              ></img>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p
                style={{
                  display: "inline",
                  fontFamily: "Abel verdana arial sans-serif",
                  fontSize: "15pt",
                  color: "white",
                }}
              >
                {this.state.prototypeTestTitle[index].title}(Prototype and
                Testing)
                {/* {expert.bucket} */}
              </p>
              {/* <p>{this.state.lastmessage}</p> */}
              <hr style={{ background: "white", marginRight: "7px" }}></hr>
            </div>
          ))}

          {this.state.chat.map((chat, index) => (
            <div
              className="mt-3"
              style={{
                marginTop: "5px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
              onClick={() => {
                this.chatroom(index);
              }}
            >
              <img
                src={chat.image}
                alt="problem img"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              ></img>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p
                style={{
                  display: "inline",
                  fontFamily: "Abel verdana arial sans-serif",
                  fontSize: "15pt",
                  color: "white",
                }}
              >
                {chat.title}
              </p>
              {/* <p>{this.state.lastmessage}</p> */}
              <hr style={{ background: "white", marginRight: "7px" }}></hr>
            </div>
          ))}

          {this.state.expert.map((expert, index) => (
            <div
              className="mt-3"
              style={{
                marginTop: "5px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
              onClick={() => {
                this.expertroom(index);
              }}
            >
              <img
                src={expert.image}
                alt="problem img"
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              ></img>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p
                style={{
                  display: "inline",
                  fontFamily: "Abel verdana arial sans-serif",
                  fontSize: "15pt",
                  color: "white",
                }}
              >
                {expert.bucket}
              </p>
              {/* <p>{this.state.lastmessage}</p> */}
              <hr style={{ background: "white", marginRight: "7px" }}></hr>
            </div>
          ))}
        </div>
        {/* <h4 style={{color:"black",fontFamily: 'Playball',fontStyle:"oblique"}}>
                            For good ideas and true innovation, You need human interaction...
                        </h4> */}
      </div>
    );
  }
}

export default ChatComponent;
