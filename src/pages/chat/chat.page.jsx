import React from "react";
import Chat from "../../component/chat/chat.component";
import Sidebar from "../../component/sidebar/sidebar.component";

function ChatPage() {
  return (
    <div className="app__body">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default ChatPage;
