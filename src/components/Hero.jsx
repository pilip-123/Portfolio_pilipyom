import { useTypewriter } from '@/hooks';
import { HERO, CV_PATH } from '@/data';

export default function Hero() {
  const typedRole = useTypewriter(HERO.roles);

  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <div className="availability-badge">
            <span className="status-dot" />
            Available for work
          </div>

          <h1 className="hero-title">
            Hello, I'm{' '}
            <span className="gradient-text">Pilip Yom</span>
          </h1>

          <div className="hero-role">
            <i className="fas fa-code" aria-hidden="true" />
            <span className="typewriter-text">{typedRole}</span>
            <span className="typewriter-caret" aria-hidden="true" />
          </div>

          <p className="hero-description">{HERO.description}</p>

          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-rocket" aria-hidden="true" />
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-paper-plane" aria-hidden="true" />
              Contact Me
            </a>
            <a href={CV_PATH} className="btn btn-cv" download="Pilip_Yom_CV.pdf">
              <i className="fas fa-download" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="hero-meta">
            <div className="meta-item">
              <strong>2+</strong>
              <span>Years of experience</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <strong>10+</strong>
              <span>Projects delivered</span>
            </div>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-glow" aria-hidden="true" />
          <div className="profile-circle">
            <img src={HERO.image} alt={HERO.imageAlt} className="profile-img" />
          </div>
          <div className="profile-orbits">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            {HERO.orbitIcons.map((icon) => (
              <div className="orbit-item" key={icon}>
                <i className={icon} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <i className="fas fa-chevron-down" aria-hidden="true" />
      </a>
    </section>
  );
}
