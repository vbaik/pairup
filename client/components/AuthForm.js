import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

//style:

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container, InputLabel, Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import theme from "./style/Theme";

function Copyright(props) {
  return (
    <Typography variant="body2" color="primary" align="center" {...props}>
      {"Copyright © "}
      <Link href="https://mui.com/">PairUp</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mbtiArr = [
  "ISFJ",
  "ESFJ",
  "ISTJ",
  "ISFP",
  "ESTJ",
  "ESFP",
  "ENFP",
  "ISTP",
  "INFP",
  "ESTP",
  "INTP",
  "ENTP",
  "ENFJ",
  "INTJ",
  "ENTJ",
  "INFJ",
];

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  function createMbtiMenu(i, mbtiName) {
    return (
      <MenuItem key={i} value={i + 1}>
        {mbtiName}
      </MenuItem>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="secondary" component="h1" variant="h5">
            {displayName}
          </Typography>
          <Box
            name={name}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              // autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <InputLabel id="mbti-dropdown">Your MBTI:</InputLabel>
            <Select
              labelId="mbti-dropdown"
              id="mbtiId"
              label="MBTI"
              name="mbtiId"
              fullWidth
            >
              {mbtiArr.map((mbti, idx) => createMbtiMenu(idx, mbti))}
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {displayName}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const mbtiId = evt.target.mbtiId.value;
      dispatch(authenticate(username, password, formName, mbtiId, history));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
