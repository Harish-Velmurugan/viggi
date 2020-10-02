import React, { useState } from "react";
import { Segment, Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Axios from "axios";

function AdminPage() {
  let { a, code } = useParams();
  const [value, setvalue] = useState(null);
  //   const [companyDetails, setcompanyDetails] = useState({
  //     name: "facebook.com",
  //   });
  //   cons
  //   //   useEffect(() => {

  //   //   })
  const allowButton = () => {
    let url = `/api/companyAccepted/${a}/${code}/`;
    Axios.post(url)
      .then((res) => setvalue(res.data.value))
      .catch((res) => console.log(res));
  };

  const denyButton = () => {
    let url = `/api/companyDeclined/${a}/${code}/`;
    Axios.post(url)
      .then((res) => setvalue(res.data.value))
      .catch((res) => console.log(res));
  };
  return (
    <div>
      <Segment padded>
        <Header as="h3" dividing>
          External Company Authentication
        </Header>
        <Segment attached>
          {/* <Header as="h3">
          {a + " "}
          <Header.Content>
            has requested to be a part of our Vignatree.
          </Header.Content>
        </Header> */}
          <Header
            as="h2"
            content={a}
            subheader="has requested to be a part of our Vignatree."
          />
          <Button color="green" onClick={() => allowButton()}>
            Allow
          </Button>
          <Button color="red" onClick={() => denyButton()}>
            deny
          </Button>
        </Segment>
      </Segment>
    </div>
  );
}

export default AdminPage;
