import React, { useEffect } from "react";
import { connect } from "react-redux";
import Chat from "../../component/chat/chat.component";
import Sidebar from "../../component/sidebar/sidebar.component";
import { selectSocket } from "../../redux/auth/auth.selector";
import { updateSelectedUser } from "../../redux/conversation/conversation.action";
import { selectOtherUser } from "../../redux/conversation/conversation.selector";

function ChatPage({ socket, updateSelectedUser, otherUser }) {
  useEffect(() => {
    if (Object.keys(socket).length > 0) {
      socket.on(`user_update_${otherUser._id}`, (user) => {
        updateSelectedUser(user);
      });
    }
  }, [updateSelectedUser, socket, otherUser]);
  return (
    <div className="app__body">
      <Sidebar />
      <Chat />
    </div>
  );
}

const mapStateToProps = (state) => ({
  socket: selectSocket(state),
  otherUser: selectOtherUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedUser: (user) => dispatch(updateSelectedUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
