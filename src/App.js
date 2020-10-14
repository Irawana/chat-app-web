import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";
import { setCurrentUser, getUsers } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import ChatPage from "./pages/chat/chat.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { currentUser, setCurrentUser, getUsers } = this.props;
    this.unsubscribeFromAuth = () => setCurrentUser(currentUser);

    if (currentUser) getUsers();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="app">
        {
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? <Redirect to="/chat" /> : <SignInSignUpPage />
              }
            />
            <Route
              exact
              path="/chat"
              render={() => (currentUser ? <ChatPage /> : <SignInSignUpPage />)}
            />
          </Switch>
        }
      </div>
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
