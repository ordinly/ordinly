import { useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { Button } from "@components/Button";

import GoogleLogo from "@assets/GoogleLogo.svg";

import UserContext from "@contexts/UserContext";

import {
  connectGoogleAccount,
  updateGoogleTokens,
} from "@ordinly/api-abstraction/users";

import UpdateGoogleCalendarConfigSlideout from "./UpdateGoogleCalendarConfigSlideout.ts";

const ConnectGoogleAccountButton = ({
  scope,
}: {
  scope: string | string[];
}) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const getAuthURL = async () => {
    const { url } = await connectGoogleAccount({ scope });

    if (url) {
      localStorage.setItem("url", router.asPath.split("?")[0]);

      window.location.href = url;
    }
  };

  const openUpdateGoogleCalendarConfigSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-calendar-config": true },
    });
  };

  useEffect(() => {
    (async () => {
      if (router.query["code"] && router.query["scope"]) {
        await updateGoogleTokens({
          code: router.query["code"] as string,
          scope: router.query["scope"],
        });
      }
    })();
  }, []);

  return (
    <div>
      <Button
        text={
          user?.integrations?.google?.calendar
            ? "Manage configuration"
            : "Connect with Google"
        }
        onClick={
          user?.integrations?.google
            ? openUpdateGoogleCalendarConfigSlideout
            : getAuthURL
        }
        variant="outline"
        icon={GoogleLogo}
      />

      <UpdateGoogleCalendarConfigSlideout />
    </div>
  );
};

export default ConnectGoogleAccountButton;
