import { useRouter } from "next/router";

import { Modal } from "@components/Modal";

const MustBeLoggedInModal = () => {
  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["must-be-logged-in"];

    router.push({ pathname: router.pathname, query: temp });
  };

  return (
    <Modal
      id="must-be-logged-in-slideout"
      title="Must be logged in"
      open={!!router.query["must-be-logged-in"]}
      onClose={onClose}
      actions={[
        {
          text: "Log in / Sign up",
          onClick: () => router.replace("/landing"),
          id: "must-be-logged-in-submit-button",
          type: "submit",
        },
      ]}
    >
      <p>You must be logged in before you can do that.</p>

      <p>
        It's super quick and easy, just click the button below to either log in
        or sign up
      </p>
    </Modal>
  );
};

export default MustBeLoggedInModal;
