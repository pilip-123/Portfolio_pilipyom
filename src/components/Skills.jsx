import SectionHeading from './SectionHeading';
import { useInView } from '@/hooks';
import { SKILL_CATEGORIES } from '@/data';

function SkillCard({ skill, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 });

  return (
    <div
      ref={ref}
      className={`skill-card ${inView ? 'in-view' : ''}`}
      style={{ '--skill-color': skill.color, transitionDelay: `${(index % 4) * 90}ms` }}
    >
      <div className="skill-icon">
        <i className={skill.icon} aria-hidden="true" />
      </div>
      <h4 className="skill-name">{skill.name}</h4>
      <div className="skill-progress">
        <div className="skill-progress-bar" style={{ width: inView ? `${skill.level}%` : '0%' }} />
      </div>
      <span className="skill-percent">{skill.level}%</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Technical Skills"
          title="My toolbox & technologies"
          subtitle="A blend of front-end craftsmanship, back-end engineering and the tools to ship them to production."
        />

        <div className="skills-container">
          {SKILL_CATEGORIES.map((category) => (
            <div className="skill-category" key={category.title}>
              <h3>
                <i className={category.icon} aria-hidden="true" />
                {category.title}
              </h3>
              <div className="skill-cards">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
