import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import NotificationContext from "@contexts/NotificationContext";

import { Modal } from "@components/Modal";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { RichTextEditor } from "@components/RichTextEditor";
import { RatingStars } from "@components/RatingStars";
import { Input } from "@components/Input";

import { required } from "@components/Form/validation";

import {
  getCompanyReview,
  updateCompanyReview,
  deleteCompanyReview,
} from "@ordinly/api-abstraction";

const UpdateReviewSlideout = ({ onClose: onCloseProp }) => {
  const [review, setReview] = useState<any>();

  const { notification } = useContext(NotificationContext);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { review: newReview } = await getCompanyReview({
        reviewId: router.query["review-id"] as string,
        companyId: router.query["companyId"] as string,
      });

      setReview(newReview);
    })();
  }, [router.query["review-id"]]);

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["update-review"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onSubmit = async (values) => {
    try {
      await updateCompanyReview({
        companyId: router?.query?.companyId,
        reviewId: router.query["review-id"],
        ...values,
      });

      onCloseProp();

      onClose();
    } catch (caught) {
      const { error = "There was an error editing this review" } = caught || {};

      notification({
        variant: "error",
        title: "Error editing review",
        message: error,
      });
    }
  };

  const onDeleteReview = async () => {
    await deleteCompanyReview({
      companyId: router.query["companyId"] as string,
      reviewId: router.query["review-id"] as string,
    });

    onCloseProp();

    onClose();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <Modal
            id="edit-review-slideout"
            title="Update review"
            open={!!router.query["update-review"]}
            onClose={onClose}
            actions={[
              {
                text: "Delete review",
                onClick: onDeleteReview,
                id: "edit-review-submit-button",
                variant: "danger",
              },
              {
                text: "Update review",
                onClick: handleSubmit,
                id: "edit-review-submit-button",
              },
            ]}
          >
            <Field
              name="rating"
              initialValue={review?.rating}
              component={RatingStars}
              size={40}
              validate={required}
              id="new-review-rating-input"
            />

            <Field
              name="title"
              title="Title"
              component={Input}
              initialValue={review?.title}
              size={40}
              required
              id="new-review-title-input"
            />

            <Field
              name="details"
              title="Details"
              initialValue={review?.details}
              component={RichTextEditor}
              required
              validate={required}
              id="new-review-description-input"
              placeholder="Add review details..."
            />
          </Modal>
        );
      }}
    />
  );
};

export default UpdateReviewSlideout;
