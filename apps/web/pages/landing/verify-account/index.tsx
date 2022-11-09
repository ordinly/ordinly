import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import { verifyAccount } from "@ordinly/api-abstraction/users";

import { Button } from "@components/Button";

import styles from "./VerifyAccount.module.css";

const VerifyAccount = () => {
  const router = useRouter();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (location.search) {
      (async () => {
        try {
          const response = await verifyAccount({
            code: location.search,
          });

          if ("error" in response) {
            setMessage(response.error);
          } else {
            setMessage(response.message);
          }
        } catch (caught) {}
      })();
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Verify account</title>
      </Head>

      {message ? <h1>{message}</h1> : null}

      <div>
        <Button
          text="Go to log in page"
          onClick={() =>
            router.push({ pathname: "/landing", query: { form: "login" } })
          }
        />
      </div>
    </div>
  );
};

export default VerifyAccount;
