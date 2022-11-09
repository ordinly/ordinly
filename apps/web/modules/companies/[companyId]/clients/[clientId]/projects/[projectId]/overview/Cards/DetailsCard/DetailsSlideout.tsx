import { useContext, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { updateProjectDetails } from "@ordinly/api-abstraction/companies";

import DeleteProjectModal from "./DeleteProjectModal";

import GeneralDetailsTab from "./tabs/GeneralDetails";

const DetailsSlideout = () => {
  const { company } = useContext(CompanyContext);
  const { project, fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);

  const details = useMemo(() => project, [project]);

  const router = useRouter();

  const closeSlideout = () => {
    const temp = router.query;

    delete temp["update-project-details"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const openDeleteProjectModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "delete-project": true },
    });
  };

  const onSave = async (values) => {
    try {
      setSaving(true);

      const response = await updateProjectDetails({
        ...values,
        projectId: project._id,
        companyId: company._id,
      });

      if ("error" in response) {
        throw response;
      } else {
        await fetchProject();

        router.replace(router.asPath);
      }
    } catch (caught) {
      const { error = "There was an error updating this project" } = caught;

      notification({
        variant: "error",
        title: "Error updating this project",
        message: error,
      });
    }

    setSaving(false);
  };

  return (
    <Form
      onSubmit={onSave}
      initialValues={details}
      render={({ form, handleSubmit }) => {
        return (
          <>
            <Slideout
              id="update-project-details-slideout"
              title="Update project details"
              open={router?.query?.hasOwnProperty("update-project-details")}
              onClose={closeSlideout}
              saving={saving}
              dirty={form.getState().dirty}
              tabs={[
                {
                  id: "details-tab",
                  text: "General details",
                  content: <GeneralDetailsTab />,
                  error: form.getState().errors.name,
                },
              ]}
              actions={[
                {
                  id: "remove-project-button",
                  text: "Remove project",
                  variant: "danger",
                  onClick: openDeleteProjectModal,
                },
                {
                  id: "update-project-submit-button",
                  text: "Save",
                  onClick: handleSubmit,
                  type: "submit",
                },
              ]}
            />

            <DeleteProjectModal />
          </>
        );
      }}
    />
  );
};

export default DetailsSlideout;
