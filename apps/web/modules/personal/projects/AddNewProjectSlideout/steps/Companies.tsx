import { searchCompanies } from "@ordinly/api-abstraction/companies";

import { Field } from "@components/Field";
import { SearchSelect } from "@components/SearchSelect";

const CompaniesStep = () => {
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
      />
    </>
  );
};

export default CompaniesStep;
