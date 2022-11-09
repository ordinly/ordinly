import { useContext, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import NavigationContext from "@contexts/NavigationContext";

import type { NavigationItem } from "@contexts/NavigationContext";

const PersonalWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);

  const router = useRouter();

  const rootMenu: NavigationItem[] = useMemo(() => {
    const basePath = router.asPath;

    return [
      {
        title: "Dashboard",
        href: `${basePath.substring(0, basePath.lastIndexOf("/"))}/dashboard`,
        icon: "dashboard",
      },
      {
        title: "Projects",
        href: `${basePath.substring(0, basePath.lastIndexOf("/"))}/projects`,
        icon: "project",
      },
      {
        title: "Account",
        href: `${basePath.substring(0, basePath.lastIndexOf("/"))}/account`,
        icon: "account",
      },
    ];
  }, [router.asPath]);

  useEffect(() => {
    if (navigation !== rootMenu) {
      setNavigation(rootMenu);
    }
  }, [rootMenu]);
  return <>{children}</>;
};

export default PersonalWrapper;
