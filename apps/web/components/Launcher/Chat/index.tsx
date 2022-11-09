import { useState, useContext } from "react";

import { Icon } from "@components/Icon";
import { Portal } from "@components/Portal";
import { Badge } from "@components/Badge";

import UserContext from "@contexts/UserContext";
import ChatContext from "@contexts/ChatContext";

import Window from "./Window";

import styles from "./Chat.module.css";

const Chat = () => {
  const { user } = useContext(UserContext);
  const { unreads } = useContext(ChatContext);

  const [open, setOpen] = useState(false);

  const openWindow = () => {
    setOpen(true);
  };

  const closeWindow = () => {
    setOpen(false);
  };

  return (
    <Portal>
      <Window open={open} onClose={closeWindow} />
    </Portal>
  );
};

export default Chat;
