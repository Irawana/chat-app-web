import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./chat.styles.scss";
import {
  selectUsersList,
  selectCurrentUser,
} from "../../redux/user/user.selectors";
import { logout } from "../../redux/user/user.actions";
import {
  fetchMessages,
  saveMessage,
} from "../../serviceClients/message.client";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MessageItem from "../../components/messageItem/message-item.component";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ChatPage = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatUser, setChatUser] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { users, logout, currentUser } = props;

  //Handle toggle of the drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Handle select user
  const selectUser = async (user) => {
    setChatUser(user);

    //Get previous messages for selected user
    const usersMessages = (await fetchMessages(user._id)).data;
    setMessages(usersMessages);
  };

  //Handle on chane event of the message text
  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  //Handle submitting message
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Check whether an user selected or not
    if (!chatUser) {
      alert("Please select a user to send a message!");
      return;
    }

    //Check whether message text is empty or not
    if (!message) {
      alert("Please type a message!");
      return;
    }

    const messageToCreate = { from: currentUser.id, to: chatUser._id, message };
    const createdMsg = (await saveMessage(messageToCreate)).data;
    setMessages([...messages, createdMsg]);

    setMessage("");
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {users && users.length ? (
          users.map((user) =>
            user._id !== currentUser.id ? (
              <ListItem button key={user._id}>
                <div className="status-icon" />
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  onClick={() => selectUser(user)}
                />
              </ListItem>
            ) : null
          )
        ) : (
          <div>No users exists</div>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {chatUser ? (
          <span>{`${chatUser.firstName} ${chatUser.lastName}`}</span>
        ) : null}
        <span className="logout" onClick={() => logout()}>
          Logout
        </span>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            //container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ul id="messages">
          {messages.map((msg) => (
            <MessageItem key={msg._id} msg={msg} authUser={currentUser.id} />
          ))}
        </ul>
        <form className="chat-form" action="">
          <input
            id="m"
            autoComplete="off"
            name="message"
            value={message}
            onChange={handleChange}
            type="text"
          />
          <button onClick={handleSubmit}>Send</button>
        </form>
      </main>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectUsersList,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
