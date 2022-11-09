import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { Icon } from "@components/Icon";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import UserContext from "@contexts/UserContext";

import AssigneesSlideout from "./AssigneesSlideout";

import styles from "./AssigneesCard.module.css";

const AssigneesCard = () => {
  const { permissions } = useContext(CompanyContext);
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const openAssigneesSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-project-assignees": true },
    });
  };

  return (
    <>
      <Card
        title="Assignees"
        onEditClick={
          permissions?.projects?.nonAssigned?.edit ||
          (permissions?.projects?.assigned?.edit &&
            project.assignedWorkers.includes(user?._id))
            ? openAssigneesSlideout
            : undefined
        }
      >
        <div className={styles.section}>
          <h4 className={styles.subtiitle}>Workers</h4>
          {project?.assignedWorkers?.length ? (
            <ul>
              {project?.assignedWorkers.map(({ name }) => (
                <li className={styles.assignee}>
                  <div className={styles.workerIcon}>
                    <Icon icon="worker" />
                  </div>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.noData}>No workers to display</div>
          )}
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtiitle}>Teams</h4>
          {project?.assignedTeams?.length ? (
            <ul>
              {project?.assignedTeams.map(({ name }) => (
                <li className={styles.assignee}>{name}</li>
              ))}
            </ul>
          ) : (
            <div className={styles.noData}>No teams to display</div>
          )}
        </div>

        <div className={styles.section}>
          <h4 className={styles.subtiitle}>Companies</h4>
          {project?.assignedCompanies?.length ? (
            <ul>
              {project?.assignedCompanies?.map(({ name }) => (
                <li className={styles.assignee}>
                  <div className={styles.workerIcon}>
                    <Icon icon="clients" />
                  </div>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.noData}>No companies to display</div>
          )}
        </div>
      </Card>

      <AssigneesSlideout />
    </>
  );
};

export default AssigneesCard;
