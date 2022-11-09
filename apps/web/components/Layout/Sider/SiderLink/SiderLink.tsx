import { useRouter } from "next/router";

import { Icon } from "@components/Icon";

import styles from "./SiderLink.module.css";

const SiderLink = ({ href, title, icon }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  const path = href.includes("?") ? href.substring(0, href.indexOf("?")) : href;

  const active =
    path ===
    (router.asPath.includes("?")
      ? router.asPath.substring(0, router.asPath.indexOf("?"))
      : router.asPath);

  return (
    <li
      key={title}
      className={`${styles.item} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <Icon icon={icon} />

      <span className={styles.title}> {title}</span>
    </li>
  );
};

export default SiderLink;
