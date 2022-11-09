import { useContext, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import NavigationContext from "@contexts/NavigationContext";
import CompanyContext from "@contexts/CompanyContext";

import type { NavigationItem } from "@contexts/NavigationContext";

const CompanyWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);
  const { company, fetchCompany } = useContext(CompanyContext);

  const router = useRouter();

  const rootMenu: NavigationItem[] = useMemo(() => {
    const basePath = router.asPath;

    return [
      {
        title: "Overview",
        href: `${basePath.substring(0, basePath.lastIndexOf("/"))}/overview`,
        icon: "overview",
      },
      {
        title: "Projects",
        href: `${basePath.substring(0, basePath.lastIndexOf("/"))}/projects`,
        icon: "project",
      },
      {
        title: "Clients",
        href: `${basePath.substring(0, basePath.lastIndexOf("/"))}/clients`,
        icon: "client",
      },
      {
        title: "People",
        href: `${basePath.substring(
          0,
          basePath.lastIndexOf("/")
        )}/people?tab=workers`,
        icon: "people",
      },
    ];
  }, [router.asPath, company]);

  useEffect(() => {
    if (navigation !== rootMenu) {
      setNavigation(rootMenu);
    }
  }, [rootMenu]);

  useEffect(() => {
    if (
      !company ||
      (router.query.hasOwnProperty("companyId") &&
        company._id !== router.query.companyId)
    ) {
      fetchCompany();
    }
  }, [router.query.companyId]);

  return <>{children}</>;
};

export default CompanyWrapper;
