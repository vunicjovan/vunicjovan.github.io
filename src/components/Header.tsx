import { profile } from "@/data/portfolio";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label={`jv. ${profile.name} — back to top`}>
          <span className="monogram" aria-hidden="true">jv<span>.</span></span>
          <span className="brand-name">Jovan Vunić</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#expertise">Expertise</a>
          <a className="nav-contact" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
