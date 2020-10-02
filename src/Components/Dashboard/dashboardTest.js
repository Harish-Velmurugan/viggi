import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

import Navbar from "../Navbar/nav";
import ProblemsInvolved from "../ProblemInvolved/probleminvolved";
import ProblemsPosted from "../ProblemsPosted/problemsposted";
import Table from "../Table/Table";
import Trending from "../Trending/trending";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    fontSize: "13px",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#32a852",
    zIndex: "-1",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  fab: {
    position: "fixed",
    bottom: "5vh",
    right: "10vh",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [component, setcomponent] = useState(1);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const displayComponent = (value) => {
    switch (value) {
      case 1:
        return <ProblemsInvolved />;
      case 2:
        return <ProblemsPosted />;
      case 3:
        return <ProblemsPosted />;
      case 4:
        return <Table />;
      case 5:
        return <Trending />;
    }
  };

  return (
    <>
      <Hidden only={["lg", "md", "sm"]}>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleDrawer}
        >
          <AddIcon />
        </Fab>
      </Hidden>
      <Navbar />
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawer}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key={1}>
              <ListItemText
                primary="INVOLVED PROBLEMS"
                button
                onClick={() => setcomponent(1)}
              />
            </ListItem>
            <ListItem button key={2}>
              <ListItemText
                primary="POSTED PROBLEMS"
                button
                onClick={() => setcomponent(2)}
              />
            </ListItem>
            <ListItem button onClick={() => setcomponent(3)} key={3}>
              <ListItemText
                primary="POST A PROBLEM"
                button
                onClick={() => setcomponent(3)}
              />
            </ListItem>
            <ListItem button onClick={() => setcomponent(4)} key={4}>
              <ListItemText primary="EXPIRED PROBLEMS" />
            </ListItem>
            <ListItem button onClick={() => setcomponent(5)} key={5}>
              <ListItemText primary="TRENDING" />
            </ListItem>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {displayComponent(component)}
        </main>
      </div>
    </>
  );
}
