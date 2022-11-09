import { useContext } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { Info } from "@components/Info";

import ProjectContext from "@contexts/ProjectContext";

import formatDate from "@util/formatDate";

import DetailsSlideout from "./DetailsSlideout";

const DetailsCard = () => {
  const { project } = useContext(ProjectContext);

  const router = useRouter();

  return (
    <>
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
    </>
  );
};

export default DetailsCard;
