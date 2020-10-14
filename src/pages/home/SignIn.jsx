import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { login } from "../../redux/user/user.actions";

const SignIn = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = (text) => {
    setUserName(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const signInHandler = async () => {
    const { login } = props;
    await login(userName, password);

    setUserName("");
    setPassword("");

    //TODO - show error message if fail
  };

  //TODO - validation

  return (
    <Grid item md={6}>
      <h2>Login</h2>
      <span>Please log in to continue</span>

      <form>
        <TextField
          fullWidth
          label="User Name"
          name="userName"
          required
          value={userName}
          onChange={(e) => handleUserName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          required
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={signInHandler}>
          Login
        </Button>
      </form>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (userName, password) => dispatch(login(userName, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
