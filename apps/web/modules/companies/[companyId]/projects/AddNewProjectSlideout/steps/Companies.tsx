import { useRouter } from "next/router";

import { searchCompanies } from "@ordinly/api-abstraction";

import { Field } from "@components/Field";
import { SearchSelect } from "@components/SearchSelect";

const CompaniesStep = () => {
  const router = useRouter();

  return (
    <>
      <Field
        title="Search for companies to invite"
        name="invitations"
        multi
        component={SearchSelect}
        id="new-project-invitations-select"
        onFetchData={searchCompanies}
        entity="companies"
        exclude={[router.query.companyId]}
      />
    </>
  );
};

export default CompaniesStep;
