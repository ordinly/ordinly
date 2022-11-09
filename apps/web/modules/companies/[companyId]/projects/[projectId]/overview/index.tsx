import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { Info } from "@components/Info";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";

import formatDate from "@util/formatDate";

import DetailsSlideout from "./DetailsSlideout";

const DetailsCard = () => {
  const { company } = useContext(CompanyContext);
  const { project } = useContext(ProjectContext);

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
          company?._id === project?.owner?.companyId
            ? openDetailsSlideout
            : undefined
        }
      >
        {project ? (
          <Info
            data={{
              Name: project?.name,
              Description: {
                value: project?.description,
                component: "RichTextEditor",
              },
              Priority: project?.priority,
              Status: project?.status,
              "Start date": formatDate(new Date(project?.startDate)),
              "Due date": project.dueDate
                ? formatDate(new Date(project.dueDate))
                : null,
            }}
          />
        ) : null}
      </Card>

      <DetailsSlideout />
    </>
  );
};

export default DetailsCard;
