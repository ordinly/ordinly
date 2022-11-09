import { useContext, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import NavigationContext from "@contexts/NavigationContext";
import ProjectContext from "@contexts/ProjectContext";

import type { NavigationItem } from "@contexts/NavigationContext";

const UserProjectWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);
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
      {
        title: "Companies",
        href: `${substring}/companies`,
        icon: "company",
      },
      /** 
      {
        title: "Documents",
        href: `${substring}/documents`,
        icon: "document",
      },
      */
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
        !project ||
        (router.query.hasOwnProperty("projectId") &&
          project._id !== router.query.projectId)
      ) {
        await fetchProject();
      }
    })();
  }, [router.asPath]);

  return <>{children}</>;
};

export default UserProjectWrapper;
