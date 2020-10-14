import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { createUser } from "../../redux/user/user.actions";

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstName = (text) => {
    setFirstName(text);
  };

  const handleLastName = (text) => {
    setLastName(text);
  };

  const handleUserName = (text) => {
    setUserName(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    const { createUser } = props;
    await createUser(firstName, lastName, userName, password);

    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");

    setMessage("error");
  };

  return (
    <Grid item md={6}>
      <h2>Sign Up</h2>

      {message === "success" && (
        <Alert severity="success">Registration is success. Please login!</Alert>
      )}
      {message === "error" && (
        <Alert severity="error">Something went wrong. Please try again!</Alert>
      )}

      <span>Don't have an account? Please register.</span>

      <form>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => handleFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => handleLastName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Username"
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

        <Button variant="contained" color="primary" onClick={signUpHandler}>
          Register
        </Button>
      </form>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createUser: (firstName, lastName, username, password) =>
    dispatch(createUser({ firstName, lastName, username, password })),
});

export default connect(null, mapDispatchToProps)(SignUp);
