import { useContext, useEffect, useState } from "react";

import { CloseButton } from "@components/CloseButton";
import { Icon } from "@components/Icon";
import { Badge } from "@components/Badge";

import Messages from "./Messages";

import UserContext from "@contexts/UserContext";
import CompaniesContext from "@contexts/CompaniesContext";
import ChatContext from "@contexts/ChatContext";
import SocketContext from "@contexts/SocketContext";

import { updateChatRead } from "@ordinly/api-abstraction/chat";

import styles from "./Window.module.css";

const Window = ({ open, onClose }) => {
  const { user } = useContext(UserContext);
  const { companies, refreshCompanies } = useContext(CompaniesContext);
  const { to, updateTo, addMessage, chat, getUnreadMessages, unreads } =
    useContext(ChatContext);
  const { socket } = useContext(SocketContext);

  const [activeCompany, setActiveCompany] = useState(0);

  const changeCompany = (newActiveCompany) => {
    setActiveCompany(newActiveCompany);
  };

  const changeChat = async ({
    userId,
    teamId,
  }: {
    userId?: string;
    teamId?: string;
  }) => {
    if (userId) {
      updateTo({
        companyId: companies[activeCompany]?._id,
        userId,
      });
    } else if (teamId) {
      socket.emit("join-team-room", {
        companyId: companies[activeCompany]?._id,
        teamId,
      });

      updateTo({
        companyId: companies[activeCompany]?._id,
        teamId,
      });
    }
  };

  useEffect(() => {
    if (open) {
      refreshCompanies();
    } else {
      changeCompany(null);

      updateTo({
        companyId: null,
        userId: null,
        teamId: null,
      });
    }
  }, [open]);

  const onNewMessage = async (incomingMessage) => {
    const currentChatId = to?.userId || to?.teamId;

    if (
      (incomingMessage.from === currentChatId ||
        incomingMessage.teamId === currentChatId) &&
      incomingMessage.companyId === companies[activeCompany]?._id
    ) {
      addMessage(incomingMessage);

      await updateChatRead({
        companyId: companies[activeCompany]?._id,
        chatId: chat.chatId,
      });
    } else {
      await getUnreadMessages();
    }
  };

  useEffect(() => {
    socket?.on("new-message", onNewMessage);

    return () => {
      socket?.off("new-message", onNewMessage);
    };
  }, [socket, activeCompany, chat]);

  return (
    <>
      {companies?.length && (
        <div className={`${styles.background} ${open ? styles.open : ""}`}>
          <div className={`${styles.container} ${open ? styles.open : ""}`}>
            <div className={styles.close}>
              <CloseButton id="messages-close-button" onClick={onClose} />
            </div>

            <div className={styles.companiesContainer}>
              <ul className={styles.companies}>
                {companies?.map(({ _id, name }, index) => (
                  <div onClick={() => changeCompany(index)}>
                    <Badge
                      visible={
                        unreads && unreads[_id]
                          ? !!Object.values(unreads[_id]).reduce(
                              (total, current) => total + current,
                              0
                            )
                          : null
                      }
                      variant="warning"
                      number={
                        unreads && unreads[_id]
                          ? Object.values(unreads[_id]).reduce(
                              (total, current) => total + current,
                              0
                            )
                          : null
                      }
                    >
                      <div
                        className={`${styles.company} ${
                          index === activeCompany ? styles.active : ""
                        }`}
                      >
                        <li>{name.charAt(0)}</li>
                      </div>
                    </Badge>
                  </div>
                ))}
              </ul>

              <div className={styles.conversations}>
                <h1 className={styles.title}>
                  {companies[activeCompany]?.name}
                </h1>

                <h2 className={styles.subtitle}>Workers</h2>

                <ul className={styles.section}>
                  {companies[activeCompany]?.workers
                    ?.filter(({ _id }) => _id !== user?._id)
                    ?.map(({ _id, name }) => (
                      <li
                        className={styles.workerItem}
                        onClick={() => changeChat({ userId: _id })}
                      >
                        <div className={styles.workerImage}>
                          <Icon icon="worker" />
                        </div>

                        <Badge
                          visible={
                            unreads &&
                            unreads[companies[activeCompany]?._id] &&
                            !!unreads[companies[activeCompany]?._id][_id]
                          }
                          variant="warning"
                          number={
                            unreads && unreads[companies[activeCompany]?._id]
                              ? unreads[companies[activeCompany]?._id][_id]
                              : null
                          }
                        >
                          <p className={`${styles.name}`}>{name}</p>
                        </Badge>
                      </li>
                    ))}
                </ul>

                {companies[activeCompany]?.teams?.length ? (
                  <ul className={styles.section}>
                    <h2 className={styles.subtitle}>Teams</h2>

                    {companies[activeCompany]?.teams?.map(({ name, _id }) => (
                      <li
                        className={styles.teamItem}
                        onClick={() => changeChat({ teamId: _id })}
                      >
                        <p className={`${styles.name}`}>
                          <Badge
                            visible={
                              unreads &&
                              unreads[companies[activeCompany]?._id] &&
                              !!unreads[companies[activeCompany]?._id][_id]
                            }
                            variant="warning"
                            number={
                              unreads && unreads[companies[activeCompany]?._id]
                                ? unreads[companies[activeCompany]?._id][_id]
                                : null
                            }
                          >
                            {name}
                          </Badge>
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {to?.teamId || to?.userId ? (
              <Messages companyId={companies[activeCompany]?._id} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Window;
