import { useEffect } from "react";

import { useRouter } from "next/router";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { NotificationProvider } from "@contexts/NotificationContext";
import { UserProvider } from "@contexts/UserContext";
import { NavigationProvider } from "@contexts/NavigationContext";
import { SettingsProvider } from "@contexts/SettingsContext";
import { WalkthroughProvider } from "@contexts/WalkthroughContext";
import { SocketProvider } from "@contexts/SocketContext";

import { CompanyProvider } from "@contexts/CompanyContext";
import { ProjectProvider } from "@contexts/ProjectContext";
import { ClientProvider } from "@contexts/ClientContext";

import { ChatProvider } from "@contexts/ChatContext";

import { Page } from "@components/Layout";
import { NotificationBar } from "@components/Notification";
import { Launcher } from "@components/Launcher";

import AuthenticationGuard from "@guards/AuthenticationGuard";

import "@theme/globals.css";
import "@theme/colors.css";
import "@theme/fonts.css";
import "@theme/spacing.css";
import "@theme/skeleton.css";

function Ordinly({ Component, pageProps }) {
  const router = useRouter();

  return (
    <NotificationProvider>
      <DndProvider backend={HTML5Backend}>
        <SocketProvider>
          <UserProvider>
            <SettingsProvider>
              <NavigationProvider>
                <AuthenticationGuard />

                <WalkthroughProvider>
                  <NotificationBar />

                  <CompanyProvider>
                    <ProjectProvider>
                      <ClientProvider>
                        <Page
                          withSideNav={
                            !["landing", "marketplace"].includes(
                              router.pathname.split("/")[1]
                            )
                          }
                        >
                          <Component {...pageProps} />
                        </Page>
                      </ClientProvider>
                    </ProjectProvider>
                  </CompanyProvider>

                  {false ? (
                    <ChatProvider>
                      <Launcher />
                    </ChatProvider>
                  ) : null}
                </WalkthroughProvider>
              </NavigationProvider>
            </SettingsProvider>
          </UserProvider>
        </SocketProvider>
      </DndProvider>
    </NotificationProvider>
  );
}

export default Ordinly;
