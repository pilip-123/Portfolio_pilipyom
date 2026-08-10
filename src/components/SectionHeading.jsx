import { useInView } from '@/hooks';

export default function SectionHeading({ eyebrow, title, subtitle }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`section-heading ${inView ? 'in-view' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
