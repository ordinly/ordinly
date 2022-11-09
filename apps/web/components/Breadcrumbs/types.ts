import type { IconType } from "@components/Icon";

export type Breadcrumb = {
  text: string;
  href?: string | { pathname: string; query: { [key: string]: string } };
  icon: IconType;
};

export type BreadcrumbProps = {
  breadcrumbs: Breadcrumb[];
};
