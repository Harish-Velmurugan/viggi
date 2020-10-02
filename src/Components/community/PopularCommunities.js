import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { Header, List, Image } from "semantic-ui-react";

function PopularCommunities(props) {
  const [communityList, setcommunityList] = useState(null);

  useEffect(() => {
    if (!communityList) fetchCommunityList();
  });

  const fetchCommunityList = () => {
    let url = "http://127.0.0.1:8000/community/getcommunities/";
    Axios.get(url)
      .then((response) => setcommunityList(response.data))
      .catch((e) => console.log(e));
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
              {/* <List.Content floated="right">
                <Button size="mini">Join</Button>
              </List.Content> */}
            </List.Item>
          ))}
      </List>
    </div>
  );
}

export default PopularCommunities;
