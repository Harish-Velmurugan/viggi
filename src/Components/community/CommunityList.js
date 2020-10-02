import React, { useState } from "react";
import Axios from "axios";
import { Segment, Header, Modal, Button, Tab } from "semantic-ui-react";

import { TextField } from "@material-ui/core";
import Button1 from "@material-ui/core/Button";

import PopularCommunities from "./PopularCommunities";
import YourCommunities from "./YourCommunities";
import SubscribedCOmmunities from "./SubscribedCOmmunities";
import "./style.css";

const panes = [
  {
    menuItem: "PopularCommunities",
    render: () => (
      <Tab.Pane attached={false}>
        <PopularCommunities />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Subscribed Communities",
    render: () => (
      <Tab.Pane attached={false}>
        <SubscribedCOmmunities />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Your Communities",
    render: () => (
      <Tab.Pane attached={false}>
        <YourCommunities />
      </Tab.Pane>
    ),
  },
];

function CommunityList() {
  const [open, setOpen] = useState(false);
  const [communityname, setcommunityname] = useState("");
  const [communityDescription, setcommunityDescription] = useState("");
  const [img, setimg] = useState(null);

  const createCommunity = () => {
    const username = localStorage.getItem("username");
    let date = `${new Date()}`;
    let newCommunity = {
      username,
      communityName: communityname,
      communityDescription,
      date,
      img,
    };

    console.log(typeof date);
    let formData = new FormData();

    formData.append("username", Number(username));
    formData.append("communityName", communityname);
    formData.append("communityDescription", communityDescription);
    // formData.append("date", String(date));
    formData.append("img", img);

    let url = "/community/createcommunity/";
    Axios.post(url, formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    setcommunityDescription("");
    setcommunityname("");
    setOpen(false);

    console.log(newCommunity);
  };
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

  return (
    <div className="main_content">
      <Segment>
        <div style={{ display: "flex" }}>
          <Header as="h3" style={{ flexGrow: "1" }}>
            Community
          </Header>
          <p onClick={() => setOpen(true)}>Create a Community</p>
        </div>

        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

        <Modal
          size="mini"
          open={open}
          onClose={() => setOpen(false)}
          style={styless}
        >
          <Modal.Header>Create a Community</Modal.Header>
          <Modal.Content>
            <TextField
              label="Community Name"
              name="communityname"
              value={communityname}
              onChange={(e) => setcommunityname(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              name="communitydescription"
              value={communityDescription}
              onChange={(e) => setcommunityDescription(e.target.value)}
              fullWidth
              style={{ marginBottom: "1.5rem" }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="communityImg"
              multiple
              onChange={(e) => setimg(e.target.files[0])}
              type="file"
            />
            <label htmlFor="communityImg">
              <Button1 variant="contained" color="primary" component="span">
                Upload Community Picture
              </Button1>
            </label>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button positive onClick={createCommunity}>
              Create
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </div>
  );
}

export default CommunityList;
