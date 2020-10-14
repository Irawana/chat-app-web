import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";
import { Container } from "@material-ui/core";
import Routes from "./Routes";
import { setCurrentUser, getUsers } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { currentUser, setCurrentUser } = this.props;
    this.unsubscribeFromAuth = () => setCurrentUser(currentUser);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    let { currentUser } = this.props;

    return (
      <Container maxWidth="md">
        <Routes currentUser={currentUser} />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
