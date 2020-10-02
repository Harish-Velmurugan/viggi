import { Component } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
// const API_PATH = "ws://127.0.0.1:8000/ws/chat/";
var ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
const API_PATH = ws_scheme+window.location.host+'/ws/chat/';
// const API_PATH = '/ws/chat/';
// let sol=14

class WebSocketService extends Component {
  static instance = null;
  callbacks = {};
  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor(props) {
    super(props);
    this.socketRef = null;
    this.state = {
      sol: "",
      pblm: "",
      mem: "",
      user: "",
      choice: "true",
      bucket: "",
    };
  }

  connect(id) {
    const path = API_PATH;

    this.socketRef = null;
    this.socketRef = new ReconnectingWebSocket(path);

    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log("WebSocket closed, restarting..");
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages, parsedData.members);
      // this.callbacks[command](parsedData.members);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
      solnId: this.state.sol,
      choice: this.state.choice,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      text: message.text,
      solnId: this.state.sol,
      choice: this.state.choice,
    });
  }

  initChatUser(username) {
    this.sendMessage({ command: "init_chat", username: username });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }
  state1() {
    return this.socketRef.readyState;
  }
  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(function () {
      if (socket.readyState == 1) {
        if (callback != null) {
          callback();
        }
        return;
      } else {
        recursion(callback);
      }
    }, 1);
  }
}

let WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
