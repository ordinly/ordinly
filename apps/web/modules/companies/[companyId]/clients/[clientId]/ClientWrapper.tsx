import { useContext, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import NavigationContext from "@contexts/NavigationContext";
import CompanyContext, { CompanyProvider } from "@contexts/CompanyContext";
import ClientContext, { ClientProvider } from "@contexts/ClientContext";

import type { NavigationItem } from "@contexts/NavigationContext";

const ClientWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);
  const { company, fetchCompany, permissions } = useContext(CompanyContext);
  const { client, fetchClient } = useContext(ClientContext);

  const router = useRouter();

  const rootMenu: NavigationItem[] = useMemo(() => {
    const substring = router.asPath.substring(
      0,
      router.asPath.lastIndexOf("/")
    );

    return [
      {
        title: "Client overview",
        href: `${substring}/overview`,
        icon: "overview",
      },
      {
        title: "Projects",
        href: `${substring}/projects`,
        icon: "project",
      },
      {
        title: "Contacts",
        href: `${substring}/contacts`,
        icon: "contacts",
      },
    ];
  }, [router.asPath, permissions]);

  useEffect(() => {
    if (navigation !== rootMenu) {
      setNavigation(rootMenu);
    }
  }, [rootMenu]);

  useEffect(() => {
    (async () => {
      if (
        !company ||
        (router.query.hasOwnProperty("companyId") &&
          company._id !== router.query.companyId)
      ) {
        await fetchCompany();
      }

      if (
        !client ||
        (router.query.hasOwnProperty("clientId") &&
          client._id !== router.query.clientId)
      ) {
        await fetchClient();
      }
    })();
  }, [router.query.companyId, router.query.clientId]);

  return <>{children}</>;
};

export default ClientWrapper;
