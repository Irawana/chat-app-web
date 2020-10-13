import React from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import "./sign-up.styles.scss";
import { createUser } from "../../redux/user/user.actions";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      errors: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { createUser } = this.props;
    const { firstName, lastName, username, password } = this.state;

    await createUser(firstName, lastName, username, password);

    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-up">
        <h2 className="title">Sign Up</h2>
        <span>Don't have an account? Please register.</span>

        <form className="sign-up-form">
          <TextField
            onChange={this.handleChange}
            label="First Name"
            name="firstName"
            value={this.state.firstName}
            required
          />
          <TextField
            onChange={this.handleChange}
            label="Last Name"
            name="lastName"
            value={this.state.lastName}
            required
          />
          <TextField
            onChange={this.handleChange}
            label="Username"
            name="username"
            value={this.state.username}
            required
          />
          <TextField
            onChange={this.handleChange}
            label="Password"
            name="password"
            value={this.state.password}
            required
            type="password"
          />
          {this.state.errorMessage ? (
            <span className="errors">test</span>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (firstName, lastName, username, password) =>
    dispatch(createUser({ firstName, lastName, username, password })),
});

export default connect(null, mapDispatchToProps)(SignUp);
