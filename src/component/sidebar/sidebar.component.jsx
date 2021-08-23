import {
  Avatar,
  Backdrop,
  CircularProgress,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { MoreVert, PersonAdd, SearchOutlined } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ChatIcon from "@material-ui/icons/Chat";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selector";
import { getUserConversation } from "../../redux/conversation/conversation.action";
import {
  selectConversationList,
  selectCreateConversationError,
  selectCreateConversationLoading,
} from "../../redux/conversation/conversation.selector";
// import Dialog from "@material-ui/core/Dialog";
import "./sidebar.style.css";
import SidebarChat from "./sidebarChat/sidebarChat.component";
import { getUserList } from "../../redux/user/user.action";
import { selectNewUsers } from "../../redux/user/user.selector";

import User from "./user/user.component";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Sidebar({
  getAllConversation,
  conversations,
  currentUser,
  newUsersList,
  getNewUsers,
  createConversationLoading,
}) {
  const [isOpenFindFriend, setIsOpenFindFriend] = useState(false);
  const [newUsers, setNewUsers] = useState(false);
  const [search, setSearch] = useState("");
  const classes = useStyles();

  const handleFindFriend = () => setIsOpenFindFriend(!isOpenFindFriend);

  useEffect(() => {
    getAllConversation();
  }, [getAllConversation]);

  useEffect(() => {
    getNewUsers(search);
  }, [search, getNewUsers]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton onClick={handleFindFriend}>
            <PersonAdd />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search or start new chat"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newUsers}
                onChange={() => setNewUsers(!newUsers)}
                color="primary"
              />
            }
            label="Search New User"
          />
        </div>
      </div>

      <div className="sidebar__chats">
        <Backdrop className={classes.backdrop} open={createConversationLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {newUsers
          ? newUsersList.map((user) => {
              return (
                <User
                  profileImage={user.profileImage}
                  name={user.name}
                  userName={user.username}
                  key={user._id}
                  userId={user._id}
                  setNewUsers={setNewUsers}
                />
              );
            })
          : conversations.map((conversation) => {
              console.log(conversation.participants);
              if (
                conversation.participants[0] &&
                conversation.participants[0]._id === currentUser._id
              ) {
                conversation.user = conversation.participants[1];
              } else {
                conversation.user = conversation.participants[0];
              }
              console.log("conversationUser: ", conversation.user);
              return (
                <SidebarChat
                  key={conversation._id}
                  name={conversation.user.name}
                  lastMessage={conversation.lastMessage}
                  profileImage={conversation.profileImage}
                  conversationId={conversation._id}
                  user={conversation.user}
                />
              );
            })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  conversations: selectConversationList(state),
  currentUser: selectCurrentUser(state),
  newUsersList: selectNewUsers(state),
  createConversationLoading: selectCreateConversationLoading(state),
  createConversationError: selectCreateConversationError(state),
});

const mapPropsToState = (dispatch) => ({
  getAllConversation: () => dispatch(getUserConversation()),
  getNewUsers: (search) => dispatch(getUserList(search)),
});

export default connect(mapStateToProps, mapPropsToState)(Sidebar);
