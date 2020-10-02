import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { Grid } from "semantic-ui-react";
import { Formik, Form, FieldArray, Field } from "formik";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function InspectSolution() {
  const classes = useStyles();

  const initialValues = {
    metrics: [{ name: "", minValue: "", maxValue: "" }],
  };
  const onSubmit = (values) => {
    let sent = [];

    for (let i = 0; i < values.metrics.length; i++) {
      sent.push(JSON.stringify(values.metrics[i]));
      sent.push("/$/");
    }
    console.log(sent);

    const newItem = {
      solutionId: 5,
      metrics: `${sent}`,
    };

    let url = `/monitorsolution/addmetrics/`;
    axios
      .post(url, newItem)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));

    //console.log(JSON.stringify(values.metrics));
  };
  const validationSchema = Yup.object({});

  return (
    <Paper elevation={5}>
      <Typography variant="h4" style={{ padding: "2rem" }}>
        Add Metrics to Evaluate your solution
      </Typography>
      <div style={{ padding: "2rem" }} className={classes.root}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form>
            <FieldArray name="metrics">
              {(fieldArrayProps) => {
                //console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { metrics } = values;

                return (
                  <div>
                    {metrics.map((metric, index) => (
                      <div key={index}>
                        <Field
                          component={TextField}
                          name={`metrics[${index}].name`}
                          label="Add metrics"
                        />
                        <Field
                          component={TextField}
                          name={`metrics[${index}].minValue`}
                          label="Minmum threshold"
                        />
                        <Field
                          component={TextField}
                          name={`metrics[${index}].maxValue`}
                          label="Maximum threshold"
                        />
                        {index > 0 && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => remove(index)}
                          >
                            -
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({ name: "", minValue: "", maxValue: "" })
                          }
                        >
                          +
                        </Button>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "2rem" }}
            >
              Submit
            </Button>
          </Form>
        </Formik>
      </div>
    </Paper>
  );
}

export default InspectSolution;
