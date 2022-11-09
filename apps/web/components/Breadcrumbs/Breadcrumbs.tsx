import { useRef, useEffect } from "react";

import { useRouter } from "next/router";

import { Icon } from "@components/Icon";

import styles from "./Breadcrumbs.module.css";

import type { BreadcrumbProps } from "./types";

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbProps) => {
  const router = useRouter();

  const last = useRef<HTMLDivElement>(null);

  useEffect(() => {
    last.current.scrollTo({
      top: 0,
      left: 10000,
      behavior: "smooth",
    });
  }, [last]);

  return (
    <nav className={styles.bradcrumbContainer} ref={last}>
      <ul className={styles.breadcrumbListContainer}>
        {breadcrumbs?.map(({ text, href, icon }, index) => (
          <li
            key={`${href}-${index}`}
            className={`${styles.breadcrumb} ${
              breadcrumbs.length === 1
                ? styles.single
                : index === 0
                ? styles.first
                : index === breadcrumbs.length - 1
                ? styles.last
                : styles.middle
            } ${href ? styles.link : null}`}
            onClick={() => href && router.push(href)}
          >
            <div className={styles.iconContainer}>
              <Icon icon={icon} size={15} />
            </div>

            {text}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
