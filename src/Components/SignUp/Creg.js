import React, { useState, useContext } from "react";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Checkbox,
  Radio,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo1.png";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SignIn from "../SignIn/signInTest";
import { DetailsContext } from "../../context/DetailsContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        VignaTree
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [signIn, setsignIn] = useState(false);
  const [Msg, setMsg] = useState("");
  const [Sub, setSub] = useState(true);
  const [termsofservices, settermsofservices] = useState(false);

  const initialValue = {
    email: "",
    username: "",
    location: "",
    code: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    username: Yup.string().required("Requied"),
  });

  const onsubmit = (values) => {
    setSub(false);
    values.code = Math.floor(Math.random() * (10000 - 1000) + 1000); //The maximum is exclusive and the minimum is inclusive

    axios
      .post("/api/company-apply/", values)
      .then((response) => {
        setMsg("Application is Submitted");
        alert(
          "Registered succefully! after verification,you will be notified via email"
        );
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        setMsg("Something when wrong !");
      });
  };

  if (signIn) {
    return <SignIn />;
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Formik
            initialValues={initialValue}
            onSubmit={onsubmit}
            validationSchema={validationSchema}
          >
            <Form className={classes.form} noValidate>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="Company Name"
                type="text"
                id="name"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
              />

              {/* <Field
                //control={<Checkbox value="remember" color="primary" />}
                component={Checkbox}
                color="primary"
                label="I agree to all statements in Terms of Service"
                name="termsofservices"
                variant="body2"
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsofservices}
                    onChange={() => settermsofservices(!termsofservices)}
                    name="termsofservices"
                  />
                }
                label="I agree to all statements in Terms of Service"
              />
              {/* <ErrorMessage name="termsofservices" /> */}
              <p>{Msg ? Msg : null}</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!termsofservices}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      setsignIn(true);
                    }}
                  >
                    {"have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Form>
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
