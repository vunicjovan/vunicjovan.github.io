import { skillGroups } from "@/data/portfolio";

const focusAreas = [
  { number: "01", title: "Back-end & full-stack", description: "Building across the stack, with a particular focus on Python, Java, APIs, and the systems behind the interface.", tags: ["Python", "Django", "Java", "Spring Boot", "React", "TypeScript"] },
  { number: "02", title: "Data & automation", description: "Working with data, connecting services, and automating processes. Curious about machine learning and everything related to data.", tags: ["PostgreSQL", "Pandas", "Polars", "Celery", "RabbitMQ", "PyTorch"] },
  { number: "03", title: "Architecture & delivery", description: "Turning ideas into scalable, platform-independent solutions, from architectural patterns to containers and continuous delivery.", tags: ["Microservices", "Docker", "Kubernetes", "AWS", "GitHub Actions"] },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section container" aria-labelledby="expertise-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="section-number">04 /</span> What I work with</p>
          <h2 id="expertise-heading">Depth, with room to explore.</h2>
        </div>
        <p>Back-end at heart. Comfortable across the stack. Always adding to the toolkit.</p>
      </div>
      <div className="focus-grid">
        {focusAreas.map((area) => (
          <div className="focus-area" key={area.title}>
            <span className="focus-number" aria-hidden="true">{area.number}</span>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
            <ul className="tag-list" aria-label={`${area.title} tools`}>
              {area.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <details className="toolkit-disclosure">
        <summary>Explore the full toolkit <span className="disclosure-plus" aria-hidden="true">+</span></summary>
        <p className="toolkit-intro">Technologies and concepts I&apos;ve worked with or explored, grouped by area.</p>
        <div className="toolkit-grid">
          {skillGroups.map((category) => (
            <div className="toolkit-category" key={category.name}>
              <h3>{category.name}</h3>
              {category.groups.map((group, index) => (
                <div key={group.name ?? index}>
                  {group.name && <h4>{group.name}</h4>}
                  <ul className="tag-list">
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
