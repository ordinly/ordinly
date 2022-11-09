import React, { useState, createContext, useContext, useCallback } from "react";

import CompaniesContext from "@contexts/CompaniesContext";
import UserContext from "@contexts/UserContext";

import { getUserChat, getTeamChat, getUnreads } from "@ordinly/api-abstraction";
import { useEffect } from "react";

type Message = {
  _id?: string;
  from: string;
  repliesTo?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  message: string;
};

type To = { companyId: string; teamId?: string; userId?: string };

const ChatContext = createContext<{
  to: To;
  updateTo: (newTo: To) => void;
  getChat: () => void;
  chat: { chatId: string; messages: Message[] };
  addMessage: (newMessage: Message) => void;
  resetChat: () => void;
  unreads: { [company: string]: { [entity: string]: number } };
  getUnreadMessages: () => void;
}>(null);

export default ChatContext;

export const ChatProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const { companies, refreshCompanies } = useContext(CompaniesContext);

  const [chat, setChat] = useState({ chatId: null, messages: [] });
  const [page, setPage] = useState(1);
  const [unreads, setUnreads] = useState(null);
  const [to, setTo] = useState(null);

  const getChat = async () => {
    const { companyId, userId, teamId } = to || {};

    let _id;
    let newMessages = [];

    if (userId) {
      const {
        //@ts-ignore
        chat: { chatId, messages: responseMessages },
      } = await getUserChat({ companyId, userId, page });

      _id = chatId;
      newMessages = responseMessages;
    } else if (teamId) {
      const {
        //@ts-ignore
        chat: { chatId, messages: responseMessages },
      } = await getTeamChat({ companyId, teamId: teamId });

      _id = chatId;
      newMessages = responseMessages;
    }

    setPage(page + 1);

    setChat({
      chatId: _id,
      messages: [
        ...newMessages.sort(
          ({ createdDate: aCreatedDate }, { createdDate: bCreatedDate }) => {
            if (new Date(aCreatedDate) > new Date(bCreatedDate)) {
              return -1;
            } else if (new Date(aCreatedDate) < new Date(bCreatedDate)) {
              return 1;
            } else {
              return 0;
            }
          }
        ),
        ...chat.messages,
      ],
    });
  };

  const addMessage = async (newMessage) => {
    const newMessages = [...chat.messages, newMessage];

    setChat({
      ...chat,
      messages: newMessages.sort(
        ({ createdDate: aCreatedDate }, { createdDate: bCreatedDate }) => {
          if (new Date(aCreatedDate) > new Date(bCreatedDate)) {
            return -1;
          } else if (new Date(aCreatedDate) < new Date(bCreatedDate)) {
            return 1;
          } else {
            return 0;
          }
        }
      ),
    });
  };

  const resetChat = () => {
    setChat({ chatId: null, messages: [] });
    setPage(1);
  };

  const updateTo = (args: {
    companyId: string;
    teamId?: string;
    userId?: string;
  }) => {
    resetChat();

    setTo(args);
  };

  const getUnreadMessages = async () => {
    if (companies?.length) {
      try {
        const { unreads } = await getUnreads({
          teamIds: companies?.reduce(
            (total, { teams }) => [...total, ...teams?.map(({ _id }) => _id)],
            []
          ),
        });

        setUnreads(unreads);
      } catch (error) {}
    }
  };

  useEffect(() => {
    (async () => {
      await refreshCompanies();
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      await getUnreadMessages();
    })();
  }, [companies]);

  useEffect(() => {
    if (to?.companyId && (to?.teamId || to?.userId)) {
      (async () => {
        await getChat();
        await getUnreadMessages();
      })();
    }
  }, [to]);

  return (
    <>
      <ChatContext.Provider
        value={{
          to,
          updateTo,
          getChat,
          chat,
          addMessage,
          resetChat,
          unreads,
          getUnreadMessages,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};
