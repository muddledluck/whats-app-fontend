import React, { useState } from "react";
import { Avatar, DialogTitle } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

function AvatarImage(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Avatar {...props} onClick={handleIsOpen} />
      <Dialog
        onClose={handleIsOpen}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleIsOpen}
        ></DialogTitle>
      </Dialog>
    </>
  );
}

export default AvatarImage;
