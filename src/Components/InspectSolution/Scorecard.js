import React, { useEffect, useState } from "react";
import axios from "axios";
import Details from "./Details";
import { Table, Icon, Modal, Header } from "semantic-ui-react";

function Scorecard() {
  // const [metrics, setmetrics] = useState([
  //   { name: "Kilometer", value: "100", status: true },
  //   { name: "Mileage", value: "49%", status: false },
  //   { name: "Engine Temperture", value: "70%", status: true },
  //   { name: "Noise", value: "30%", status: false },
  // ]);

  const [metrics, setmetrics] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [current, setcurrent] = useState(null);

  useEffect(() => {
    if (metrics.length == 0) {
      const url = `/monitorsolution/monitorapiget/`;
      axios.get(url).then((response) => {
        console.log(response.data);
        setmetrics(response.data);

        //console.log(JSON.parse(response.data[0].metrics));
      });
    }
    // //setmetrics1(JSON.parse());
  });

  const openModel = (presentClick) => {
    setcurrent(presentClick);
    setOpen(true);
  };

  return (
    <div>
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>S.NO</Table.HeaderCell>
            <Table.HeaderCell>PARAMETER NAME</Table.HeaderCell>
            <Table.HeaderCell>ACCURANCY</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {metrics &&
            metrics.map((metric, index) => (
              <Table.Row error={!metric.status}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Header
                    as="h5"
                    color="blue"
                    onClick={() => openModel(metric.name)}
                  >
                    {metric.name}
                  </Header>
                </Table.Cell>
                <Table.Cell>{metric.value}</Table.Cell>
                <Table.Cell positive={metric.status} negative={!metric.status}>
                  {metric.status ? (
                    <Icon name="checkmark" />
                  ) : (
                    <Icon name="close" />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Modal
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>Log</Modal.Header>
        <Modal.Content>
          <Details current={current} />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Scorecard;
