import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import UserContext from "@contexts/UserContext";
import NotificationContext from "@contexts/NotificationContext";

import { persistentLogin } from "@ordinly/api-abstraction/users";

const AuthenticationGuard = () => {
  const { user, setUser } = useContext(UserContext);
  const { notification } = useContext(NotificationContext);

  const [fetched, setFetched] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!user && !fetched) {
        try {
          const { user: newUser } = await persistentLogin();

          setUser(newUser);

          setFetched(true);
        } catch (caught) {
          console.log(caught);

          if (
            !router.pathname.includes("/marketplace") &&
            !router.pathname.includes("/landing") &&
            !router.pathname.includes("/features") &&
            !router.pathname.includes("/pricing")
          ) {
            setUser(null);

            notification({
              variant: "warning",
              title: "Session expired",
              message: "You've been logged out, please log in to continue",
            });

            router.replace({ pathname: "/landing", query: { form: "login" } });
          }

          setFetched(true);
        }
      }
    })();
  }, [user, fetched, router.pathname]);

  return <></>;
};

export default AuthenticationGuard;
