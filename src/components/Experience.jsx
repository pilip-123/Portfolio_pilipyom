import SectionHeading from './SectionHeading';
import { useInView } from '@/hooks';
import { EXPERIENCE } from '@/data';

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`timeline-item ${index % 2 === 1 ? 'right' : ''} ${inView ? 'in-view' : ''}`}
    >
      <div className="timeline-dot" aria-hidden="true" />
      <div className="timeline-card">
        <span className="timeline-date">{item.date}</span>
        <h3>{item.title}</h3>
        <h4>{item.company}</h4>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Workshops & professional journey"
          subtitle="Continuous learning experiences that sharpen my engineering, design and quality skills."
        />

        <div className="timeline">
          {EXPERIENCE.map((item, index) => (
            <TimelineItem key={`${item.title}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
