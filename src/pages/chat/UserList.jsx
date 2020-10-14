import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Box,
} from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUsersList,
  selectCurrentUser,
  selectSelectedUser
} from "../../redux/user/user.selectors";
import { setSelectedUser, getUsers } from "../../redux/user/user.actions";
import { apiUrl } from "../../config";

const UserList = (props) => {
  const { users, getUsers, currentUser, selectedUser, setSelectedUser } = props;

  useEffect(() => {
    const socket = socketIOClient(apiUrl);

    socket.on("logged", () => {
      getUsers();
    });

    socket.on("logout", () => {
      getUsers();
    });
  }, [getUsers]);

  useEffect(() => {
    if (currentUser)
      getUsers();
  }, [currentUser, getUsers]);

  const onClickRow = async (user) => {
    setSelectedUser(user);
  };

  return (
    <Grid item md={4}>
      <List>
        {users.map((user) =>
          user._id !== currentUser._id && (
            <Box key={user._id}>
              <ListItem
                button
                alignItems="flex-start"
                selected={selectedUser && user._id === selectedUser._id}
                onClick={() => onClickRow(user)}
              >
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                <ListItemIcon>
                  {user.isLoggedIn && <ChatBubbleIcon fontSize="small" />}
                </ListItemIcon>
              </ListItem>
              <Divider />
            </Box>
          ))}
      </List>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectUsersList,
  currentUser: selectCurrentUser,
  selectedUser: selectSelectedUser
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedUser: (user) => dispatch(setSelectedUser(user)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
