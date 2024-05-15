import React, { useState, useEffect } from "react";
import "./styles.css";
import { Dialog, Popover } from "@mui/material";
import ActionButton from "../../components/ChatbotComponents/ActionButton";
import { Grow } from "@mui/material";
import Chat from "../../components/ChatbotComponents/Chat";

const Chatbot = () => {
  function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowWidth;
  }

  const windowWidth = useWindowWidth();

  const [expand, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = expand || open ? "chatbot-chat-container" : undefined;

  const handleOpen = (event) => {
    setExpand(true);
    setAnchorEl(event.currentTarget);
    console.log("open");
  };

  const handleClose = () => {
    setExpand(false);
    setAnchorEl(null);
    console.log("close");
  };

  return (
    <div className="chatbot-container">
      <ActionButton handleOpen={handleOpen} />
      {windowWidth <= 390 ? (
        <Dialog
          disableScrollLock
          id={id}
          fullScreen={true}
          open={expand}
          onClose={handleClose}
          className="chatbot-chat-container"
        >
          <Chat handleClose={handleClose} />
        </Dialog>
      ) : (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          disableScrollLock
          className="chatbot-chat-container"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          TransitionComponent={Grow}
          TransitionProps={{ timeout: 300 }}
        >
          <Chat handleClose={handleClose} />
        </Popover>
      )}
    </div>
  );
};

export default Chatbot;
