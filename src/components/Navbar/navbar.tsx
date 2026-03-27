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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the corresponding nav link name by href (which matches #id)
            const matchedLink = navLinks.find(
              (link) => link.href === `#${entry.target.id}`
            );
            if (matchedLink) {
              setActiveLink(matchedLink.name);
            }
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px", // Trigger when element is near the middle of the viewport
      }
    );

    // Observe all sections defined in navLinks
    navLinks.forEach((link) => {
      const id = link.href.substring(1);
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      navLinks.forEach((link) => {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          observer.unobserve(el);
        }
      });
    };
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
