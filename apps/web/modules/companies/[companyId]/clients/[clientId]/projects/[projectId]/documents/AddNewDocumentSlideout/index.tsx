import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import ProjectContext from "@contexts/ProjectContext";
import ClientContext from "@contexts/ClientContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Select } from "@components/Select";

import { getCountries, getRegions, getCities } from "@ordinly/api-abstraction";
import { createInvoice, createQuote } from "@ordinly/api-abstraction";

import InvoiceForm from "./Forms/InvoiceForm";
import QuoteForm from "./Forms/QuoteForm";

import { required } from "@components/Form/validation";

const submitFunctionMapping = {
  invoice: createInvoice,
  quote: createQuote,
};

const AddNewDocumentSlideout = () => {
  const { fetchProject } = useContext(ProjectContext);
  const { client } = useContext(ClientContext);
  const { notification } = useContext(NotificationContext);

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      const countriesResponse = await getCountries();

      if (!("error" in countriesResponse)) {
        setCountries(countriesResponse.countries);

        if (client?.address?.country) {
          const regionsResponse = await getRegions({
            countryId: client?.address?.country,
          });

          setRegions(regionsResponse.regions);
        }
      }
    })();
  }, [client]);

  const router = useRouter();

  const onSubmit = async (values, form) => {
    try {
      await submitFunctionMapping[values.type]({
        projectId: router.query["projectId"],
        clientId: router.query["clientId"],
        companyId: router.query["companyId"],
        ...values,
      });

      await fetchProject();

      onClose(form);
    } catch (caught) {
      const { error = "There was an error adding this document" } = caught;

      notification({
        variant: "error",
        title: "Error adding document",
        message: error,
      });
    }
  };

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["add-document"];
    delete temp["tab"];

    router.push({ pathname: router.pathname, query: temp });

    form.restart();
  };

  return (
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        const onChangeCountry = async (newCountry) => {
          const response = await getRegions({
            countryId: newCountry,
          });

          if (!("error" in response)) {
            setRegions(response.regions);

            form.change("region", client?.address?.region);
          }
        };

        const onChangeRegion = async (newRegion) => {
          const response = await getCities({
            regionId: newRegion,
            countryId: form.getFieldState("address.country").value,
          });

          if (!("error" in response)) {
            setCities(response.cities);
          }
        };

        const formProps = {
          form,
          client,
          countries,
          regions,
          cities,
          onChangeCountry,
          onChangeRegion,
        };

        return (
          <Slideout
            id="add-document-slideout"
            title="Add document"
            open={!!router.query["add-document"]}
            onClose={() => onClose(form)}
            dirty={form.getState().dirty}
            actions={[
              {
                text: "Add document",
                icon: "add",
                onClick: handleSubmit,
                type: "submit",
              },
            ]}
          >
            <Field
              title="Document type"
              name="type"
              component={Select}
              options={[
                { label: "Invoice", value: "invoice" },
                { label: "Quote", value: "quote" },
              ]}
              validate={required}
              id="add-document-type-select"
            />

            {form.getFieldState("type")?.value === "invoice" && (
              <InvoiceForm {...formProps} />
            )}

            {form.getFieldState("type")?.value === "quote" && (
              <QuoteForm {...formProps} />
            )}
          </Slideout>
        );
      }}
    />
  );
};

export default AddNewDocumentSlideout;
