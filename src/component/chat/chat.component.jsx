import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  DoneAll,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import TimerIcon from "@material-ui/icons/Timer";
import CheckIcon from "@material-ui/icons/Check";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactTimeago from "react-timeago";
import { selectCurrentUser } from "../../redux/auth/auth.selector";
import {
  selectOtherUser,
  selectOtherUserSocketId,
  selectSelectedConversationId,
} from "../../redux/conversation/conversation.selector";
import { getPreviousConversationMessages } from "../../redux/messages/message.action";
import {
  selectMessageError,
  selectMessagesLoading,
  selectPreviousMessages,
} from "../../redux/messages/message.selector";
import "./chat.style.css";

function Chat({
  isLoadingMessages,
  prevMessages,
  errorLoadingMessages,
  getPreviousMessages,
  conversationId,
  otherUser,
  userSocketId,
  currentUser,
}) {
  useEffect(() => {
    if (conversationId) {
      getPreviousMessages(conversationId);
    }
  }, [getPreviousMessages, conversationId]);
  if (isLoadingMessages) {
    return <h1>Loading...</h1>;
  } else if (errorLoadingMessages) {
    return <h1>Something went wrong!!!</h1>;
  }

  if (!conversationId) {
    return <p>No Chat Selected</p>;
  }

  console.log("prevMesage", prevMessages);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar alt={otherUser.name} src={otherUser.profileImage} />
        <div className="chat__headerInfo">
          <h3>{otherUser.name}</h3>
          <p>
            {userSocketId ? (
              "online"
            ) : (
              <ReactTimeago date={otherUser.updatedAt} />
            )}
          </p>
        </div>
        <div className="chat__hearderRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {prevMessages.map((message) => (
          <p
            className={`chat__message ${
              message.author._id === currentUser._id ? "chat__reciver" : ""
            }`}
          >
            <span className="chat__name">
              {message.author._id === currentUser._id
                ? "You"
                : message.author.name}
            </span>
            {message.content}
            <span className="chat__timestamp">
              <ReactTimeago date={message.createdAt} />
              {message.isSeen ? (
                "seen"
              ) : message.isRecived ? (
                <DoneAll fontSize="inherit" />
              ) : message.isSent ? (
                <CheckIcon />
              ) : (
                <TimerIcon />
              )}
            </span>
          </p>
        ))}
        {/* <p className="chat__message">
          <span className="chat__name">Saral</span>
          This is a message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p>
isRecived: false
isSeen: false
isSent: false
        <p className="chat__message chat__reciver">
          <span className="chat__name">Saral</span>
          This is a message reciver
          <span className="chat__timestamp">
            {new Date().toLocaleString()} <DoneAll />
          </span>
        </p>

        <p className="chat__message">
          <span className="chat__name">Saral</span>
          This is a message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">Send</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  prevMessages: selectPreviousMessages(state),
  isLoadingMessages: selectMessagesLoading(state),
  errorLoadingMessages: selectMessageError(state),
  conversationId: selectSelectedConversationId(state),
  otherUser: selectOtherUser(state),
  userSocketId: selectOtherUserSocketId(state),
  currentUser: selectCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  getPreviousMessages: (id) => dispatch(getPreviousConversationMessages(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
