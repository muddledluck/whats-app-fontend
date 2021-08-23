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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactTimeago from "react-timeago";
import {
  selectCurrentUser,
  selectSocket,
} from "../../redux/auth/auth.selector";
import {
  selectOtherUser,
  selectOtherUserSocketId,
  selectSelectedConversationId,
} from "../../redux/conversation/conversation.selector";
import {
  createMessage,
  getPreviousConversationMessages,
  newMessageRecived,
} from "../../redux/messages/message.action";
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
  createMessage,
  socket,
  newMessageRecived,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Object.keys(socket).length) {
      socket.on("new_message", (message) => {
        newMessageRecived(message);
      });
    }
  }, [socket, newMessageRecived]);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    createMessage(conversationId, message);
  };
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
              {message.author._id === currentUser._id ? (
                <>
                  {message.isSeen ? (
                    <DoneAll
                      style={{ color: "aqua" }}
                      className="chat__svg__icon"
                    />
                  ) : message.isRecived ? (
                    <DoneAll className="chat__svg__icon" />
                  ) : message.isSent ? (
                    <CheckIcon className="chat__svg__icon" />
                  ) : (
                    <TimerIcon className="chat__svg__icon" />
                  )}
                </>
              ) : (
                ""
              )}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={handleSendMessage}>
          <input
            placeholder="Type a message"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
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
  socket: selectSocket(state),
});
const mapDispatchToProps = (dispatch) => ({
  getPreviousMessages: (id) => dispatch(getPreviousConversationMessages(id)),
  createMessage: (convId, content) => dispatch(createMessage(convId, content)),
  newMessageRecived: (message) => dispatch(newMessageRecived(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
