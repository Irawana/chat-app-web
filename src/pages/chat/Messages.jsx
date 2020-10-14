import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import socketIOClient from "socket.io-client";
import { selectMessagesList } from "../../redux/message/message.selectors";
import {
  selectCurrentUser,
  selectSelectedUser,
} from "../../redux/user/user.selectors";
import { getMessages } from "../../redux/message/message.actions";
import { apiUrl } from "../../config";

const Messages = (props) => {
  const { messages, currentUser, selectedUser, getMessages } = props;

  useEffect(() => {
    const socket = socketIOClient(apiUrl);

    if (selectedUser && currentUser) {
      const from = currentUser._id;
      const to = selectedUser._id;

      socket.on(`io.from.${from}.to.${to}`, () => {
        getMessages(from, to);
      });

      socket.on(`io.from.${to}.to.${from}`, () => {
        getMessages(from, to);
      });
    }

  }, [selectedUser, currentUser, getMessages]);

  useEffect(() => {
    if (selectedUser) getMessages(currentUser._id, selectedUser._id);
  }, [selectedUser, currentUser, getMessages]);

  return (
    <Box component="div" m={1}>
      <List>
        {messages.map((row) => (
          <ListItem alignItems="flex-start" key={row._id}>
            <ListItemText primary={row.message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  messages: selectMessagesList,
  currentUser: selectCurrentUser,
  selectedUser: selectSelectedUser,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (from, to) => dispatch(getMessages(from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
