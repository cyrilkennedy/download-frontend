'use client';
import Image from 'next/image';
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
        {/* <Image
          src="/favicon.png"     // ✅ from public/favicon.png
          alt="Logo"
          width={64}
          height={64}
        /> */}
      </div>
      <span className={styles.logoText}>Downlyvieo</span>
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
