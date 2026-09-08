import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import WorldSection from '../components/WorldSection';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import AboutMe from '../components/AboutMe';
import Technicals from '../components/Technicals';
import { projects } from '../data/projects';
import { scrollToSectionId } from '../utils/scrollTo';

const selectedProjects = projects.slice(0, 3);

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      // wait a frame so the section has actually laid out before measuring it
      requestAnimationFrame(() => scrollToSectionId(scrollTo));
      navigate(location.pathname, { replace: true, state: null });
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/*----Hero section: Logo, tagline, first impressions----*/}
      <Hero />

      {/*----AURA: ambient nebula glow behind the void sections----*/}
      <div className="aura-bg">
        <div className="aura-layer-1" aria-hidden="true" />
        <div className="aura-layer-2" aria-hidden="true" />
        <div className="aura-layer-3" aria-hidden="true" />
        <div className="aura-layer-4" aria-hidden="true" />
        <div className="aura-layer-5" aria-hidden="true" />
        <div className="aura-layer-6" aria-hidden="true" />
        <div className="aura-grain" aria-hidden="true" />
        <div className="aura-fade-top" aria-hidden="true" />
        <div className="aura-fade-bottom" aria-hidden="true" />
        <div className="aura-content">
          {/*----ABOUT ME: Brief introduction----*/}
          <WorldSection id="aboutme" label="About me" variant="void">
            <AboutMe />
          </WorldSection>

          {/*----Technicals: Selected projects preview, full list lives on /projects----*/}
          <WorldSection id="technicals" label="Selected Projects Section" variant="void">
            <Technicals projects={selectedProjects} heading="Selected Projects" />
          </WorldSection>

          {/*----Contacts: LinkedIn, Gmail, etc----*/}
          <WorldSection id="contacts" label="Contact Section" variant="void">
            <div className="sectionPlaceholderText">
              <h2 className="section-title">Contact Me</h2>
              <p className="section-body">
                Feel free to connect or reach out to me on these platforms!
              </p>
            </div>
            <Contact />
          </WorldSection>
        </div>
      </div>
    </>
  );
}
