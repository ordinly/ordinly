import { useState, createContext, useContext, useEffect } from "react";

import { useRouter } from "next/router";

import NotificationContext from "@contexts/NotificationContext";
import SocketContext from "@contexts/SocketContext";
import UserContext from "@contexts/UserContext";

import { getProject } from "@ordinly/api-abstraction/companies";
import { getCompanyProject } from "@ordinly/api-abstraction/companies";

import { getUserProject } from "@ordinly/api-abstraction/users";

import type { Project } from "@ordinly/api-abstraction/companies";

const ProjectContext = createContext<{
  project: any;
  fetchProject: () => void;
}>(null);

export default ProjectContext;

export const ProjectProvider = ({ children }) => {
  const { notification } = useContext(NotificationContext);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);

  const [project, setProject] = useState<Project>(null);

  const router = useRouter();

  const fetchProject = async () => {
    try {
      if (router.pathname.split("/")[2] === "personal") {
        const response = await getUserProject({
          projectId: router.query.projectId,
        });

        if ("project" in response) {
          setProject(response.project);
        }
      } else {
        if (router.query.companyId && router.query.projectId) {
          const response =
            router.pathname.split("/")[2] === "companies"
              ? await getCompanyProject({
                  companyId: router.query.companyId,
                  projectId: router.query.projectId,
                })
              : await getProject({
                  companyId: router.query.companyId,
                  clientId: router.query.clientId,
                  projectId: router.query.projectId,
                });

          if ("project" in response) {
            setProject(response.project);
          }
        }
      }
    } catch (caught) {
      const { error } = caught;

      console.error(caught);
      notification({
        variant: "error",
        title: "Error fetching this project",
        message: error,
      });
    }
  };

  useEffect(() => {
    if (socket && router?.query?.projectId) {
      socket.emit("subscribe-to-user-project", {
        projectId: router.query.projectId,
      });
    }
  }, [socket, router.query.projectId]);

  useEffect(() => {
    if (socket) {
      socket?.on("update-user-project", fetchProject);

      return () => {
        socket?.off("update-user-project", fetchProject);
      };
    }
  }, [socket]);

  return (
    <ProjectContext.Provider value={{ project, fetchProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
