import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import UserContext from "@contexts/UserContext";

import DetailsSlideout from "./DetailsSlideout";

import styles from "./DetailsCard.module.css";

const DetailsCard = () => {
  const { permissions } = useContext(CompanyContext);
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const openDetailsSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        "update-project-details": true,
        tab: "details-tab",
      },
    });
  };

  return (
    <>
      <Card
        title="Project details"
        onEditClick={
          permissions?.projects?.nonAssigned?.edit ||
          (permissions?.projects?.assigned?.edit &&
            project.assignedWorkers.includes(user?._id))
            ? openDetailsSlideout
            : undefined
        }
      >
        <div className={styles.info}>
          <p className={`${styles.text} ${styles.bold}`}>Name: </p>
          <p className={styles.text}>{project?.name}</p>
        </div>

        {project?.description && (
          <div className={styles.info}>
            <p className={`${styles.text} ${styles.bold}`}>Description: </p>
            <p className={styles.text}>{project?.description}</p>
          </div>
        )}

        <div className={styles.info}>
          <p className={`${styles.text} ${styles.bold}`}>Owner: </p>
          <p className={styles.text}>{project?.owner.name}</p>
        </div>

        {project?.priority && (
          <div className={styles.info}>
            <p className={`${styles.text} ${styles.bold}`}>Priority: </p>
            <p className={styles.text}>{project?.priority}</p>
          </div>
        )}

        {project?.status && (
          <div className={styles.info}>
            <p className={`${styles.text} ${styles.bold}`}>Status: </p>
            <p className={styles.text}>{project?.status}</p>
          </div>
        )}

        <div className={styles.info}>
          <p className={`${styles.text} ${styles.bold}`}>Start date: </p>
          <p className={styles.text}>{project?.startDate}</p>
        </div>

        {project?.dueDate && (
          <div className={styles.info}>
            <p className={`${styles.text} ${styles.bold}`}>Due date: </p>
            <p className={styles.text}>{project?.dueDate}</p>
          </div>
        )}
      </Card>

      <DetailsSlideout />
    </>
  );
};

export default DetailsCard;
