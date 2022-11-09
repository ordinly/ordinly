import { useContext, useRef, useState, useMemo, useCallback } from "react";

import { debounce } from "lodash";

import UserContext from "@contexts/UserContext";
import SocketContext from "@contexts/SocketContext";
import ChatContext from "@contexts/ChatContext";
import CompaniesContext from "@contexts/CompaniesContext";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Message from "./Message";

import styles from "./Messages.module.css";

const Messages = ({ companyId }) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { companies } = useContext(CompaniesContext);
  const { to, chat, addMessage, getChat } = useContext(ChatContext);

  const [newMessage, setNewMessage] = useState("");

  const onNewMessageChange = (newNewMessage) => {
    setNewMessage(newNewMessage);
  };

  const sendMessage = () => {
    socket?.emit("send-message", {
      ...to,
      message: newMessage,
    });

    addMessage({ createdAt: new Date(), from: user._id, message: newMessage });

    setNewMessage("");
  };

  const scrollListener = async ({ target: { scrollTop } }) => {
    if (scrollTop === 0) {
      const first = messagesRef.current.children[0];

      await getChat();

      first?.scrollIntoView();
    }
  };

  const company = useMemo(() => {
    return companies.find(({ _id }) => _id === companyId);
  }, [companyId]);

  const debouncedSubmit = useCallback(
    debounce((event) => {
      scrollListener(event);
    }, 400),
    [getChat]
  );

  return (
    <div className={styles.chat}>
      <div
        className={styles.messages}
        onScroll={debouncedSubmit}
        ref={messagesRef}
      >
        {chat?.messages?.map(({ _id, from, ...rest }, index) => (
          <Message
            key={_id}
            {...rest}
            name={company?.workers?.find(({ _id }) => _id === from).name}
            sent={from === user._id}
            last={index === chat?.messages.length - 1}
          />
        ))}
      </div>

      <div className={styles.newMessageContainer}>
        <div className={styles.input}>
          <Input
            size="medium"
            onChange={onNewMessageChange}
            value={newMessage}
          />
        </div>

        <div>
          <Button size="medium" text="Send" icon="send" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
