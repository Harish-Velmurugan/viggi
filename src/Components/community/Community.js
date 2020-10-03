import React, { useState, useEffect } from "react";
import {
  Segment,
  Header,
  Button,
  Modal,
  TextArea,
  Form,
} from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button1 from "@material-ui/core/Button";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";

import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import moment from "moment";
import Axios from "axios";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Like from "./Like";
import Comment from "./Comment";

import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginBottom: 25,
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: 300,
    paddingTop: "25.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  // expandOpen: {
  //   transform: "rotate(180deg)",
  // },
}));

const styless = {
  position: "fixed",
  top: "auto",
  left: "auto",
  zIndex: "auto",
  display: "initial",
  width: "40%",
  height: "auto",
  overflow: "auto",
  outline: "0",
};

function Community(props) {
  const classes = useStyles();
  const [msg, setmsg] = useState("");
  const [open, setopen] = useState(false);
  const [img, setimg] = useState(null);
  // const [chats, setchats] = useState([
  //   {
  //     chatId: "1",
  //     username: "1",
  //     name: "asdasdasd",
  //     date: `${new Date()}`,
  //     body: "aasdasdasdasdasdasd",
  //     profileImg: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  //   },
  //   {
  //     chatId: "2",
  //     username: "1",
  //     name: "asdasdsdfsdasd",
  //     date: `${new Date()}`,
  //     body: "aasfffffffffffffffdasdasdasdasdasd",
  //     profileImg: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  //   },
  // ]);
  const [chats, setchats] = useState(null);
  const [userAuth, setuserAuth] = useState(false);
  const [joinButton, setjoinButton] = useState(false);
  const { communityDetails } = props.location;
  const [expanded, setExpanded] = React.useState(false);
  const username = localStorage.getItem("username");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log(communityDetails);
  useEffect(() => {
    if (!chats && userAuth) fetchCommunityChat();
    if (!chats) checkUser();
  });

  const checkUser = () => {
    let user = {
      username,
      channelId: communityDetails.id,
    };
    let url = `/community/checkuser/`;
    Axios.post(url, user)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "true") {
          setuserAuth(true);
        } else {
          setuserAuth(false);
        }
        if (response.data.joinButton === "true") {
          setjoinButton(true);
        } else {
          setjoinButton(false);
        }
      })
      .catch((e) => console.log(e));
  };

  const fetchCommunityChat = () => {
    let url = `/community/getCommunityChat/${communityDetails.id}/`;
    Axios.get(url)
      .then((response) => setchats(response.data))
      .catch((e) => console.log(e));
  };

  const sendMsg = () => {
    if (msg != "") {
      let url = "/community/addChat/";
      // let newMsg = {
      //   username: 1,
      //   name: "naveen rathnam",
      //   img: img,
      //   body: msg,
      //   profileImg: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
      //   channelId: communityDetails.id + "",
      // };

      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("name", localStorage.getItem("name"));
      formdata.append("img", img);
      formdata.append("body", msg);
      formdata.append("profileImg", localStorage.getItem("profileImg"));
      formdata.append("channelId", communityDetails.id + "");

      Axios.post(url, formdata)
        .then((res) => {
          console.log(res);
          setchats([res.data, ...chats]);
        })
        .catch((e) => console.log(e));
      // console.log(newMsg);
    }
    setopen(false);
  };

  const joinCommunity = () => {
    const newJoining = {
      channelId: communityDetails.id,
      username,
    };
    let url = "/community/joinCommunity/";
    Axios.post(url, newJoining)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  return (
    <div className="main_content">
      <Segment>
        <div style={{ display: "flex" }}>
          <Header as="h3" style={{ flexGrow: "1" }}>
            {">"}
            {communityDetails.communityName}
          </Header>
          {userAuth ? (
            <p onClick={() => setopen(true)}>post in Community</p>
          ) : (
            ""
          )}
        </div>
        <div textAlign="center">
          {!userAuth ? (
            <Button
              size="mini"
              style={{ marginLeft: "50%" }}
              onClick={() => joinCommunity()}
              color={joinButton ? "green" : "red"}
            >
              {joinButton ? "Join Community" : "Already Request"}
            </Button>
          ) : (
            ""
          )}
          {chats &&
            chats.map((chat, index) => (
              <Card className={classes.root} key={index}>
                <CardHeader
                  avatar={<Avatar src={chat.profileImg} />}
                  title={chat.name}
                  subheader={moment(chat.date).fromNow()}
                />
                <CardMedia
                  className={classes.media}
                  image={chat.img}
                  title="Paella dish"
                />
                {console.log(chat.img)}
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {chat.body}
                  </Typography>

                  <CardActions disableSpacing>
                    <Like id={chat.id} likes={chat.likes} />

                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <QuestionAnswerIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Comment problemId={chat.id} />
                    </CardContent>
                  </Collapse>
                </CardContent>
              </Card>
            ))}
        </div>
        {/* <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar src={"Learn About reactjs"} />}
          title="ReactJs"
          subheader="moment(date).fromNow()"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </Card> */}
        {/* <Input action="Send" fluid placeholder="Type a Message..." onChange={e=>setmsg(e.target.value)} value={msg}/> */}
        {/* <Input
        action
        type="text"
        placeholder="Type a Message..."
        fluid
        onChange={(e) => setmsg(e.target.value)}
        value={msg}
      >
        <input />

        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Button onClick={() => sendMsg()}>Send</Button>
      </Input>
       */}
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setimg(e.target.files[0])}
        />
        <Modal
          size="tiny"
          open={open}
          onClose={() => setopen(false)}
          style={styless}
        >
          <Modal.Header>Post in Community</Modal.Header>
          <Modal.Content>
            <Form className="pb-2" style={{ paddingBottom: "25px" }}>
              <TextArea value={msg} onChange={(e) => setmsg(e.target.value)} />
            </Form>
            <label htmlFor="icon-button-file" style={{ paddingTop: "25px" }}>
              <Button1
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<PhotoCamera />}
                component="span"
              >
                Upload Image
              </Button1>
            </label>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setopen(false)}>
              Discard
            </Button>
            <Button positive onClick={() => sendMsg()}>
              Post
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </div>
  );
}

export default Community;
