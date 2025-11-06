"use client";

import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState(navLinks[0].name);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const found = navLinks.find((l) => l.href === window.location.hash);
      if (found) setActiveLink(found.name);
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <div className={styles["navbar-logo"]}>Harshit Bilagi</div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles["nav-links"]} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`${styles["nav-link"]} ${
                  activeLink === link.name ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveLink(link.name);
                  setMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
