import React, { useState, useEffect } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import CommentMain from "./CommentMain";
import axios from "axios";

function Comments(props) {
  // const [comments, setcomments] = useState([
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
  //   {
  //     commentId: "2",
  //     body: "This has been very useful for my research. Thanks as well!",
  //     date: new Date(),
  //     username: "3",
  //     name: "Jenny Hess",
  //     profileImage:
  //       "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
  //   },
  //   {
  //     commentId: "4",
  //     body: "Dude, this is awesome. Thanks so much",
  //     date: new Date(),
  //     username: "4",
  //     name: "Joe Henderson",
  //     profileImage: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  //   },
  // ]);

  const [comments, setcomments] = useState(null);

  const [userDetails, setuserDetails] = useState({
    name: "Naveen",
    username: "1",
    profileImage: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  });

  const [replyForm, setreplyForm] = useState("");

  const problemId = props.problemId;

  const fetchComments = () => {
    let url = `/community/problemcomment/${problemId}/`;
    axios
      .get(url)
      .then((response) => setcomments(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!comments) fetchComments();
  });

  const handleChange = (event) => setreplyForm(event.target.value);

  const onSubmit = () => {
    const newComment = {
      username: userDetails.username,
      name: userDetails.name,
      problemId: problemId,
      profileImage: userDetails.profileImage,
      body: replyForm,
      date: new Date(),
    };

    let url = `/community/problemcomment/add/`;
    axios.post(url, newComment).then((response) => {
      setcomments([...comments, response.data]);
      console.log(response);
    });

    setreplyForm("");

    console.log(newComment);
  };

  return (
    <div style={{ width: "100%", paddingTop: "3.5rem" }}>
      <Comment.Group style={{ width: "100%" }}>
        <Header as="h2">Comments</Header>
        {comments &&
          comments.map((comment, index) => {
            return <CommentMain comment={comment} key={index} />;
          })}

        <Form reply onSubmit={onSubmit}>
          <Form.TextArea
            rows={1}
            value={replyForm}
            name="replyForm"
            onChange={handleChange}
          />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            disabled={replyForm ? false : true}
          />
        </Form>
      </Comment.Group>
    </div>
  );
}

export default Comments;
