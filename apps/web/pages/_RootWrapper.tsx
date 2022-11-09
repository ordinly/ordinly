import { useContext, useEffect } from "react";

import NavigationContext from "@contexts/NavigationContext";

import type { IconType } from "@components/Icon";

const rootMenu = [
  { title: "Dashboard", href: "/dashboard", icon: "dashboard" as IconType },
  { title: "My work", href: "/my-work", icon: "work" as IconType },
  { title: "Account", href: "/account", icon: "account" as IconType },
];

const RootWrapper = ({ children }) => {
  const { navigation, setNavigation } = useContext(NavigationContext);

  useEffect(() => {
    if (navigation !== rootMenu) {
      setNavigation(rootMenu);
    }
  }, []);
  return <>{children}</>;
};

export default RootWrapper;
