import React from "react";
import { Grid } from "@material-ui/core";
import ChatForm from "./ChatForm";
import Messages from "./Messages";

const ChatBox = () => (
  <Grid item md={8}>
    <Messages />
    <ChatForm />
  </Grid>
);

export default ChatBox;
