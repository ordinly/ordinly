import { useContext } from "react";

import { useRouter } from "next/router";

import NotificationContext from "@contexts/NotificationContext";

import { Modal } from "@components/Modal";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { RichTextEditor } from "@components/RichTextEditor";
import { RatingStars } from "@components/RatingStars";
import { Input } from "@components/Input";

import { required } from "@components/Form/validation";

import { reviewCompany } from "@ordinly/api-abstraction";

const AddReviewSlideout = ({ onClose: onCloseProp }) => {
  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["add-new-review"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values) => {
    try {
      await reviewCompany({ companyId: router?.query?.companyId, ...values });

      onCloseProp();

      onClose();
    } catch (caught) {
      const { error = "There was an error adding this review" } = caught || {};

      notification({
        variant: "error",
        title: "Error adding review",
        message: error,
      });
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <Modal
            id="add-review-slideout"
            title="Add new review"
            open={!!router.query["add-new-review"]}
            onClose={onClose}
            actions={[
              {
                text: "Add review",
                onClick: handleSubmit,
                id: "add-review-submit-button",
                type: "submit",
              },
            ]}
          >
            <Field
              name="rating"
              component={RatingStars}
              size={40}
              validate={required}
              id="new-review-rating-input"
            />

            <Field
              name="title"
              title="Title"
              component={Input}
              size={40}
              required
              id="new-review-title-input"
            />

            <Field
              title="Details"
              name="details"
              required
              component={RichTextEditor}
              id="new-review-description-input"
              placeholder="Add review details..."
            />
          </Modal>
        );
      }}
    />
  );
};

export default AddReviewSlideout;
