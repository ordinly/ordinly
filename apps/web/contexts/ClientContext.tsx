import { useState, createContext, useContext, useMemo } from "react";

import { useRouter } from "next/router";

import NotificationContext from "@contexts/NotificationContext";

import { getClient } from "@ordinly/api-abstraction";

import type { Client } from "@ordinly/api-abstraction";

const ClientContext = createContext<{
  client: any;
  fetchClient: () => void;
}>(null);

export default ClientContext;

export const ClientProvider = ({ children }) => {
  const { notification } = useContext(NotificationContext);

  const [client, setClient] = useState<Client>(null);

  const router = useRouter();

  const fetchClient = async () => {
    try {
      if (router.query.companyId && router.query.clientId) {
        const response = await getClient({
          companyId: router.query.companyId as string,
          clientId: router.query.clientId as string,
        });

        if ("client" in response) {
          setClient(response.client);
        }
      }
    } catch ({ error }) {
      notification({
        variant: "error",
        title: "Error fetching this client",
        message: error,
      });
    }
  };

  return (
    <ClientContext.Provider value={{ client, fetchClient }}>
      {children}
    </ClientContext.Provider>
  );
};
