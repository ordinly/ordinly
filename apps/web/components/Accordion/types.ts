import React from "react";

export type AccordionItem = {
  id: string;
  title: React.ReactNode;
  disabled?: boolean;
  children?: any;
  noContent?: boolean;
};

export type AccordionProps = {
  id: string;
  items: AccordionItem[];
};
