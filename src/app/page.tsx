import Image from "next/image";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import { languages, profile } from "@/data/portfolio";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main id="main">
        <section className="hero container" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="small-cross" aria-hidden="true">✳</span> Jovan Vunić / Software engineer</p>
            <h1 id="hero-heading">Engineering<br /><span>useful things.</span></h1>
            <p className="hero-description">I&apos;m Jovan, a senior full-stack engineer with a back-end focus. Turning ideas into software, working with data, and staying curious along the way.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
            <p className="hero-location"><span className="location-dot" aria-hidden="true" />Based in {profile.location}</p>
          </div>
          <div className="portrait-panel">
            <div className="portrait-label"><span>Beyond the code</span><span aria-hidden="true">↙</span></div>
            <div className="portrait-frame">
              <Image src="/images/vj.png" alt="Jovan Vunić" width={1543} height={1543} sizes="(max-width: 640px) 80vw, (max-width: 1000px) 55vw, 360px" preload className="portrait" />
            </div>
            <div className="portrait-caption"><span>Jovan Vunić</span><span>Engineer. Reader. Explorer.</span></div>
          </div>
          <div className="hero-bottom">
            <span>Engineering stuff since 2019</span>
            <a href="#about">A little about me <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="about" className="section container about-section" aria-labelledby="about-heading">
          <div>
            <p className="eyebrow"><span className="section-number">01 /</span> A little context</p>
            <h2 id="about-heading">An engineer.<br />And always a student.</h2>
          </div>
          <div className="about-copy">
            <p className="about-lead">I like turning new ideas into practical, scalable solutions — and understanding what makes them work.</p>
            <p>My background spans back-end and full-stack development, data engineering, and process automation. I enjoy adapting to new teams and technologies, learning something new while sharpening what I already know.</p>
            <p>I hold an {profile.qualification}. Away from the keyboard, you&apos;ll usually find me with a book and a good cup of coffee, or traveling and getting to know another culture.</p>
            <details className="languages-disclosure">
              <summary>A few languages, beyond programming <span className="disclosure-plus" aria-hidden="true">+</span></summary>
              <dl className="language-list">
                {languages.map((language) => <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>)}
              </dl>
            </details>
          </div>
        </section>

        <Projects />
        <Experience />
        <Expertise />

        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div className="container contact-inner">
            <p className="eyebrow"><span className="section-number">05 /</span> Keep the conversation going</p>
            <h2 id="contact-heading">Have something<br /><span>in mind?</span></h2>
            <p className="contact-description">A new opportunity, a collaboration, or a good conversation about technology. I&apos;m always open to hearing it.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
            <div className="contact-bottom">
              <div className="contact-availability">
                <p>Vienna, Austria</p>
                <ul><li>Onsite or hybrid in Vienna / Austria</li><li>Remote worldwide</li><li>Occasional travel for projects</li></ul>
              </div>
              <div className="contact-socials">
                <a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="container footer">
        <a className="monogram" href="#top" aria-label="jv. — back to top">jv<span>.</span></a>
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <a className="footer-top" href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  );
}
