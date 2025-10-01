"use client";

import React, { useEffect, useState, useRef } from "react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "About", href: "#about" },
];

const Navbar: React.FC = () => {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) {
                setVisible(false); // Scrolling down
            } else {
                setVisible(true); // Scrolling up
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [activeLink, setActiveLink] = useState(navLinks[0].name);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const found = navLinks.find(link => link.href === hash);
            if (found) setActiveLink(found.name);
        };
        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Reorder navLinks so activeLink is at the center
    const getCenteredLinks = () => {
        const activeIdx = navLinks.findIndex(link => link.name === activeLink);
        if (activeIdx === -1) return navLinks;
        const links = [...navLinks];
        const centerIdx = Math.floor(links.length / 2);
        const [active] = links.splice(activeIdx, 1);
        links.splice(centerIdx, 0, active);
        return links;
    };

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 100,
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 24px rgba(255, 255, 255, 0.1)",
                transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
                transform: visible ? "translateY(0)" : "translateY(-100%)",
                opacity: visible ? 1 : 0,
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.75rem 2rem",
                }}
            >
                <ul
                    style={{
                        display: "flex",
                        gap: "2rem",
                        listStyle: "none",
                        textAlign: "center",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {getCenteredLinks().map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                style={{
                                    position: "relative",
                                    color: "#ffffffff",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    fontSize: "1.1rem",
                                    padding: "0.5rem 0.75rem",
                                    overflow: "hidden",
                                    zIndex: 1,
                                    display: "inline-block",
                                }}
                                className={`nav-link${activeLink === link.name ? " active" : ""}`}
                                onClick={() => setActiveLink(link.name)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <style>{`
                .nav-link {
                    background: none;
                    color: #ffffffff;
                    transition: all 0.3s ease;
                }
                .nav-link:hover {
                    background: linear-gradient(90deg, #6010df);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }
                .nav-link.active {
                    color: #f85353ff !important;
                    background: none;
                    -webkit-background-clip: initial;
                    -webkit-text-fill-color: initial;
                    background-clip: initial;
                }
                @media (max-width: 700px) {
                    nav > div {
                        flex-direction: column;
                        gap: 0.5rem;
                        padding: 0.75rem 1rem;
                    }
                    ul {
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </nav>
    )};

export default Navbar;