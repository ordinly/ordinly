import { useRouter } from "next/router";

import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();

  const onChangeTab = (tab) => {
    if (router.query["tab"] !== tab) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tab },
      });
    }
  };

  return (
    <header className={styles.container}>
      <ul className={styles.menu}>
        <li
          className={`${styles.item} ${
            router.query["tab"] === "about" ? styles.active : ""
          }`}
          onClick={() => onChangeTab("about")}
        >
          About
        </li>

        <li
          className={`${styles.item} ${
            router.query["tab"] === "pricing" ? styles.active : ""
          }`}
          onClick={() => onChangeTab("pricing")}
        >
          Pricing
        </li>
      </ul>
    </header>
  );
};

export default Header;
