import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./chat.styles.scss";
import {
  selectUsersList,
  selectChatUser,
} from "../../redux/user/user.selectors";
import { logout, setChatUser } from "../../redux/user/user.actions";

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
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { users, logout, chatUser, setChatUser } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {users && users.length ? (
          users.map((user) => (
            <ListItem button key={user._id}>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                onClick={() => setChatUser(user)}
              />
              {/* {user.isLoggedIn ? "lightgray" : "yellow-green"} //TODO: show online status */}
              <div className="status-icon" />
            </ListItem>
          ))
        ) : (
          <div>No users exists</div>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {chatUser ? <span>{chatUser.firstName}</span> : null}
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
            container={container}
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
        <ul id="messages">hi</ul>
        {/* 
        <Typography paragraph>first message</Typography>
        <Typography paragraph>second message</Typography> */}
        {/* <form className="chat-form">
          <TextField
            id="filled-textarea"
            placeholder="Type your message and press ENTER"
            multiline
            variant="filled"
            className="text"
          />
        </form> */}

        <form className="chat-form" action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>
      </main>
    </div>
  );
};

/* ChatPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
/*window: PropTypes.func,
}; */

const mapStateToProps = createStructuredSelector({
  users: selectUsersList,
  chatUser: selectChatUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  setChatUser: () => dispatch(setChatUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
