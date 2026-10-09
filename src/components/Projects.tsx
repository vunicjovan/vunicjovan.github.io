import { projects, profile } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="section-number">02 /</span> Outside the day job</p>
          <h2 id="projects-heading">Curiosity, put to work.</h2>
        </div>
        <p>Personal projects, practical tools, and experiments in how things work.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className={`project-card ${index < 2 ? "project-featured" : ""}`} key={project.id}>
            <div className="project-topline">
              <span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={`project-status ${project.status === "In progress" ? "in-progress" : ""}`}>
                <span className="status-dot" aria-hidden="true" />{project.status}
              </span>
            </div>
            <p className="project-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="project-summary">{project.description}</p>
            <p className="project-detail">{project.detail}</p>
            <ul className="tag-list" aria-label={`${project.title} technologies`}>
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">
              Explore {project.title}<span aria-hidden="true">↗</span><span className="sr-only"> on GitHub (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
      <a className="text-link projects-more" href={profile.github} target="_blank" rel="noopener noreferrer">
        More on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
      </a>
    </section>
  );
}
