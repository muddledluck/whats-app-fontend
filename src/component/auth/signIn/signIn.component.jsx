import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsLoading,
} from "../../../redux/auth/auth.selector";
import { signIn } from "../../../redux/auth/auth.action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const validateInput = (input) => {
    if (!details.email) {
      errors.email = true;
    }
    if (!details.password) {
      errors.password = true;
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  useEffect(() => {
    if (props.isAuth) {
      window.location.reload();
    }
  }, [props.isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const body = {
      email: email.value,
      password: password.value,
    };
    const { errors, isValid } = validateInput(body);
    if (!isValid) {
      console.log(errors);
      setErrors(errors);
      return;
    }
    console.log(body);
    props.signIn(body);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errors.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.passwrod}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleDetailsChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.isLoading}
          >
            {props.isLoading ? <CircularProgress /> : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/sign-up">Don't have account? Sign up</RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isAuth: selectIsAuthenticated(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (details) => dispatch(signIn(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
