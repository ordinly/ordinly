import { useContext } from "react";

import WalkthroughContext from "@contexts/WalkthroughContext";

import { Button } from "@components/Button";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import { ViewToggle } from "@components/ViewToggle";

import styles from "./PageContent.module.css";

import type { ButtonProps } from "@components/Button";
import type { IconType } from "@components/Icon";

const PageContent = ({
  title,
  subtitle,
  children,
  breadcrumbs,
  hasViewToggle = false,
  actions,
  loading,
}: {
  title: string;
  subtitle: string;
  children: any;
  breadcrumbs: {
    text: string;
    icon: IconType;
    href?:
      | {
          pathname: string;
          query: any;
        }
      | string;
  }[];
  hasViewToggle?: boolean;
  actions?: ButtonProps[];
  loading?: boolean;
}) => {
  const { walkthroughs } = useContext(WalkthroughContext);
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        {breadcrumbs?.length ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null}
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>

        <h3 className={styles.subtitle}>{subtitle}</h3>
      </div>

      <div className={styles.actions}>
        {hasViewToggle && <ViewToggle />}

        {actions?.map((action, index) => (
          <div>
            <Button
              key={`${action.id}-${index}`}
              wrap={false}
              fluid={false}
              {...action}
            />
          </div>
        ))}
      </div>

      {/**
      <div className={styles.walkthrough}>
        {walkthroughs?.length ? <WalkthroughButton /> : null}
      </div>
    */}

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageContent;
