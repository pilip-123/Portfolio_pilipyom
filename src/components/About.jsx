import SectionHeading from './SectionHeading';
import { useCountUp, useInView } from '@/hooks';
import { ABOUT } from '@/data';

function StatItem({ value, suffix, label, delay }) {
  const [ref, count, inView] = useCountUp(value, { duration: 1500 });
  return (
    <div
      ref={ref}
      className={`stat-item ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [imageRef, imageInView] = useInView({ threshold: 0.2 });

  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading eyebrow="About Me" title="A developer who loves clean code & good coffee" />

        <div className="about-content">
          <div className="about-text">
            {ABOUT.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="about-stats">
              {ABOUT.stats.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={index * 120}
                />
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            className={`about-image-wrap ${imageInView ? 'in-view' : ''}`}
          >
            <div className="about-image-frame">
              <img src={ABOUT.image} alt={ABOUT.imageAlt} loading="lazy" />
            </div>
            <div className="about-badge">
              <i className="fas fa-laptop-code" aria-hidden="true" />
              <div>
                <strong>Web Developer</strong>
                <span>Passerelles Numériques Cambodia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
