import { Avatar } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import "./sidebarChat.style.css";
import { connect } from "react-redux";
import { selectConversation } from "../../../redux/conversation/conversation.action";
import { selectSelectedConversationId } from "../../../redux/conversation/conversation.selector";

function SidebarChat({
  name,
  lastMessage,
  profileImage,
  conversationId,
  selectedConversationId,
  selectConversation,
  user,
}) {
  return (
    <div
      className={`sidebarChat ${
        conversationId === selectedConversationId ? "selected" : ""
      }`}
      onClick={() => selectConversation(conversationId, user)}
    >
      <Avatar src={profileImage} alt={name} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{lastMessage}</p>
      </div>
      {/* <span>{newMessageCount}</span> */}
    </div>
  );
}

SidebarChat.propsType = {
  name: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  profileImage: PropTypes.string,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  selectedConversationId: selectSelectedConversationId(state),
});
const mapDispatchToProps = (dispatch) => ({
  selectConversation: (id, user) => dispatch(selectConversation(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarChat);
