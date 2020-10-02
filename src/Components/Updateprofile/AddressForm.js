import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { TextField, Select } from "formik-material-ui";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import countries from "./countries.json";

import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  profile: {
    textAlign: "center",
  },
  profileImage: {
    width: "90%",
    height: "20vh",
  },
  file: {
    position: "relative",
    overflow: "hidden",
    width: "90%",
    margin: "auto",
    border: "none",
    borderRadius: "0",
    fontSize: "15px",
    background: "#212529b8",
  },
  profileImg: {
    position: "absolute",
    opacity: "0",
    right: "0",
    top: "0",
  },
}));

export default function AddressForm(props) {
  const classes = useStyles();
  const [trigger, settrigger] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    dob: null,
    gender: "",
    phone: "+91",
    nationality: "",
    pin: "",
    bio: "",
    img: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    dob: Yup.date().required("Required").nullable(),
    gender: Yup.string().required("Required"),
    phone: Yup.string()
      .length(13, "Exactly enter 10 digits !")
      .required("Required"),
    nationality: Yup.string().required("Required"),
    pin: Yup.number().required("Required"),
    //img: Yup.mixed().required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    setTimeout(() => settrigger(true), 3000);
  };
  if (trigger) {
    props.handleNext();
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.profile}>
                    <img
                      className={classes.profileImage}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                      alt=""
                    />
                    {/* <div className={classes.file}>
                      Change Photo
                      <Input
                        name="img"
                        required
                        name="file"
                        fullWidth
                        type="file"
                        className={classes.profileImg}
                        onChange={(e) =>
                          formik.setFieldValue("img", e.target.files[0])
                        }
                      />
                    </div> */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    id="bio"
                    name="bio"
                    label="Bio"
                    multiline
                    rows={7}
                    fullWidth
                    placeholder="I am a solver/seeker and work on ingenious challenges to bring a
                change to our environment."
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    required
                    id="firstname"
                    name="firstname"
                    label="First name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    required
                    id="lastname"
                    name="lastname"
                    label="Last name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  {/* <Field
                    component={KeyboardDatePicker}
                    name="dob"
                    label="Date of Birth"
                    fullWidth
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {/* <Field
                    component={TextField}
                    type="text"
                    name="gender"
                    label="Gender"
                    select
                    variant="standard"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field> */}
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    required
                    name="phone"
                    label="Phone Number"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* <Field
                    component={TextField}
                    type="text"
                    name="nationality"
                    label="country"
                    select
                    variant="standard"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      // component={TextField}
                      // name="country"
                      // margin="normal"
                      // inputProps={{
                      //   id: "countriesList",
                    }}
                    fullWidth
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.value} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Field> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    required
                    id="pin"
                    name="pin"
                    label="Zip Code"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  {"Update & Next"}
                </Button>
              </div>
            </MuiPickersUtilsProvider>
          </Form>
        )}
      </Formik>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => props.handleNext()}
      >
        {"Update & Next"}
      </Button>
    </React.Fragment>
  );
}
