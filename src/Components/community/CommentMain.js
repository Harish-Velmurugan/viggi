import React, { useState, useEffect } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import moment from "moment";
import axios from "axios";

function CommentMain(props) {
  const { profileImage, name, date, body, id, username } = props.comment;
  const [collapsed, setcollapsed] = useState(true);
  const [replies, setreplies] = useState(null);
  const [replyForm, setreplyForm] = useState("");
  const [replyFormBox, setreplyFormBox] = useState(true);

  const handleChange = (event) => setreplyForm(event.target.value);

  const [userDetails, setuserDetails] = useState({
    name: "Naveen",
    username: "8",
    profileImage: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  });

  useEffect(() => {
    if (!replies) fetchReplies();
  });

  const fetchReplies = () => {
    // setreplies([
    //   {
    //     commentId: "1",
    //     body: "How artistic!",
    //     date: new Date(),
    //     username: "1",
    //     name: "Matt",
    //     profileImage:
    //       "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    //   },
    //   {
    //     commentId: "3",
    //     body: "This has been very useful for my research. Thanks as well!",
    //     date: new Date(),
    //     username: "2",
    //     name: "Elliot Fu",
    //     profileImage:
    //       "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    //   },
    // ]);

    let url = `/community/replycomment/${id}/`;
    axios
      .get(url)
      .then((response) => setreplies(response.data))
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    const newComment = {
      commentId: id,
      username: userDetails.username,
      name: userDetails.name,
      profileImage: userDetails.profileImage,
      body: replyForm,
      date: new Date(),
    };

    let url = `/community/replycomment/add/`;
    axios.post(url, newComment).then((response) => {
      setreplies([...replies, response.data]);
      console.log(response.data);
    });

    // setreplies([...replies, newComment]);
    setreplyFormBox(!replyFormBox);
    setreplyForm("");
  };

  const replyButton = () => {
    if (!collapsed) {
      if (replyFormBox) {
        setreplyFormBox(false);
      } else {
        setcollapsed(true);
      }
    } else {
      if (!replies) fetchReplies();
      setcollapsed(false);
      setreplyFormBox(false);
    }
  };

  const repliesButton = () => {
    if (!replies) {
      fetchReplies();
      setcollapsed(false);
    } else {
      setcollapsed(!collapsed);
    }
  };

  return (
    <Comment>
      <Comment.Avatar src={profileImage} />
      <Comment.Content>
        <Comment.Author as="a">{name}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(date).fromNow()}</div>
        </Comment.Metadata>
        {/* <Comment.Text>{body}</Comment.Text> */}
        <p
          style={{
            margin: ".25em 0 .5em",
            fontSize: "1em",
            color: "rgba(0,0,0,.87)",
            lineHeight: "1.3",
          }}
        >
          {body}
        </p>
        <Comment.Actions onClick={replyButton}>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
        <Comment.Actions onClick={repliesButton}>
          <Comment.Action>See Replies</Comment.Action>
        </Comment.Actions>
      </Comment.Content>

      <Comment.Group collapsed={collapsed}>
        {replies &&
          replies.map((reply, index) => (
            <CommentMain comment={reply} key={index} />
          ))}
        {replies && replies.length == 0 && <p>No comments</p>}
        <Comment collapsed={replyFormBox}>
          <Form reply onSubmit={onSubmit}>
            <Form.TextArea
              value={replyForm}
              rows={2}
              name="replyForm"
              onChange={handleChange}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              disabled={replyForm ? false : true}
            />
          </Form>
        </Comment>
      </Comment.Group>
    </Comment>
  );
}

export default CommentMain;
