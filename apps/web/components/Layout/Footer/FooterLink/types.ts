import type { IconType } from "@components/Icon";

export type FooterLinkProps = {
  title: string;
  icon: IconType;
  onClick?: () => void;
  href?: string;
  key?: string;
};
