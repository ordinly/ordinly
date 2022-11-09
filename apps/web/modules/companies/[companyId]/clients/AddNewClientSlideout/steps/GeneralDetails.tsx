import { useContext } from "react";

import { useRouter } from "next/router";

import { searchCompanies } from "@ordinly/api-abstraction/companies";

import CompanyContext from "@contexts/CompanyContext";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { RichTextEditor } from "@components/RichTextEditor";
import { Radio } from "@components/Radio";
import { SearchSelect } from "@components/SearchSelect";

const GeneralDetailsStep = ({ form }) => {
  const router = useRouter();

  const { company } = useContext(CompanyContext);

  return (
    <>
      <Field
        name="addNew"
        component={Radio}
        initialValue="new"
        options={[
          {
            id: "new-client-new-switcher-new",
            text: "Add new",
            value: "new",
          },
          {
            id: "new-client-new-switcher-search",
            text: "Find a company on Ordinly",
            value: "company",
          },
        ]}
        id="new-client-add-new-switcher"
      />

      {form?.getFieldState("addNew")?.value === "new" ? (
        <Field
          title="Name"
          name="name"
          required
          component={Input}
          id="new-client-name-input"
        />
      ) : (
        <Field
          title="Company"
          name="company"
          required
          component={SearchSelect}
          id="new-client-company-select"
          onFetchData={searchCompanies}
          entity="companies"
          exclude={[
            router.query.companyId,
            ...((company?.clients || []) as any).reduce(
              (total, { companyId }) =>
                companyId ? [...total, companyId] : total,
              []
            ),
          ]}
        />
      )}

      <Field
        title="Description"
        name="description"
        component={RichTextEditor}
        id="new-client-description-input"
      />

      {form?.getFieldState("addNew")?.value === "new" ? (
        <Field
          title="Street address"
          name="address.streetAddress"
          component={Input}
          id="new-client-address-input"
        />
      ) : null}
    </>
  );
};

export default GeneralDetailsStep;
