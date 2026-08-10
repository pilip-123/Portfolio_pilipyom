import SectionHeading from './SectionHeading';
import { useInView } from '@/hooks';
import { PROJECTS } from '@/data';

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <article
      ref={ref}
      className={`project-card ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="project-img">
        <img src={project.image} alt={project.alt} loading="lazy" />
        <div className="project-overlay">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            aria-label={`Open ${project.title}`}
          >
            <i className="fas fa-external-link-alt" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary"
        >
          <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
          View Project
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've built"
          subtitle="A selection of projects that showcase my skills in turning ideas into real, working products."
        />

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
