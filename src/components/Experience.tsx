import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section container experience-section" aria-labelledby="experience-heading">
      <div className="experience-intro">
        <p className="eyebrow"><span className="section-number">03 /</span> The journey so far</p>
        <h2 id="experience-heading">Different teams.<br />Same curiosity.</h2>
        <p>Engineering since 2019, across different environments, technologies, and architectural approaches.</p>
        <p>For me, good communication is the foundation of good collaboration.</p>
      </div>
      <ol className="career-list">
        {experience.map((job) => (
          <li key={job.company}>
            <div className="career-date">
              <time dateTime={job.start}>{job.startLabel}</time><span aria-hidden="true"> — </span>
              {job.end ? <time dateTime={job.end}>{job.endLabel}</time> : <span>{job.endLabel}</span>}
              {!job.end && <span className="current-label">Current</span>}
            </div>
            <h3>{job.company}</h3>
            <p className="career-role">{job.role}</p>
            {job.focus && <p className="career-focus">{job.focus}</p>}
            <p className="career-location">{job.location}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
