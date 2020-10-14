import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectSelectedUser,
} from "../../redux/user/user.selectors";
import { createMessage } from "../../redux/message/message.actions";

const ChatForm = (props) => {
  const { currentUser, selectedUser, createMessage } = props;
  const [message, setMessage] = useState("");

  const handleMessage = (text) => {
    setMessage(text);
  };

  const submitMessage = async () => {
    //Check whether an user selected or not
    if (!selectedUser) {
      alert("Please select a user to send a message!");
      return;
    }

    //Check whether message text is empty or not
    if (!message) {
      alert("Please type a message!");
      return;
    }

    const messageToCreate = {
      from: currentUser._id,
      to: selectedUser._id,
      message,
    };

    createMessage(messageToCreate);

    setMessage("");
  };

  return (
    <Box component="div" m={1}>
      <form>
        <TextField
          fullWidth
          name="message"
          required
          value={message}
          onChange={(e) => handleMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={submitMessage}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  selectedUser: selectSelectedUser,
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (message) => dispatch(createMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
