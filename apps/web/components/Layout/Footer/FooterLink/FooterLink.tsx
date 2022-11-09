import { useRouter } from "next/router";

import { Icon } from "@components/Icon";

import styles from "./FooterLink.module.css";

import type { FooterLinkProps } from "./types";

const FooterLink = ({ href, title, icon, onClick }: FooterLinkProps) => {
  const router = useRouter();

  const onLinkClick = () => {
    router.push(href);
  };

  const active = href === router.asPath;

  return (
    <li
      className={`${styles.item} ${active ? styles.active : ""}`}
      onClick={href ? onLinkClick : onClick}
    >
      <Icon icon={icon} />

      <span className={styles.title}> {title}</span>
    </li>
  );
};

export default FooterLink;
