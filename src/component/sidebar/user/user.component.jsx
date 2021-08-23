import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createNewConversation } from "../../../redux/conversation/conversation.action";

import "./user.style.css";
function User({
  profileImage,
  name,
  userName,
  userId,
  createConversation,
  setNewUsers,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };
  return (
    <>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Start New Conversation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to start chat with <b>{name}</b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              handleDialog();
              createConversation([userId]);
              setNewUsers(false);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div className="user" onClick={handleDialog}>
        <Avatar src={profileImage} alt={name} />
        <div className="user__info">
          <h2>{name}</h2>
          <p>{userName}</p>
        </div>
      </div>
    </>
  );
}

const mapDispatchtoProps = (dispatch) => ({
  createConversation: (participants) =>
    dispatch(createNewConversation(participants)),
});

export default connect(null, mapDispatchtoProps)(User);
