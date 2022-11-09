import { useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import NavigationContext from "@contexts/NavigationContext";
import CompanyContext, { CompanyProvider } from "@contexts/CompanyContext";
import ClientContext, { ClientProvider } from "@contexts/ClientContext";
import ProjectContext, { ProjectProvider } from "@contexts/ProjectContext";

import type { NavigationItem } from "@contexts/NavigationContext";

const CompanyClientProjectWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);
  const { company, fetchCompany } = useContext(CompanyContext);
  const { client, fetchClient } = useContext(ClientContext);
  const { project, fetchProject } = useContext(ProjectContext);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const rootMenu: NavigationItem[] = useMemo(() => {
    const substring = router.asPath.substring(
      0,
      router.asPath.lastIndexOf("/")
    );

    return [
      {
        title: "Project overview",
        href: `${substring}/overview`,
        icon: "overview",
      },
      {
        title: "Tasks",
        href: `${substring}/tasks`,
        icon: "task",
      },
      { title: "Documents", href: `${substring}/documents`, icon: "document" },
    ];
  }, [router.asPath]);

  useEffect(() => {
    if (navigation !== rootMenu) {
      setNavigation(rootMenu);
    }
  }, [rootMenu]);

  useEffect(() => {
    (async () => {
      if (
        !company ||
        (router.query.companyId && company._id !== router.query.companyId)
      ) {
        await fetchCompany();
      }

      if (
        !client ||
        (router.query.clientId && client._id !== router.query.clientId)
      ) {
        await fetchClient();
      }

      if (
        !project ||
        (router.query.projectId && project._id !== router.query.projectId)
      ) {
        await fetchProject();
      }
    })();
  }, [router.query.projectId, router.query.clientId, router.query.companyId]);

  return <>{children}</>;
};

export default CompanyClientProjectWrapper;
