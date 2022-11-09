import { useState, useContext } from "react";

import { Button } from "@components/Button";
import { Slideout } from "@components/Slideout";

import NavigationContext from "@contexts/NavigationContext";

import { FooterLink } from "./FooterLink";

import styles from "./Footer.module.css";

const Footer = () => {
  const { navigation } = useContext(NavigationContext);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <footer className={styles.footerContainer}>
        <nav>
          <ul className={styles.list}>
            {navigation
              ?.filter(({ title }) => title !== "Back")
              ?.map(({ href, title, icon, onClick }) => (
                <FooterLink
                  key={href}
                  href={href}
                  title={title}
                  icon={icon}
                  onClick={onClick}
                />
              ))}

            <FooterLink
              title="Menu"
              icon="menu"
              onClick={() => setMenuOpen(true)}
            />
          </ul>
        </nav>
      </footer>

      <Slideout
        id="main-menu"
        title="Menu"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
      ></Slideout>
    </>
  );
};

export default Footer;
