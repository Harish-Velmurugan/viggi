import React, { useState } from "react";
import { Segment, Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Axios from "axios";

function AdminPage() {
  let { a, code } = useParams();
  const [Msg, setMsg] = useState(null);

  const allowButton = () => {
    let url = `/api/companyAccepted/${a}/${code}/`;
    Axios.post(url)
      .then((res) => setMsg("Approved"))
      .catch((res) => console.log(res));
  };

  const denyButton = () => {
    let url = `/api/companyDeclined/${a}/${code}/`;
    Axios.post(url)
      .then((res) => setMsg("Declined"))
      .catch((res) => console.log(res));
  };
  return (
    <div>
      <Segment padded>
        <Header as="h3" dividing>
          External Company Authentication
        </Header>
        <Segment attached>
          {!Msg ? (
            <div>
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
            </div>
          ) : (
            <div>
              <Header as="h3" color={Msg === "Declined" ? "red" : "green"}>
                {a}
              </Header>
              <Header as="h5">{" Company has been " + Msg}</Header>
            </div>
          )}
        </Segment>
      </Segment>
    </div>
  );
}

export default AdminPage;
