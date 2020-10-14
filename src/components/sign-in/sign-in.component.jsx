import React from "react";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import "./sign-in.styles.scss";
import { login } from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { login } = this.props;
    const { username, password } = this.state;

    login(username, password);

    this.setState({
      username: "",
      password: "",
      errorMessage: this.props.errorMessage,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">Login</h2>
        <span>Please log in to continue</span>

        <form className="sign-in-form">
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
          {/* <span className="errors">{this.state.errorMessage.message}</span> */}

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
