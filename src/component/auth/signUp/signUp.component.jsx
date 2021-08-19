import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { signUp } from "../../../redux/auth/auth.action";

import {
  selectIsAuthenticated,
  selectIsLoading,
} from "../../../redux/auth/auth.selector";

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

function SignUp(props) {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  if (props.isAuth) {
    return <Redirect to="/chat" />;
  }

  const validateInput = (input) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = {};
    if (!details.name) {
      errors.name = true;
    }
    if (!details.username) {
      errors.username = true;
    }
    if (!details.email) {
      errors.email = true;
    } else if (!details.email.match(re)) {
      errors.email = true;
    }
    if (!details.password) {
      errors.password = true;
    } else if (details.password !== details.confirmPassword) {
      errors.confirmPassword = true;
    }
    return {
      errors,
      isValid: !Object.keys(errors).length,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, email, password } = e.target;
    const body = {
      name: name.value,
      username: username.value,
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
    props.signUp(body);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errors.name}
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.username}
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.email}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.confirmPassword}
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
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
            {props.isLoading ? <CircularProgress /> : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/sign-in">
                {/* <Link href="#" variant="body2"> */}
                Already have an account? Sign in
                {/* </Link> */}
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  isAuth: selectIsAuthenticated(state),
});
const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
