import React, { useState, useEffect } from "react";
import { Table, Icon } from "semantic-ui-react";
import Axios from "axios";

function Details(props) {
  const [log, setlog] = useState([
    // { date: `${new Date()}`, value: "40", status: false },
    // { date: `${new Date()}`, value: "60", status: true },
    // { date: `${new Date()}`, value: "30", status: false },
    // { date: `${new Date()}`, value: "40", status: false },
    // { date: `${new Date()}`, value: "90", status: true },
  ]);

  useEffect(() => {
    if (log.length == 0) {
      let url = `/monitorsolution/getparameterlog/${props.current}/`;

      Axios.get(url)
        .then((response) => setlog(response.data))
        .catch((err) => console.log(err));
    }
  });

  // console.log(props.current);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.HeaderCell>S.NO</Table.HeaderCell>
          <Table.HeaderCell>Date {"&"} Time </Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {log &&
            log.map((l, index) => (
              <Table.Row error={!l.status}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{l.date}</Table.Cell>
                <Table.Cell>{l.value}</Table.Cell>
                <Table.Cell positive={l.status} negative={!l.status}>
                  {l.status ? <Icon name="checkmark" /> : <Icon name="close" />}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Details;
