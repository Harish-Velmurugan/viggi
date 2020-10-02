import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Header, List, Button, Image, Modal, Table } from "semantic-ui-react";

function YourCommunities(props) {
  const [communityList, setcommunityList] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [details, setdetails] = React.useState([]);
  const [channelId, setchannelId] = React.useState("");

  useEffect(() => {
    if (!communityList) fetchCommunityList();
  });

  const fetchCommunityList = () => {
    const username = localStorage.getItem("username");
    let url = `/community/getyourcommunity/${username}/`;
    Axios.get(url)
      .then((response) => setcommunityList(response.data))
      .catch((e) => console.log(e));
  };

  const allowMembers = (num) => {
    setchannelId(num);
    let url = `/community/getunapprovemembers/${num}/`;
    Axios.get(url)
      .then((response) => {
        setdetails(response.data);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
    setOpen(true);
  };

  const allowButton = (username) => {
    let newMember = {
      channelId,
      username,
    };
    let url = `/community/allowmember/`;
    Axios.post(url, newMember)
      .then((response) => {
        console.log(response.data);
        let d = details.filter((mem) => mem.username != username);
        setdetails(d);
      })
      .catch((e) => console.log(e));
  };

  const denyButton = (username) => {
    let newMember = {
      channelId,
      username,
    };
    let url = `/community/blockmember/`;
    Axios.post(url, newMember)
      .then((response) => {
        console.log(response.data);
        let d = details.filter((mem) => mem.username != username);
        setdetails(d);
      })
      .catch((e) => console.log(e));
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
    <div>
      <Header as="h5">Popular Communities</Header>
      <List relaxed="very">
        {communityList &&
          communityList.map((community, key) => (
            <List.Item key={key}>
              <Image avatar src={community.img} />
              <List.Content>
                <Link
                  to={{
                    pathname: "/dashboard/communityList",
                    communityDetails: community,
                  }}
                >
                  <List.Header as="a">{community.communityName}</List.Header>
                  <List.Description>
                    {community.communityDescription}
                  </List.Description>
                </Link>
              </List.Content>
              <List.Content floated="right">
                <Button size="mini" onClick={() => allowMembers(community.id)}>
                  Allow Members
                </Button>
              </List.Content>
            </List.Item>
          ))}
      </List>
      <div className="communityStyle">
        <Modal
          centered={false}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={styless}
        >
          <Modal.Header>Allow Members</Modal.Header>
          <Modal.Content>
            <Table basic="very" celled collapsing style={{ width: "100%" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Users</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {details &&
                  details.map((member, key) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Image src={member.img} rounded size="mini" />
                            <Header.Content>
                              {member.firstname + " " + member.lastname}
                              <Header.Subheader>
                                {member.nationality}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            color="green"
                            onClick={() => allowButton(member.username)}
                          >
                            Allow
                          </Button>
                          <Button
                            color="red"
                            onClick={() => denyButton(member.username)}
                          >
                            deny
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
}

export default YourCommunities;
