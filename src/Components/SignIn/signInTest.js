import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import SignUp from "../SignUp/singupTest";
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
  const [login, setlogin] = useState(false);
  const [ForgetPassword, setForgetPassword] = useState(true);
  const [signup, setsignup] = useState(false);
  const [error, seterror] = useState("");
  const [user, setUser] = useState("");

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onsubmit = (values) => {
    axios
      .post("/users/v1/rest-auth/login/", values)
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("token", response.data.key);
          localStorage.setItem("username", response.data.user);
          localStorage.setItem("email", values.email);
          window.localStorage.setItem("signin", "true");
          setlogin(true);
          // axios
          //   .get("/api/notifyCountGet/" + response.data.user + "/")
          //   .then((res) => {
          //     if (res.status == 200) {
          //       localStorage.setItem("userMode", res.data.user);
          //       setUser(res.data.user);
          //       console.log(res.data);
          //       setlogin(true);
          //     }
          //   });

          axios
            .get(`/users/v1/users/mode/${response.data.user}/`)
            .then((res) => {
              localStorage.setItem("mode", res.data.value);
              console.log(res.data.value);
              setUser(res.data.value);
            })
            .catch((e) => console.log(e));

          const url = "/";
          const method = "GET";
          axios
            .request({
              baseURL: "/wallet/walletdetails/" + values.email,
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + response.data.key,
              },
              url,
              method,
            })
            .then((response) => {
              localStorage.setItem("un", response.data.username);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        seterror("Invaild EmailId or Password");
      });

    return;
  };

  const initialValueForgetPassword = {
    email: "",
  };

  const validationSchemaForgetPassword = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onsubmitForgetPassword = (values) => {
    console.log(values);
  };

  if (login && (user == "user" || user == "company")) {
    return <Redirect to="/feed" />;
  }
  if (login && user == "vendor") {
    return <Redirect to="/DataProviderFeed" />;
  }

  if (signup) return <SignUp />;

  return ForgetPassword ? (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ cursor: "pointer" }}>
            Sign in
          </Typography>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onsubmit}
            enableReinitialize
          >
            <Form className={classes.form} noValidate>
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <p style={{ color: "red" }}>{error}</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={() => setForgetPassword(false)}
                    variant="body2"
                  >
                    {/* Forgot password? */}
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => setsignup(true)}>
                    {"Don't have an account? Sign Up"}
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
  ) : (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password ?
          </Typography>
          <Formik
            initialValues={initialValueForgetPassword}
            validationSchema={validationSchemaForgetPassword}
            onSubmit={onsubmitForgetPassword}
          >
            <Form className={classes.form} noValidate>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={() => setForgetPassword(true)} variant="body2">
                    Sign In ?
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
