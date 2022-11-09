import React, { useState } from "react";

import { Menu } from "../../../components/Menu";
import Button from "../Button";

import type { ButtonWithMenuProps } from "./types";

const ButtonWithMenu = ({
  buttonId,
  menuId,
  menu,
  fluid,
  ...rest
}: ButtonWithMenuProps) => {
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button {...rest} onClick={openMenu} id={buttonId} />

      {open ? (
        <Menu onClose={closeMenu} id={menuId} mountId={buttonId} fluid={fluid}>
          {menu()}
        </Menu>
      ) : null}
    </>
  );
};

export default ButtonWithMenu;
