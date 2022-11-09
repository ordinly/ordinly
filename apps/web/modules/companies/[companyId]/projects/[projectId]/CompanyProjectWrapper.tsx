import { useContext, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import NavigationContext from "@contexts/NavigationContext";
import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";

import type { NavigationItem } from "@contexts/NavigationContext";

const CompanyProjectWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);
  const { company, fetchCompany } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);

  const router = useRouter();

  const rootMenu: NavigationItem[] = useMemo(() => {
    const substring = router.asPath.substring(
      0,
      router.asPath.lastIndexOf("/")
    );

    return [
      {
        title: "Overview",
        href: `${substring}/overview`,
        icon: "overview",
      },
      {
        title: "Tasks",
        href: `${substring}/tasks`,
        icon: "task",
      },
      /** 
      { title: "Documents", href: `${substring}/documents`, icon: "document" },
      */
      {
        title: "Companies",
        href: `${substring}/companies`,
        icon: "company",
      },
    ];
  }, [router.asPath, project]);

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
        !project ||
        (router.query.projectId && project._id !== router.query.projectId)
      ) {
        await fetchProject();
      }
    })();
  }, [router.query.companyId, router.query.projectId]);

  return <>{children}</>;
};

export default CompanyProjectWrapper;
