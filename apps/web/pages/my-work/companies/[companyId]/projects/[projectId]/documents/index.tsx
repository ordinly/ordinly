import { useContext } from "react";

import { useRouter } from "next/router";

import ProjectWrapper from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/CompanyClientProjectWrapper";

import ProjectContext from "@contexts/ProjectContext";
import CompanyContext from "@contexts/CompanyContext";
import { TableCell } from "@components/Table";
import { DocumentTile } from "@components/Tile";

import MultiEntityPage from "@modules/common/MultiEntityPage";
import AddNewDocumentSlideout from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/documents/AddNewDocumentSlideout";
import UpdateInvoiceSlideout from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/documents/UpdateInvoiceSlideout";
import UpdateQuoteSlideout from "@modules/companies/[companyId]/clients/[clientId]/projects/[projectId]/documents/UpdateQuoteSlideout";

const columns = [
  {
    title: "Kind",
    dataKey: "kind",
  },
  {
    title: "Number",
    dataKey: "number",
  },
  {
    title: "Total",
    dataKey: "total",
    display: ({ data }) => <TableCell>{`$${data}`}</TableCell>,
  },
  {
    title: "Issue date",
    dataKey: "issueDate",
  },
  {
    title: "Due date",
    dataKey: "dueDate",
  },
];

const Wrapped = () => (
  <ProjectWrapper>
    <Documents />
  </ProjectWrapper>
);

const Documents = () => {
  const { company } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);

  const router = useRouter();

  const onOpenAddNew = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "add-document": true,
      },
    });
  };

  const fetchData = async () => {
    await fetchProject();
  };

  return (
    <>
      <MultiEntityPage
        title="Documents"
        icon="document"
        subtitle={`All of the generated documents like invoices and quotes`}
        breadcrumbs={[
          {
            text: `${company?.name}`,
            icon: "company",
          },
          {
            text: project?.name,
            icon: "project",
            href: `/my-work/companies/${company?._id}/projects`,
          },
          {
            text: "Documents",
            icon: "document",
          },
        ]}
        columns={columns}
        fetchData={fetchData}
        entities={project?.documents?.map((document) => ({
          ...document,
          onClick: () => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                ...(document.kind === "Invoice"
                  ? { "update-invoice": true, "invoice-id": document?._id }
                  : { "update-quote": true, "quote-id": document?._id }),
              },
            });
          },
        }))}
        tile={DocumentTile}
      />

      <AddNewDocumentSlideout />

      <UpdateInvoiceSlideout />
      <UpdateQuoteSlideout />
    </>
  );
};

export default Wrapped;
