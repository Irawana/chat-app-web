import React from "react";
import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../../redux/user/user.actions";

import UserList from "./UserList";
import ChatBox from "./ChatBox";

const Chat = (props) => {
  const { logout } = props;

  logout();

  return (
    <Grid container spacing={3}>
      <AppBar position="static">
        <Toolbar>
          <Grid item md={11}></Grid>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <UserList />
      <ChatBox />
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Chat);
