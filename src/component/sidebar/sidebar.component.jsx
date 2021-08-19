import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, PersonAdd, SearchOutlined } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import React, { useState } from "react";
// import Dialog from "@material-ui/core/Dialog";
import "./sidebar.style.css";
import SidebarChat from "./sidebarChat/sidebarChat.component";

function Sidebar() {
  const [isOpenFindFriend, setIsOpenFindFriend] = useState(false);

  const handleFindFriend = () => setIsOpenFindFriend(!isOpenFindFriend);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <PersonAdd onClick={handleFindFriend} />
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
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
