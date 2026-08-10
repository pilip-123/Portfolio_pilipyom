import { SOCIAL_LINKS } from '@/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <a href="#home" className="logo">
            Pilip&nbsp;Yom<span>.</span>
          </a>
          <p>Building the future of the web, one line of code at a time.</p>
        </div>

        <div className="social-links">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="social-link"
              target={social.href !== '#' ? '_blank' : undefined}
              rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
              aria-label={social.label}
            >
              <i className={social.icon} aria-hidden="true" />
            </a>
          ))}
        </div>

        <a href="#home" className="back-to-top" aria-label="Back to top">
          <i className="fas fa-arrow-up" aria-hidden="true" />
        </a>
      </div>
      <div className="container copyright">
        <p>&copy; 2026 Pilip Yom. All Rights Reserved. | Designed with ❤️ and code</p>
      </div>
    </footer>
  );
}
