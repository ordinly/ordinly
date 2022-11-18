import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { verifyAccount } from "@ordinly/api-abstraction";

import { Modal } from "@components/Modal";

const VerificationModal = () => {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (router.query["verification"] && !error && !message) {
      (async () => {
        try {
          const response = await verifyAccount({
            code: `?code=${router.query["verification"] as string}`,
          });

          if ("error" in response) {
            setError(response.error);
          } else {
            setMessage(response.message);
          }
        } catch (caught) {
          setMessage(
            "There was an error when trying to verify your account using this verification code"
          );
        }
      })();
    }
  }, [router.query["verification"], error, message]);

  const onNavigateToLogin = () => {
    router.replace({ pathname: router.pathname, query: { login: true } });
  };

  const onClose = () => {
    router.replace({ pathname: router.pathname, query: {} });
  };

  return (
    <Modal
      id="verification-modal"
      title="Account Verification"
      open={!!router?.query["verification"]}
      actions={[
        ...(message
          ? [{ text: "Go to login", onClick: onNavigateToLogin }]
          : []),
      ]}
      {...(error ? { onClose: onClose, closeText: "Close" } : {})}
    >
      {message ? <h3>{message}</h3> : null}

      {error ? <h3>{error}</h3> : null}
    </Modal>
  );
};

export default VerificationModal;
