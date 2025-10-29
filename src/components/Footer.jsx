import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.brand}>
            <h3 className={styles.brandName}>VidFetch</h3>
            <p className={styles.brandTagline}>
              Download videos from TikTok, Instagram, Facebook, and Twitter without watermarks.
            </p>
          </div>

          {/* Links Section */}
          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Product</h4>
              <a href="#" className={styles.link}>Features</a>
              <a href="#" className={styles.link}>Supported Platforms</a>
              <a href="#" className={styles.link}>How it Works</a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Company</h4>
              <a href="#" className={styles.link}>About Us</a>
              <a href="#" className={styles.link}>Privacy Policy</a>
              <a href="#" className={styles.link}>Terms of Service</a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Support</h4>
              <a href="#" className={styles.link}>FAQ</a>
              <a href="#" className={styles.link}>Contact</a>
              <a href="#" className={styles.link}>Help Center</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} VidFetch. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="white"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}