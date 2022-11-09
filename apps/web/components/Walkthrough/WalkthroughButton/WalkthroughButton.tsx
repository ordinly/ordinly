import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import WalkthroughContext from "@contexts/WalkthroughContext";

import { Button, ButtonWithMenu } from "@components/Button";
import { Walkthrough } from "@components/Walkthrough";

import styles from "./WalkthroughButton.module.css";

const WalkthroughButton = () => {
  const { walkthroughs } = useContext(WalkthroughContext);
  const [active, setActive] = useState(null);

  const router = useRouter();

  const onClose = () => {
    const temp = router.query;
    delete temp["walkthrough"];
    delete temp["step"];

    setActive(null);

    router.replace({ pathname: "", query: temp });
  };

  useEffect(() => {
    if (walkthroughs && router.query["walkthrough"]) {
      setActive(
        walkthroughs.find(({ id }) => id === router.query["walkthrough"])
          ?.walkthrough
      );
    }
  }, [router]);

  return (
    <>
      <ButtonWithMenu
        icon="info"
        onClick={() => {}}
        htmlTitle="Walkthroughs"
        menu={() => {
          return (
            <div className={styles.container}>
              {walkthroughs?.map(({ id, text }, index) => (
                <Button
                  id={id}
                  key={`${text}-${index}`}
                  text={text}
                  onClick={() =>
                    router.replace({
                      query: {
                        ...router.query,
                        walkthrough: id,
                      },
                    })
                  }
                  variant="ghost"
                />
              ))}
            </div>
          );
        }}
        buttonId="walkthrough-button"
        menuId="walkthrough-menu"
      />

      {active ? <Walkthrough onClose={onClose} walkthrough={active} /> : null}
    </>
  );
};

export default WalkthroughButton;
