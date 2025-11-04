import React from 'react';
import styles from './footer.module.css';
import { FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const socialLinks = [
  { icon: FaXTwitter, href: 'https://www.x.com/HarshitBilagi', label: 'X', color: '#1DA1F2' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/harshit-mahesh-bilagi', label: 'LinkedIn', color: '#0072b1' },
  { icon: FaGithub, href: 'https://www.github.com/HarshitBilagi', label: 'GitHub', color: '#6e5494' },
];

export default function Footer() {
  return (
    // 1. Use a semantic <footer> tag
    <footer className={styles.footer_container}>
      
      {/* 2. Use the 'styles' object for classes */}
      <div className={styles.footer_left}>
        {/* 3. Changed <h1> to <h2> for better accessibility */}
        <h2>Harshit Bilagi</h2>
        <p>Code, fitness, and fast cars. A developer passionate about building, learning, and accelerating.</p>
        <p className={styles.copyright}>&copy;{currentYear} Harshit Bilagi. All rights reserved.</p>
      </div>

      <div className={styles.footer_right}>
        <h3>Contact:</h3>
        <p>📍Bengaluru.</p>
        {/* 4. Make email a clickable link */}
        <p>
          Email: <a href="mailto:harshit.bilagi@gmail.com" className={styles.email_link}>
            harshit.bilagi@gmail.com
          </a>
        </p>
        
        {/* 5. Add a container for social links for easier styling */}
        <div className={styles.social_links_container}>
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={styles.social_link} // Use CSS module class
            >
              <link.icon className={styles.social_icon} style={{ color: link.color }} />
            </Link>
          ))}
        </div>
      </div>
      
    </footer>
  );
}