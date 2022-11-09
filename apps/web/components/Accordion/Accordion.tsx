import { useState } from "react";

import { AccordionItem } from "./AccordionItem";

import type { AccordionProps } from "./types";

const Accordion = ({ id, items }: AccordionProps) => {
  const [openIds, setOpenIds] = useState([]);

  const onOpen = ({ id: newOpenId }) => {
    setOpenIds([...openIds, newOpenId]);
  };

  const onClose = ({ id: newOpenId }) => {
    setOpenIds(openIds.filter((current) => current !== newOpenId));
  };

  return (
    <ul>
      {items?.map(({ id, title, disabled, children, noContent }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          disabled={disabled}
          children={children}
          open={openIds.includes(id)}
          onOpen={onOpen}
          onClose={onClose}
          noContent={noContent}
        />
      ))}
    </ul>
  );
};

export default Accordion;
