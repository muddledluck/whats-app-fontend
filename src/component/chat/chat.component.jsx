import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  DoneAll,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import "./chat.style.css";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
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
        <p className="chat__message">
          <span className="chat__name">Saral</span>
          This is a message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p>

        <p className="chat__message chat__reciver">
          <span className="chat__name">Saral</span>
          This is a message
          <span className="chat__timestamp">
            {new Date().toLocaleString()} <DoneAll />
          </span>
        </p>

        <p className="chat__message">
          <span className="chat__name">Saral</span>
          This is a message
          <span className="chat__timestamp">{new Date().toLocaleString()}</span>
        </p>
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
