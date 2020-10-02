import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Axios from "axios";

function Like(props) {
  const [toggle, settoggle] = useState(false);
  const username = localStorage.getItem("username");
  const likes = props.likes.substring(1, props.likes.length - 1).split(",");
  const [likesCount, setlikesCount] = useState(
    likes[0] === "" ? 0 : likes.length
  );

  const disLike = (id) => {
    let url = `/community/dislike/${username}/${id}/`;
    Axios.post(url)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
    settoggle(false);
    let l = likesCount - 1;
    setlikesCount(l);
  };

  const addLike = (id) => {
    let url = `/community/addlike/${username}/${id}/`;
    Axios.post(url)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
    settoggle(true);
    let l = likesCount + 1;
    setlikesCount(l);
  };

  return (
    <div>
      {likes.find((user) => user == username) || toggle ? (
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={() => disLike(props.id)} color="secondary" />
        </IconButton>
      ) : (
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon
            onClick={() => addLike(props.id)}
            color="secondary"
          />
        </IconButton>
      )}
      {likesCount}
    </div>
  );
}

export default Like;
