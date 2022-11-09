import React, { useState, createContext, useContext, useEffect } from "react";

import NotificationContext from "@contexts/NotificationContext";
import SocketContext from "@contexts/SocketContext";

import { getUser } from "@ordinly/api-abstraction/users";

const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  fetchUser: () => void;
}>(null);

export default UserContext;

export type Invitation = {
  from: {
    company: { _id: string; name: string };
    user: { _id: string; name: string };
  };
  to: { email: string; role: { _id: string; name: string } };
};

export type User = {
  _id: string;
  email: string;
  name: string;
  invitations: Invitation[];
  phoneNumber?: string;
  integrations: {
    google: { scope: string[]; calendar: { syncedCalendars: string[] } };
  };
};

export const UserProvider = ({ children }) => {
  const { notification } = useContext(NotificationContext);
  const { refreshSocket } = useContext(SocketContext);

  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (user) {
      refreshSocket();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const response = await getUser();

      if ("user" in response) {
        setUser(response.user);
      }
    } catch ({ error }) {
      notification({
        variant: "error",
        title: "Error fetching this user",
        message: error,
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
