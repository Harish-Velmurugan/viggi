import React from "react";
import { Grid } from "@material-ui/core";
import Tree from "./tree.jpg";

function home() {
  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundImage: `url(${Tree})`,
            }}
          >
            hesdasd
          </div>
          <div style={{ height: "100vh", backgroundImage: `url(${Tree})` }}>
            hesdasd
          </div>
          <div style={{ height: "100vh", backgroundImage: `url(${Tree})` }}>
            hesdasd
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default home;
