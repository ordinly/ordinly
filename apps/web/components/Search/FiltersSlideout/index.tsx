import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";

const FiltersSlideout = ({ filters, open, onClose, onSubmit }) => {
  const router = useRouter();

  const onApplyFilters = (values) => {
    onSubmit({
      filters: Object.fromEntries(
        Object.entries(values).map(([key, value]: [string, string[]]) => [
          key,
          typeof value === "string"
            ? value
            : value.reduce(
                (total, current, index) =>
                  `${total}${index ? "," : ""}${current}`,
                ""
              ),
        ])
      ),
    });
  };

  return (
    <Form
      initialValues={Object.entries(router.query).reduce(
        (total, [key, value]: [string, string]) =>
          ["page", "pageSize", "searchTerm"].includes(key)
            ? total
            : {
                ...total,
                [key]: value.includes(",") ? value.split(",") : value,
              },
        {}
      )}
      onSubmit={onApplyFilters}
      render={({ handleSubmit }) => {
        return (
          <Slideout
            title="Filters"
            id="filters-slideout"
            open={open}
            onClose={onClose}
            actions={[{ text: "Apply", onClick: handleSubmit }]}
          >
            {filters.map((field, index) => (
              <Field id={`filters-slideout-${index}`} {...field} />
            ))}
          </Slideout>
        );
      }}
    />
  );
};

export default FiltersSlideout;
