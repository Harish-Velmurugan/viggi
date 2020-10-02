import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import Radio from '@material-ui/core/Radio';
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo1.png";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SignIn from "../SignIn/signInTest";
import { DetailsContext } from "../../context/DetailsContext";
//import { Radio } from 'semantic-ui-react';
import { RadioGroup } from "formik-material-ui";
import { Radio, LinearProgress } from "@material-ui/core";

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

  const [mode, setmode] = useState("");
  const [login, setlogin] = useState(false);
  const [signup, setsignup] = useState(false);
  const [signIn, setsignIn] = useState(false);
  const [termsofservices, settermsofservices] = useState(false);
  const [sideBarOpen, handleSideBar, userDetails, setUserDetails] = useContext(
    DetailsContext
  );
  const [trigger, settrigger] = useState(true);

  const initialValue = {
    email: "",
    username: "",
    password1: "",
    password2: "",
    mode: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    username: Yup.string().required("Requied"),
    password1: Yup.string().required("Required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), ""], "Passwords must match")
      .required("Required"),
    // termsofservices: Yup.array().oneOf("true").required("Required").nullable(),
  });

  const onsubmit = (values) => {
    console.log(values);
    setmode(values.mode);

    localStorage.setItem("mode", values.mode);

    if (values.mode == "company") {
      axios
        .post(
          "/api/companyrequest/" + values.username + "/" + values.code + "/"
        )
        .then((response) => {
          if (response.data.value == "success") {
            axios
              .post("/users/v1/rest-auth/registration/", values)
              .then((response) => {
                if (response.status === 201) {
                  setlogin(true);
                  setsignup(false);
                  //this.setState({ login: true, signup: true });
                  localStorage.setItem("token", response.data.key);
                  localStorage.setItem("username", response.data.user);
                  localStorage.setItem("email", values.email);
                  localStorage.setItem("signin", "false");

                  axios
                    .post(
                      `/users/v1/users/setMode/${response.data.user}/`,
                      values
                    )
                    .then((r) => console.log(r.data))
                    .catch((e) => console.log(e));

                  const globalState = userDetails;
                  globalState.loginStatus = true;
                  globalState.username = response.data.user;
                  //globalState.email = response.data.email;
                  globalState.token = response.data.key;
                  console.log(response.data);
                  setUserDetails(globalState);
                  console.log(userDetails);
                  settrigger(!trigger);
                  setmode(values.mode);
                }
              })

              .catch((error) => {
                //this.setState({ status: 400, error: "error occurred" });
                console.log(error);
              });

            return;
          }
        });
    } else {
      axios
        .post("/users/v1/rest-auth/registration/", values)
        .then((response) => {
          if (response.status === 201) {
            setlogin(true);
            setsignup(false);
            //this.setState({ login: true, signup: true });
            localStorage.setItem("token", response.data.key);
            localStorage.setItem("username", response.data.user);
            localStorage.setItem("email", values.email);
            localStorage.setItem("signin", "false");

            const globalState = userDetails;
            globalState.loginStatus = true;
            globalState.username = response.data.user;
            //globalState.email = response.data.email;
            globalState.token = response.data.key;
            console.log(response.data);
            setUserDetails(globalState);
            console.log(userDetails);
            settrigger(!trigger);
            setmode(values.mode);

            axios
              .post(`/users/v1/users/setMode/${response.data.user}/`, values)
              .then((r) => console.log(r.data))
              .catch((e) => console.log(e));
          }
        })

        .catch((error) => {
          //this.setState({ status: 400, error: "error occurred" });
          console.log(error);
        });

      return;
    }
  };

  if (userDetails.loginStatus) {
    if (mode == "company" || mode == "vendor") {
      return (
        <Redirect
          to={{
            pathname: "/updateCompany",
            state: { sign: login },
          }}
        ></Redirect>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/update",
            state: { sign: login },
          }}
        ></Redirect>
      );
    }
  }
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
            Sign up
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
                label="Username"
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
                name="password1"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
              />
              <br />
              <br />

              {/* <Radio
            label='Individual'
            name='radioGroup'
            value='user'           
            onChange={() =>  setmode('user')}
            onChange={() => console.log(mode)}
          />
           <Radio
            label='Company'
            name='radioGroup'
            value='Company'            
            onChange={() => setmode('company')}
            onChange={() => console.log(mode)}
          />
           <Radio
            label='Vendor'
            name='radioGroup'
            value='vendor'
            onChange={() => setmode('vendor')}
          /> */}
              <Field component={RadioGroup} name="mode">
                <FormControlLabel
                  value="user"
                  control={<Radio onChange={() => setmode("user")} />}
                  label="Individual"
                />
                <FormControlLabel
                  value="company"
                  control={<Radio onChange={() => setmode("company")} />}
                  label="Company"
                />
                <FormControlLabel
                  value="vendor"
                  control={<Radio onChange={() => setmode("vendor")} />}
                  label="Vendor"
                />
              </Field>
              <br />
              <br />
              {console.log(mode)}
              {(() => {
                if (mode == "company") {
                  return (
                    <div>
                      <Field
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Code"
                        type="text"
                        id="code"
                      />
                    </div>
                  );
                } else {
                  return <div></div>;
                }
              })()}

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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!termsofservices}
              >
                Sign Up
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
