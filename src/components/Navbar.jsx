'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <div className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
              <path d="M16 8L12 16L16 24L20 16L16 8Z" fill="white" />
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F62FE" />
                  <stop offset="100%" stopColor="#0A47C4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.logoText}>VidFetch</span>
        </Link>

        {/* Navigation Links */}
        <div
          className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}
        >
          <Link
            href="/"
            className={`${styles.navLink} ${
              pathname === '/' ? styles.active : ''
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link href="/#platforms" className={styles.navLink} onClick={closeMenu}>
            Platforms
          </Link>
          <Link href="/#about" className={styles.navLink} onClick={closeMenu}>
            About
          </Link>

          {/* CTA (Mobile visible inside dropdown) */}
          <Link href="/stepone" className={`${styles.ctaButton} ${styles.mobileCTA}`} onClick={closeMenu}>
            Get Started
          </Link>
        </div>

        {/* CTA Button (Desktop only) */}
        <Link href="/stepone" className={styles.ctaButton}>
          Get Started
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={styles.menuButton}
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? 'M6 18L18 6M6 6l12 12' // X icon
                  : 'M4 6h16M4 12h16M4 18h16' // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
